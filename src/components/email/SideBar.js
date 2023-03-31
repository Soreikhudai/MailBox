import {
  faEnvelope,
  faInbox,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const Unread = useSelector((state) => state.email.email);
  const navigate = useNavigate();
  return (
    <div
      style={{
        // position: "fixed",
        top: "7vh",
        display: "flex",
        flexDirection: "column",
        width: "10rem",
      }}
    >
      <Button
        onClick={() => navigate("/form")}
        variant="outline-secondary"
        style={{
          borderRadius: "3px",
          boxShadow: "0px 2px 7px black",
          margin: "1rem",
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: "black", marginRight: "1rem" }}
        />
        Compose
      </Button>
      <Nav.Link
        as={Link}
        to="/inbox"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          margin: "1rem",
          cursor: "pointer",
          boxShadow: "0px 2px 7px grey",
          padding: "5px",
          borderRadius: "3px",
        }}
      >
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Inbox</span>{" "}
        <span style={{ marginLeft: "1rem", color: "red" }}>
          {Unread.length > 0
            ? Unread.filter((ur) => ur.read !== true).length
            : ""}
        </span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/sent"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          margin: "1rem",
          cursor: "pointer",
          boxShadow: "0px 2px 7px grey",
          padding: "5px",
          borderRadius: "3px",
        }}
      >
        <FontAwesomeIcon icon={faInbox} />
        <span>Sent</span>
        <span style={{ marginLeft: "1rem", color: "red" }}>23</span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/trash"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          margin: "1rem",
          cursor: "pointer",
          boxShadow: "0px 2px 7px grey",
          padding: "5px",
          borderRadius: "3px",
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
        <span>Trash</span>{" "}
        <span style={{ marginLeft: "1rem", color: "red" }}>10</span>
      </Nav.Link>
    </div>
  );
};

export default SideBar;
