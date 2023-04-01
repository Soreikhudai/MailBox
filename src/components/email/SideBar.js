import {
  faEnvelope,
  faInbox,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  onChildAdded,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setEmail, setSent } from "../../store/mail";
import { firebaseData } from "../../firebase";

let allMails = [];
let dataArray = [];
let inboxallMails = [];
let inboxdataArray = [];
const SideBar = () => {
  const Unread = useSelector((state) => state.email.email);
  const sentQuantity = useSelector((state) => state.email.sent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth(firebaseData);
  // get sent items
  useEffect(() => {
    const getData = () => {
      if (!auth.currentUser) {
        return;
      }
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          dataArray = [];
          allMails = [];

          onChildAdded(
            query(
              ref(db, `emails/sent/${btoa(user.email)}`),
              orderByChild("timeStamp")
            ),
            (snapshot) => {
              const data = snapshot.val();
              dataArray = dataArray.concat({ id: snapshot.key, ...data });
              dataArray.forEach((item) =>
                onChildAdded(
                  query(
                    ref(db, `emails/sent/${btoa(user.email)}/${item.id}`),
                    orderByChild("timeStamp")
                  ),
                  (snapshot) => {
                    const childData = snapshot.val();
                    allMails = allMails.concat({
                      id: snapshot.key,
                      ...childData,
                      from: item.id,
                    });
                    // Sort the emails by timestamp in descending order (newest to oldest)
                    allMails.sort((a, b) => b.timestamp - a.timestamp);

                    dispatch(setSent(allMails));
                  }
                )
              );
            }
          );
        }
      });
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, [auth, dispatch, db]);
  //get received items

  useEffect(() => {
    const getData = () => {
      const db = getDatabase();
      if (!auth.currentUser) {
        return;
      }
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          inboxdataArray = [];
          inboxallMails = [];

          onChildAdded(
            query(
              ref(db, `emails/received/${btoa(user.email)}`),
              orderByChild("timestamp")
            ),
            (snapshot) => {
              const data = snapshot.val();
              inboxdataArray = inboxdataArray.concat({
                id: snapshot.key,
                ...data,
              });
              inboxdataArray.forEach((item) =>
                onChildAdded(
                  query(
                    ref(db, `emails/received/${btoa(user.email)}/${item.id}`),
                    orderByChild("timestamp")
                  ),
                  (snapshot) => {
                    const childData = snapshot.val();
                    inboxallMails = inboxallMails.concat({
                      id: snapshot.key,
                      ...childData,
                      from: item.id,
                    });
                    // Sort the emails by timestamp in descending order (newest to oldest)
                    inboxallMails.sort((a, b) => b.timestamp - a.timestamp);

                    dispatch(setEmail(inboxallMails));
                  }
                )
              );
            }
          );
        }
      });
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, [auth, dispatch]);

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
        <span style={{ marginLeft: "1rem", color: "red" }}>
          {sentQuantity ? sentQuantity.length : "0"}
        </span>
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
        <span>Trash</span>
        <span style={{ marginLeft: "1rem", color: "red" }}>10</span>
      </Nav.Link>
    </div>
  );
};

export default SideBar;
