import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { SoreiApp } from "../../firebase";
import Card from "../UI/Card";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(SoreiApp);
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = !isLogin && confirmPasswordRef.current.value;
    if (!isLogin && password !== confirmPassword) {
      alert("password doesn't match");
      setIsLoading(false);
      return;
    }
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      dispatch(
        authActions.login({
          token: userCredential.accessToken,
          userId: userCredential.user.uid,
        })
      );
      setIsLoading(false);
      navigate("/empty");
    } catch (error) {
      alert("login unable, try again");
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            minLength="6"
            placeholder="Password"
            required
          />
        </Form.Group>
        {!isLogin && (
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              ref={confirmPasswordRef}
              type="password"
              minLength="6"
              placeholder="Confirm Password"
              required
            />
          </Form.Group>
        )}
        {isLogin && <Link to="/reset">Forgot password? click here</Link>}

        {!isLoading && (
          <Button
            className="mt-2"
            variant="secondary"
            type="submit"
            style={{ width: "100%" }}
          >
            {isLogin ? "Click here to Login" : "Create Account"}
          </Button>
        )}

        {isLoading && <p>sending request......</p>}
        <Button
          onClick={switchAuthModeHandler}
          className="mt-2"
          style={{
            background: "transparent",
            color: "blue",
            border: "none",
            fontStyle: "italic",
          }}
        >
          {isLogin
            ? " Don't have an account? create new"
            : "Have an account? click here to Login"}
        </Button>
      </Form>
    </Card>
  );
};

export default Auth;
