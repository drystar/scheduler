import React from "react";

import DayListItem from "components/DayListItem/DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map(day => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            full={day.spots === 0}
            selected={day.name === props.day}
            setDay={props.setDay}
          />
        );
      })}
    </ul>
  );
}
