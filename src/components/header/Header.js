import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCloud,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";

const Header = () => {
  return (
    <Container
      fluid
      className="header"
      style={{
        borderBottom: "1px solid lightGrey",
        zIndex: 1,
      }}
    >
      <Row className="align-items-center" style={{ height: "7vh" }}>
        <Col xs={4} className="d-flex align-items-center gap-1">
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "40px", color: "grey" }}
          />
          <h1 style={{ color: "grey" }}>Gmail</h1>
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
          <FontAwesomeIcon icon={faTrash} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faCloud} />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
