import { Container } from "react-bootstrap";
import EmailList from "./EmailList";

const MainInboxPage = () => {
  return (
    <>
      <Container
        fluid
        style={{
          width: "80%",
          minHeight: "90vh",
          //   margin: "2rem auto",
          boxShadow: "grey 0px 0px 3px 2px",
        }}
      >
        <EmailList />
      </Container>
    </>
  );
};

export default MainInboxPage;
