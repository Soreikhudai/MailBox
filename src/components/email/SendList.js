import {
  getDatabase,
  ref,
  onChildAdded,
  query,
  orderByChild,
  remove,
} from "firebase/database";
import { faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./EmailList.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSent } from "../../store/mail";
import ViewPage from "./ViewPage";
import { firebaseData } from "../../firebase";

var dataArray = [];
var allMails = [];

const SentEmailList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.has("id") ? searchParams.get("id") : ""; // "react"
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const db = getDatabase();
  const auth = getAuth(firebaseData);

  useEffect(() => {
    const getData = () => {
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
              ref(db, `emails/sent/${btoa(user.email)}`),
              orderByChild("timestamp")
            ),
            (snapshot) => {
              const data = snapshot.val();
              dataArray = dataArray.concat({ id: snapshot.key, ...data });
              dataArray.forEach((item) =>
                onChildAdded(
                  query(
                    ref(db, `emails/sent/${btoa(user.email)}/${item.id}`),
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
                    dispatch(setSent(allMails));
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

  const deleteHandler = async (email) => {
    try {
      onChildAdded(
        ref(db, `/emails/sent/${btoa(auth.currentUser.email)}/${email.from}`),
        async (snapshot) => {
          const item = snapshot.val();
          if (item.id === email.id) {
            // Updating  the item in the database
            const itemRef = ref(
              db,
              `/emails/sent/${btoa(auth.currentUser.email)}/${email.from}/${
                snapshot.key
              }`
            );
            remove(itemRef)
              .then(() => {
                setIsUpdate(true);
              })
              .catch((error) => {
                console.error("Error deleting email: ", error);
              });
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {id !== "" ? (
        <ViewPage />
      ) : (
        <ul className="mailList">
          <div>
            {emails
              .filter(
                (obj, index, self) =>
                  index === self.findIndex((t) => t.id === obj.id)
              )
              .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
              .map((email, key) => (
                <div className={`aUserSecret mb-3`} key={key}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{
                      fontSize: "15px",
                    }}
                  />

                  <Link
                    className="m-0"
                    to={`/sent/item?id=${email.id}`}
                    style={{
                      color: email.read === true ? "grey" : "blue",
                    }}
                  >
                    {atob(email.from)} -{" "}
                    {new Date(email.timeStamp).toDateString()}
                  </Link>

                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteHandler(email)}
                    type="button"
                  />
                </div>
              ))}
          </div>
        </ul>
      )}
    </>
  );
};

export default SentEmailList;