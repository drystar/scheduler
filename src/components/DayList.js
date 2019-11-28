import React from "react";

import DayListItem from "components/DayListItem";

// {/* <DayListItem
//   name={day.name}
//   spots={day.spots}
//   selected={day.name === props.day}
//   setDay={props.setDay}  /> */}

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
            // data-testid="day"
            // setDay={() => {
            //   return props.setDay(day.name);

            setDay={props.setDay}
          />
        );
      })}
    </ul>
  );
}
