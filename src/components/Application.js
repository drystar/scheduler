//import React from "react";
import React, { useState, useEffect } from "react";

import axios from "axios";

import DayList from "components/DayList";
import "components/Application.scss";

import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Chris Drysdale",
      interviewer: {
        id: 1,
        name: "Jamie Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Emma Watts",
      interviewer: {
        id: 1,
        name: "Autumn Fall",
        avatar: "https://i.imgur.com/imgur.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Hilda Lighthosue",
      interviewer: {
        id: 2,
        name: "Jess Apple",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }

];


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

export default function Application(props) {

  const [days, setDays] = useState([])

  useEffect(() => {
    axios
      .get('/api.days')
      .then(response => setDays(response.data));
  }, [])

  const appointmentList = appointments.map( appointment => {
    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          // day={day}
          days={days}
          day={"Monday"}
          setDay={day => console.log(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
