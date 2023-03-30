import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewPage() {
  const email = useSelector((state) => state.email.email);
  return (
    <Card
      bg="white"
      text={"dark"}
      style={{ width: "100%", height: "95%" }}
      className="mb-2 mt-3"
    >
      <Card.Header>
        {email.subject}

        <Card.Title>From: {atob(email.from)}</Card.Title>
      </Card.Header>

      <Card.Body>
        <Card.Text>{email.timeStamp}</Card.Text>
        <Card.Text>{email.message}</Card.Text>
      </Card.Body>

      <Link to="/inbox" className="m-3">
        <Button>Back</Button>
      </Link>
    </Card>
  );
}

export default ViewPage;
