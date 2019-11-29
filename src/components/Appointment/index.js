import React from "react";

import "components/Appointment/styles.scss";

import Empty from "components/Appointment/empty";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Form from "components/Appointment/form";
import Status from "components/Appointment/status";
import Confirm from "components/Appointment/confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const EDITING = "EDITING";
  const DELETING = "DELETING";
  const CONFRIM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview).then(response => {
      transition(SHOW);
    });
  }

  function confirmation() {
    transition(CONFRIM);
  }

  function cancel() {
    transition(DELETING);

    props.cancelInterview(props.id).then(response => {
      transition(EMPTY);
    });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            return transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(confirmation)}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFRIM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
    </article>
  );
}
