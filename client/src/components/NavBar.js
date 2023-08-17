import React from "react";
import { NavLink,  } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <>


      <Navbar expand="sm" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className=" m-0s">
            <NavLink to="/" className="nav-link ">
              <h3 className="m-0">Virtual Bite</h3>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar sticky-top me-auto mx-auto ">
              <NavLink to="/" className="nav-link  fw-bold">
                Home
              </NavLink>
              <NavLink to="/create-recipe" className="nav-link  fw-bold">
                Create Recipe
              </NavLink>
              {!cookies.access_token ? (
                <NavLink to="/auth" className="nav-link  fw-bold">
                  Login / Sign up
                </NavLink>
              ) : (
                <>
                  <NavLink to="/saved-recipe" className="nav-link  fw-bold">
                    Saved Recipe
                  </NavLink>{" "}
                  <NavLink to="/profile" className="nav-link  fw-bold">
                    Profile
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
