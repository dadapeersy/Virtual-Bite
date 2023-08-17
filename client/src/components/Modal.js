import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Modals = ({ show, handleClose, handleToasts, deleteRecipes }) => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const setShowToasts = () => {
    handleToasts();
  };
  return (
    <>
      {/*<Button className="nextButton" onClick={handleShow}>*/}
      {/*  Open Modal*/}
      {/*</Button>*/}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowToasts();
              handleClose();
              deleteRecipes();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
