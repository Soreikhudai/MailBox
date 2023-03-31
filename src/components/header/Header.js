import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth");
  };

  return (
    <Container
      fluid
      className="header"
      style={{
        borderBottom: "1px solid lightGrey",
        zIndex: 1,

        height: "8vh",
      }}
    >
      <Row className="align-items-center" style={{ height: "7vh" }}>
        <Col xs={4} className="d-flex align-items-center gap-1">
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "40px", color: "grey" }}
          />
          <h1 style={{ color: "grey" }}>xmail</h1>
        </Col>
        <Col
          xs={4}
          className="d-flex align-items-center justify-content-center"
        >
          <InputGroup>
            <FormControl placeholder="Search" aria-label="Search" />
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={4} className="d-flex justify-content-end gap-1">
          <Button onClick={logoutHandler}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
