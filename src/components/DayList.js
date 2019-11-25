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
        {props.days.map((day) => {
          return (
            <DayListItem
              key={day.id}
              selected={day.name === props.day}
              name={day.name}
              spots={day.spots}
              data-testid="day"
              setDay={() => {
                return props.setDay(day.name);
              }}
            />
          )
        })}
      </ul>
    );
  }