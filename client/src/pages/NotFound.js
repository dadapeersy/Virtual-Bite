import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container  vh-100 d-flex justify-content-center align-items-center flex-column">
        <h2 className="">Opps!! Page not found!!</h2>
        <NavLink to="/" className=" btn btn-primary">
          Home
        </NavLink>
      </div>
    </>
  );
};

export default NotFound;
