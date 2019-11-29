import React, { useState, useEffect } from "react";

import axios from "axios";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interview: {},
    interviewers: {}
  });

  const setDay = day => setState(currentState => ({ ...currentState, day }));

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(response => {
      // console.log(response[0], response[1])
      setState(state => ({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    });
  }, []);

  // const appointments = getAppointmentsForDay(state, state.day);

  // console.log(state.day)
  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments
      });
      return axios.put(`/api/appointments/${id}`, { interview });
    }

    function cancelInterview(id, interview) {
      const nullAppointment = {
        ...state.appointments[id],
        interview: { ...state.appointments[id].interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: nullAppointment
      };

      setState({
        ...state,
        appointments
      });
      return axios.delete(`/api/appointments/${id}`);
    }

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        // interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
          <DayList day={state.day} days={state.days} setDay={setDay} />
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
