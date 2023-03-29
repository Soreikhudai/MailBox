import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Navbar bg="dark" variant="dark" fixed="top" style={{ height: "8vh" }}>
      <Nav
        className="me-auto"
        style={{ display: "flex", gap: "3rem", margin: "1rem" }}
      >
        {!isAuthenticate && (
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        )}
        {!isAuthenticate && (
          <Link to="/auth" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}

        {isAuthenticate && (
          <Link to="/form" style={{ color: "white", textDecoration: "none" }}>
            Mymail
          </Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
