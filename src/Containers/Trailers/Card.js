import React from "react";
import classnames from "classnames";

export const Card = ({ trailer, index, EventCode, EventTitle, onClick, isActive }) => {
  return (
    <div
      id={trailer.EventCode}
      className={classnames("card-wrapper")}
      key={trailer.EventCode}
      onClick={() => onClick(trailer, index)}>
        <div className={classnames("card", { "card-active": isActive })}>
          <img className="card-img" src={`https://in.bmscdn.com/events/moviecard/${EventCode}.jpg`} />
        <div className="card-details">{EventTitle}</div>
        </div>
    </div>
  );
};
