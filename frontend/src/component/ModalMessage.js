import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const ModalMessage = (props) => {
  // console.log(props.imgSrc);
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          The Celebrity you look like is
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {props.name}
          {/* <img style={{ width: "100%" }} src={`data:image/jpeg;base64,${props.imgSrc}`} alt="" /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalMessage.propTypes = {};

export default ModalMessage;
