import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ViewPage = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const Email = useSelector((state) => state.email.email);
  const itemID = searchParams.get("id");

  //get the id value from param (http://localhost:3000/inbox/item?id=lmvv3m7i) let id=lmvv3m7i
  //filter by id and get the item from email (useSelector) using param id
  //use map and display it in the browser
  const replyHandler = () => {
    navigate("/form");
  };
  return (
    <Card
      bg="white"
      text={"dark"}
      style={{ width: "100%", height: "95%" }}
      className="mb-2 mt-3"
    >
      {Email.filter((item) => item.id === itemID).map((email) => (
        <>
          <Card.Header>
            {email?.subject}

            <Card.Title>From: {atob(email?.from)}</Card.Title>
          </Card.Header>

          <Card.Body>
            <Card.Text>{email?.timeStamp}</Card.Text>
            <Card.Text>{email?.message}</Card.Text>
          </Card.Body>
        </>
      ))}

      <Button
        onClick={replyHandler}
        variant="secondary"
        style={{
          width: "100px",
          borderButton: "1px solid red",
          margin: "1rem auto",
        }}
      >
        <FontAwesomeIcon icon={faPen} style={{ paddingRight: "3px" }} />
        Reply
      </Button>

      <Link to="/inbox" className="m-3">
        <Button>Close</Button>
      </Link>
    </Card>
  );
};

export default ViewPage;
