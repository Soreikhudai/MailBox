import { useState, useEffect } from "react";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import "./EmailList.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../../store/mail";
import ViewPage from "./ViewPage";

var dataArray = [];
var allMails = [];

const EmailList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.has("type") ? searchParams.get("type") : ""; // "react"
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const auth = getAuth();
  console.log(auth.currentUser);

  useEffect(() => {
    const db = getDatabase();
    if (!auth.currentUser) {
      return;
    }
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        dataArray = [];
        allMails = [];

        onChildAdded(
          ref(db, `emails/received/${btoa(user.email)}`),
          (snapshot) => {
            const data = snapshot.val();

            dataArray = dataArray.concat({ id: snapshot.key, ...data });
            // console.log(dataArray);
            dataArray.map((item) =>
              onChildAdded(
                ref(db, `emails/received/${btoa(user.email)}/${item.id}`),
                (snapshot) => {
                  const childData = snapshot.val();
                  allMails = allMails.concat({
                    id: snapshot.key,
                    ...childData,
                    from: item.id,
                  });

                  setEmails(allMails);
                }
              )
            );
          }
        );
      }
    });
  }, [auth]);

  console.log(emails);

  return (
    <>
      {type === "viewmail" ? (
        <ViewPage />
      ) : (
        <ul className="mailList">
          {emails
            .filter(
              (obj, index, self) =>
                index === self.findIndex((t) => t.id === obj.id)
            )
            .map((email, key) => (
              <div className="aUserSecret mb-3" key={key}>
                <FontAwesomeIcon icon={faUserSecret} />
                <Link
                  className="m-0"
                  to={`/inbox/item?type=viewmail`}
                  onClick={() => dispatch(setEmail(email))}
                >
                  {atob(email.from)}
                </Link>
              </div>
            ))}
        </ul>
      )}
    </>
  );
};

export default EmailList;
