import { useEffect, useReducer } from "react";

import axios from "axios";
import { statement } from "@babel/template";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function getSpotsRemainingForDay(day, appointments) {
  let spotsForThisDay = day.appointments;
  let freeSpots = 0;
  // go through each spot for this day
  for (const spot of spotsForThisDay) {
    // if that spot's appointment's interview is null:
    // that spot is free; increment freeSpots
    if (appointments[spot].interview === null) {
      freeSpots++;
    }
  }
  return freeSpots;
}
function decorateDaysWithSpots(days, appointments) {
  const decoratedDays = days.map(day => ({
    ...day,
    spots: getSpotsRemainingForDay(day, appointments)
  }));
  return decoratedDays;
}

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {
        ...state,
        day: action.day
        // spots: action.decorateDaysWithSpots
      };
    }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: action.interview === null ? null : { ...action.interview }
        }
      };
      const days = decorateDaysWithSpots(state.days, appointments);
      return {
        ...state,
        days,
        appointments
      };
    }

    default: {
      return state;
    }
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interview: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
      // ]).then() => {
      // setState(state => ({
      //   ...state,
      //   days: response[0].data,
      //   appointments: response[1].data,
      //   interviewers: response[2].data
      // }));
    ]).then(response => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      });
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({
    //   ...state,
    //   appointments
    // });
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  function cancelInterview(id) {
    const nullAppointment = {
      ...state.appointments[id],
      interview: { ...state.appointments[id].interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };

    // setState({
    //   ...state,
    //   appointments
    // });
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
