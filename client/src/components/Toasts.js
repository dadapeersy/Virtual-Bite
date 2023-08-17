import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";

const Toasts = ({ show, handleCloseToasts, label }) => {
  // const [show, setShow] = useState(false);

  return (
    <>
      <Toast
        onClose={handleCloseToasts}
        show={show}
        delay={3000}
        autohide
        style={{ zIndex: "9999" }}
        className=" position-fixed top-0  end-0 my-3 mx-2"
      >
        <Toast.Header>
          <strong className="w-100">Alert</strong>
        </Toast.Header>
        <Toast.Body
          className={`bg-white rounded-bottom ${
            label === "delete" ? "text-danger" : "text-success"
          }`}
        >
          {label === "delete"
            ? "Recipe deleted successfully"
            : "Recipe added successfully"}
        </Toast.Body>
      </Toast>

      {/*<Button onClick={() => setShow(true)} className="btn btn-primary">*/}
      {/*  Show Toast*/}
      {/*</Button>*/}
    </>
  );
};

export default Toasts;
