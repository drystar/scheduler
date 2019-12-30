import { useEffect, useReducer } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

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
    ])
      .then(response => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        });
      })
      .then(() => {
        const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        websocket.onopen = function(e) {
          webSocket.send("ping");
        };
        webSocket.onmessage = function(e) {
          console.log("Message Received: ", e.data);
        };
      })
      .catch(error => console.log(error));
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

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
