import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";
import ModalMessage from "./ModalMessage";
// import CameraModal from "./WebCamModal";
import WebCamModal from "./WebCamModal";
import { Button } from "react-bootstrap";
export const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileAdhar, setFileAdhar] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [filenameAdhar, setFilenameAdhar] = useState("Upload your adhar file");

  const [imagePreviewUrl, setImagePreview] = useState(null);
  const [imagePreviewUrlAdhar, setImagePreviewAdhar] = useState(null);

  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [name, setName] = useState("");
  const [imgSrc, setImg] = useState(null);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedFileAdhar, setUploadedFileAdhar] = useState({});

  const [show, setShow] = useState(false);
  const [showWebCam, setShowWebCam] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseWebCam = () => setShowWebCam(false);
  const handleShowWebCam = () => setShowWebCam(true);

  // const webcamRef = React.useRef(null);
  const onChange1 = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    reader.readAsDataURL(e.target.files[0]);
  };
  const onChangeAdhar = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewAdhar(reader.result);
    };
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    reader.readAsDataURL(e.target.files[0]);
  };

  const webCamSetFile = (img) => {
    let image = dataURItoBlob(img);
    setFile(image);
  };
  const webCamSetFileName = (name) => setFilename(name);


  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  // const webcamRef = React.useRef(null);
  // // const [imgSrc, setImgSrc] = React.useState(null);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   // setImgSrc(imageSrc);
  //   props.setImagePreview(imageSrc);
  // }, [webcamRef]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/predict", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      console.log(res)
      // if (!res.data.output.length) {
      //   alert(res.data.msg);
      // } else {
      //   const { msg, output } = res.data;
      //   setMessage(msg);
      //   setName(output);
      //   // setName(res.data.output);
      //   handleShow(true);
      // }
      const { msg, output } = res.data
      setMessage(msg)
      handleShow(true)
      console.log(output)
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
    } catch (err) {
      console.log(err)
    }
  };
  const onSubmit1 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://mlforfun.xyz/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      console.log(res.data);
      const { msg, output } = res.data;
      setMessage(msg)
      setName(output)
      handleShow(true)
      // setUploadedFile({ fileName, filePath });
      if (res.data.output) {
        // alert(res.data.output)
        console.log(res.data.output)
      }
      // setMessage("File Uploaded");
    } catch (err) {
      console.error(err)
    }
  };


  return (
    <Fragment>
      <form onSubmit={onSubmit1}>
        <div className="customFile row">
          <div className="col-6" style={{ textAlign: "right" }}>
            <Button className="btn btn-primary" onClick={handleShowWebCam}>
              {/* <p className="text-sm-left text-wrap">Upload </p> */}Upload
              from Webcam
            </Button>
          </div>
          <div className="col-6 col-lg-3 col-md-4">
            {/* <div className="col-6"> */}
            <label
              className="custom-file-label"
              htmlFor="customFile"
              onChange={onChange1}
              style={{ maxWidth: "210px" }}
            // width="50%"
            >
              {filenameAdhar}
              <input type="file" id="customFile" id="customFile" hidden />
            </label>
            {/* </div> */}
          </div>
          {/* <div className="col-6" style={{ textAlign: "center" }}>
            
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange1}
            />
            
  </div> */}
        </div>
        {/* <Progress percentage={uploadPercentage} /> */}
        {imagePreviewUrl ? (
          <div className="row mt-1 mb-1">
            <div className=" col-md-5 m-auto" style={{ textAlign: "center" }}>
              <h3 className="text-center">{uploadedFile.fileName} </h3>
              <img
                style={{ width: "100%" }}
                src={imagePreviewUrl}
                alt=""
                className="mb-1"
              />
            </div>
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <input
                type="submit"
                value="Upload"
                className="btn btn-primary "
              />
            </div>
          </div>
        ) : null}

          {/* Adhar upload file */}
        <div className="customFile row">

          <div className="col-12 col-lg-12 col-md-12">
            {/* <div className="col-6"> */}
            <label
              className="custom-file-label"
              htmlFor="customFile"
              onChange={onChangeAdhar}
              style={{ maxWidth: "210px" }}
            // width="50%"
            >
              {filename}
              <input type="file" id="customFile" id="customFile" hidden />
            </label>
            {/* </div> */}
          </div>
          {/* <div className="col-6" style={{ textAlign: "center" }}>
            
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange1}
            />
            
  </div> */}
        </div>
        {/* <Progress percentage={uploadPercentage} /> */}
        {imagePreviewUrlAdhar ? (
          <div className="row mt-1 mb-1">
            <div className=" col-md-5 m-auto" style={{ textAlign: "center" }}>
              <h3 className="text-center">{uploadedFile.fileName} </h3>
              <img
                style={{ width: "100%" }}
                src={imagePreviewUrlAdhar}
                alt=""
                className="mb-1"
              />
            </div>
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <input
                type="submit"
                value="Upload"
                className="btn btn-primary "
              />
            </div>
          </div>
        ) : null}
        <ModalMessage
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          name={name}
        // imgSrc={imgSrc}
        />
        <WebCamModal
          handleClose={handleCloseWebCam}
          handleShow={handleShowWebCam}
          show={showWebCam}
          setImagePreview={setImagePreview}
          webCamSetFile={webCamSetFile}
          webCamSetFileName={webCamSetFileName}
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
