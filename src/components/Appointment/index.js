import React from "react";
import "components/Appointment/styles.scss";

import Empty from "components/Appointment/empty"
import Header from "components/Appointment/header"
import Show from "components/Appointment/show"


export default function Appointment(props) {
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {props.interview? <Show student={props.interview.student}
    interviewer={props.interview.interviewer}
    />:
    <Empty />}
  </article>
  );
}
