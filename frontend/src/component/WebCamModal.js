import React from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";
import { Modal, Button, Container } from "react-bootstrap";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamModal = (props) => {
  const webcamRef = React.useRef(null);
  // const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setImgSrc(imageSrc);
    props.setImagePreview(imageSrc);
    props.webCamSetFile(imageSrc);
    props.webCamSetFileName("WebCam");
    props.handleClose();
  }, [webcamRef]);

  return (
    <Modal
      show={props.show}
      // show={true}
      onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          The Celebrity you look like is
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body> */}
      <Modal.Body>
        {/* <Container> */}
        <div style = {{textAlign:"center"}}>
          <Webcam
            audio={false}
            // height={256}
            ref={webcamRef}
            mirrored={true}
            screenshotFormat="image/jpeg"
            width={465}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture Photo</button>
        </div>
        {/* </Container> */}
      </Modal.Body>
      {/* </Modal.Body> */}
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

WebCamModal.propTypes = {};

export default WebCamModal;
