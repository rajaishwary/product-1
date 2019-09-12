import React from "react";
import { Button } from "../../Components";

export const CardDetails = ({ trailer, onClose }) => {
  const trailerUrl = trailer.TrailerURL.replace("watch?v=", "embed/");
  return (
    <div className="show-trailer" key={trailer.EventCode}>
        <div className="close">
            <Button type="danger" onClick={onClose} style={{ minWidth: 0 }}>{"X"}</Button>
        </div>
      <div className="video">
        <iframe
          frameBorder="0"
          allowFullScreen="1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="100%"
          height="100%"
          src={trailerUrl}></iframe>
      </div>
      <div className="details">
        <div className="details__title">{trailer.EventName}</div>
        <div className="details__language">{trailer.EventLanguage}</div>
        {trailer.EventGenre &&
          trailer.EventGenre.split("|").map((item, index) => {
            return <div key={index} className="details__genre-tag">{item}</div>;
          })}
        <div className="details__title" />
        <div>Likes: {trailer.wtsPerc}%</div>
        <div>Votes: {trailer.wtsCount}</div>
        <div>Release: {trailer.ShowDate}</div>
      </div>
    </div>
  );
};
