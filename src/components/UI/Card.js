import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = (props) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center h-100"
      style={{ marginTop: "5rem" }}
    >
      <BootstrapCard
        style={{ height: "30rem", width: "20rem", borderStyle: "none" }}
      >
        {props.children}
      </BootstrapCard>
    </div>
  );
};

export default Card;
