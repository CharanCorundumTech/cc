import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PasswordResetSuccess = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Show Password Reset Success
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your password has been successfully reset.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PasswordResetSuccess;
