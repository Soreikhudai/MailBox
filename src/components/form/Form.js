import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container, Form } from "react-bootstrap";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../../store/mail";
import { EditorState } from "draft-js";
import { getAuth } from "firebase/auth";

const SendForm = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [editorState, setEditorState] = useState();
  const [recepient, setRecepient] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const details = {
      id: Math.random().toString(36).substr(2, 8),
      recepient,
      subject,
      message: editorState.getCurrentContent().getPlainText(),
      timeStamp: new Date().toDateString(),
    };
    console.log(details);
    try {
      await fetch(
        `https://react-http-project-da8f6-default-rtdb.firebaseio.com/emails/sent/${btoa(
          auth.currentUser.email
        )}/${btoa(recepient)}.json`,
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        await res.json();
        dispatch(setEmail(details));
        setIsLoading(false);

        //-----------------------------------------------------//
        await fetch(
          `https://react-http-project-da8f6-default-rtdb.firebaseio.com/emails/received/${btoa(
            recepient
          )}/${btoa(auth.currentUser.email)}.json`,
          {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(async (res) => {
          await res.json();
          dispatch(setEmail(details));
          setIsLoading(false);
          alert("mail sent successfully");

          setRecepient("");
          setSubject("");
          setEditorState(EditorState.createEmpty());
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mail-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>To:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{ border: "none", borderBottom: "1px solid green" }}
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            style={{ border: "none", borderBottom: "1px solid grey" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicMessage" className="mb-3">
          <Form.Label>Message:</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>

        <Button
          type="button"
          onClick={() => {
            navigate("/inbox");
          }}
          variant="secondary"
          style={{ marginLeft: "1rem" }}
        >
          inbox
        </Button>
        {isLoading && <p>Loading......</p>}
      </Form>
    </Container>
  );
};

export default SendForm;
