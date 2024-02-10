import axios from "axios";
import "./fileDownload.css";
import React, { useState } from "react";
// import { getImagesUrlfromS3 } from "../S3Client";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

const FileDownload = () => {
  const [loading, setLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState("");
  const imageUrl = "image.jpg";

  const getFile = async () => {
    setLoading(true);
    setError("");
    try {
      // const signedImageUrl = await getImagesUrlfromS3(imageUrl);
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const response = await axios.get(proxyUrl + inputUrl, {
        responseType: "blob",
      });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.download = imageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
    } catch (error) {
      setError("Error Getting Image");
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setInputUrl(event.target.value);
  };

  return (
    <div className="fileDownloadContainer">
      <Navbar className="buttonSize" />
      <input
        className="fileInput"
        type="text"
        placeholder={"Provide Link of Image"}
        onChange={handleChange}
      />
      <button className="downloadButton" onClick={getFile}>
        {loading ? "Downloading...." : "Download File"}
      </button>
      {error && "Error Getting Image. Check the image address"}

      <div className="linkComponent">
        <p>Provide Full Url of Image</p>
        <p>Example : https://www.demo-image.jpg</p>
        <p>
          Before using visit this site below, to get temporarily access to the
          demo
        </p>
        <p>
          <a href="https://cors-anywhere.herokuapp.com/" target="blank">
            <u>https://cors-anywhere.herokuapp.com/</u>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FileDownload;
