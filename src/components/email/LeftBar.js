import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LeftBar.css";

const Leftbar = () => {
  const navigate = useNavigate();
  const sentQuantity = useSelector((state) => state.sent.totalQuantity);
  return (
    <div className="leftbar_container">
      <Button
        type="button"
        onClick={() => {
          navigate("/form");
        }}
        className="composebtn"
        style={{ padding: "1px 10px", borderRadius: "0px" }}
      >
        compose
      </Button>
      <Nav defaultActiveKey="/inbox" className="flex-column">
        <Link className="maillink" to="/mail/inbox">
          Inbox
          <span>(0)</span>
        </Link>
        <Link className="maillink" to="/mail/send">
          Send
          <span>({sentQuantity})</span>
        </Link>
        <Link className="maillink" to="/mail/trash">
          Trash
          <span>(0)</span>
        </Link>
      </Nav>
    </div>
  );
};

export default Leftbar;
