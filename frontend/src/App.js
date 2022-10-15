import React from "react";
import "./App.css";
import FileUpload from "./component/FileUpload"
const App = () => (
  <div className="container mt-1">
    <h4 className="display-4 text-center mb-2">
      <i className="fab fa-react"></i>
      React File Upload
    </h4>
    <FileUpload />
  </div>
);

export default App;
