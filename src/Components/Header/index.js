import React from "react";
import { RouteButtons } from "../../Components";
import "./styles.scss";

export const Header = () => {
  return (
    <div className="main-header">
      <span className="title">{"Book My Show"}</span>
      <RouteButtons />
    </div>
  );
};
