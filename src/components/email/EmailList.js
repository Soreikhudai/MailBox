import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onChildAdded,
  set,
  query,
  orderByChild,
} from "firebase/database";
import "./EmailList.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../../store/mail";
import ViewPage from "./ViewPage";

var dataArray = [];
var allMails = [];

const EmailList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.has("id") ? searchParams.get("id") : ""; // "react"
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const getData = () => {
      console.log("Calling");
      const db = getDatabase();
      if (!auth.currentUser) {
        return;
      }
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          dataArray = [];
          allMails = [];

          onChildAdded(
            query(
              ref(db, `emails/received/${btoa(user.email)}`),
              orderByChild("timestamp")
            ),
            (snapshot) => {
              const data = snapshot.val();
              dataArray = dataArray.concat({ id: snapshot.key, ...data });
              dataArray.forEach((item) =>
                onChildAdded(
                  query(
                    ref(db, `emails/received/${btoa(user.email)}/${item.id}`),
                    orderByChild("timestamp")
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
                    setEmails(allMails);
                    dispatch(setEmail(allMails));
                    setIsUpdate(false);
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
    isUpdate === true && getData();
  }, [auth, isUpdate, dispatch]);

  const markAsRead = (email) => {
    const db = getDatabase();
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    let uDetails = {
      ...email,
      read: true,
    };
    onChildAdded(
      ref(db, `/emails/received/${btoa(user.email)}/${email.from}`),
      async (snapshot) => {
        const item = snapshot.val();
        if (item.id === email.id) {
          // Updating  the item in the database
          const itemRef = ref(
            db,
            `/emails/received/${btoa(user.email)}/${email.from}/${snapshot.key}`
          );
          set(itemRef, uDetails)
            .then(() => {
              console.log("Updated");
              setIsUpdate(true);
            })
            .catch((error) => {
              console.error("Error updating item: ", error);
            });
        }
      }
    );
  };

  return (
    <>
      {id !== "" ? (
        <ViewPage />
      ) : (
        <ul className="mailList">
          {emails
            .filter(
              (obj, index, self) =>
                index === self.findIndex((t) => t.id === obj.id)
            )
            .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
            .map((email, key) => (
              <div
                className={`aUserSecret mb-3`}
                key={key}
                onClick={() => markAsRead(email)}
              >
                <FontAwesomeIcon
                  icon={email.read === true ? faEnvelopeOpen : faEnvelope}
                  style={{
                    fontSize: "15px",
                  }}
                />

                <Link
                  className="m-0"
                  to={`/inbox/item?id=${email.id}`}
                  style={{
                    color: email.read === true ? "grey" : "blue",
                  }}
                >
                  {atob(email.from)} -{" "}
                  {new Date(email.timeStamp).toDateString()}
                </Link>
              </div>
            ))}
        </ul>
      )}
    </>
  );
};

export default EmailList;
