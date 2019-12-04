import "components/DayListItem.scss";
import React from "react";
const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(spots) {
    if (spots === 0) return `no spots remaining`;

    if (spots === 1) return `1 spot remaining`;

    if (spots > 1) return `${spots} spots remaining`;
  };

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h4>{formatSpots(props.spots)}</h4>
    </li>
  );
}
