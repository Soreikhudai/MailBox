import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { SoreiApp } from "../../firebase";
import { Button } from "react-bootstrap";

const ResetPassword = () => {
  const auth = getAuth(SoreiApp);
  const navigate = useNavigate();
  const passwordChangeRef = useRef("");

  const resetForgotPasswordHandler = async (event) => {
    event.preventDefault();

    const email = passwordChangeRef.current.value;

    if (auth) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
        navigate("/auth");
      } catch (error) {
        alert("something went wrong");
      }
    }
  };

  const goToAuthPageHandler = () => {
    navigate("/auth");
  };

  return (
    <>
      <Card>
        <form>
          <div className="m-5 d-flex justify-content-center flex-column align-items-center gap-4">
            <h4>Enter the registered email</h4>
            <div className="w-100">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                ref={passwordChangeRef}
                className="form-control"
                type="email"
                id="email"
                placeholder="eg. example@gmail.com"
              />
            </div>
            <div>
              <Button
                style={{ width: "100%" }}
                onClick={resetForgotPasswordHandler}
                type="button"
                className="btn btn-primary btn-lg"
              >
                send link
              </Button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <button onClick={goToAuthPageHandler} className="btn btn-link">
            Already a user? Login
          </button>
        </div>
      </Card>
    </>
  );
};
export default ResetPassword;
