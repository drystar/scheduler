import React from "react";
import Button from "components/Button/Button";

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} Button danger>
          Cancel
        </Button>
        <Button onClick={props.onConfirm} Button danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
