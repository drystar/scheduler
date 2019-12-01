import { useEffect, useReducer } from "react";

import axios from "axios";

// import { getDayForAppointment } from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
// const SET_SPOTS_PLUS = "SET_SPOTS_PLUS";
// const SET_SPOTS_MINUS = "SET_SPOTS_MINUS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {
        ...state,
        day: action.day
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
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview:
              action.interview === null ? null : { ...action.interview }
          }
        }
      };
    }
  }
//     case SET_SPOTS_PLUS: {
//       const appointmentDay = getDayForAppointment(state, action.id);
//       return {...state,
//         state.days.map((item, index) => {
//         if (item.appointments === id) {
//           item.spots;
//           return item++;
//         } else {
//           return item;
//         }
//       });
//     }
//     case SET_SPOTS_MINUS: {
//       const days = state.days.map((item, index) => {
//         if (item.appointments === id) {
//           item.spots;
//           return item--;
//         } else {
//           return item;
//         }
//       });
//     }
//     default: {
//       return state;
//     }
//   }
// }



function useApplicationData() {
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

    // const days = state.days.map((day => {
    //   if (day.appointments === appointments.(id)){ 
    //     item.spots ++
    //     return item
    //   } else {
    //     return item
    //   }
    // })

    // setState({
    //   ...state,
    //   appointments
    // });
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      if (state.appointments[id].interview === null) {
        // dispatch({ type: SET_SPOTS_MINUS, id, interview });
      }
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


// DECORATE DAYS
// take in array OF days & appointments
// return array if decorate days 
// map over each day
// compute value for each day 
// return the key 


    // const decorateDays = days.map((days, appointemnts) => {


    //   if (item.appointments === (id)){
    //     item.spots --
    //     return item
    //   } else {
    //     return item
    //   }
    // })

  

    // setState({
    //   ...state,
    //   appointments
    // });
    return axios.delete(`/api/appointments/${id}`).then(() => {
      // dispatch({ type: SET_SPOTS_PLUS, id, interview: null });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}