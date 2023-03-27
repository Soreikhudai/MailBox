import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container style={{ marginTop: "20vh" }}>
      <Row className="my-5">
        <div className="text-center">
          <h1 className="text-success">Welcome to the Mail Box Client</h1>
        </div>
      </Row>
    </Container>
  );
};
export default Home;
