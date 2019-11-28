//import React from "react";
import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";

import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Chris Drysdale",
//       interviewer: {
//         id: 1,
//         name: "Jamie Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Emma Watts",
//       interviewer: {
//         id: 1,
//         name: "Autumn Fall",
//         avatar: "https://i.imgur.com/imgur.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Hilda Lighthosue",
//       interviewer: {
//         id: 2,
//         name: "Jess Apple",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   }

// ];


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ]; 

// const setDay = day => setState({ ...state, day });

export default function Application(props) {

  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});

  // const setDays = days => setState(prev => ({...prev, days}));
  // useEffect(() => {
  //   axios
  //     .get('/api/days')
  //     .then(response => setDays(response.data));
  // }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
     ])
    .then(response => {
      console.log(response[0], response[1])
      setState(prev => ({...prev, 
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }))
    });
  }, []);


  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

 


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          day={state.day}
          days={state.days}
          // day={"Monday"}
          setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
