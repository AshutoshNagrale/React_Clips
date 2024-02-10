import React, { useEffect, useState, useRef } from "react";
import "./s3.css";
import {
  getImageUrlfromS3,
  listFilesInBucket,
  createPresignedUrlWithClient,
  uploadObjectIntoS3,
  loadObjects,
  deleteObject,
} from "./s3Client";

import Navbar from "../navbar/Navbar";

// Images Names
// 1696777733401wbh.png
// 1696786311238bbgfh.png
// 1696786581910bbgfh.png
// 1696786647218bbgfh.png
// 1696786755590bbgfh.png
const S3 = () => {
  const [objects, setObjects] = useState([]);
  const [nextContinuationToken, setNextContinuationToken] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [uploading, setUploding] = useState(false);
  const [uploadingProgress, setUploadinProgress] = useState(0);
  const inputFileRef = useRef();
  const [fileToDelete, setFileToDelete] = useState("");
  const [deleting, setDeleting] = useState(false);
  const deleteInputRef = useRef();

  useEffect(() => {
    // console.log("UseEffect");
    function main() {
      loadObjects(nextContinuationToken).then((res) => {
        const { Contents } = res;

        const allObejct = new Set([...objects, ...Contents]);
        setObjects([...allObejct]);

        const lastMarker =
          nextContinuationToken === null
            ? Contents[Contents.length - 1].Key
            : "";
        setNextContinuationToken(lastMarker);
        // console.log("res", res, "\n", "Last_KEY", Contents[Contents.length - 1]);
      });
    }
    main();
  }, []);

  // console.log("objects", objects);
  // console.log("nextContinuationToken", nextContinuationToken);
  const handleLoadMore = () => {
    console.log("HandleMoreButton");
    loadObjects(nextContinuationToken)
      .then((res) => {
        // console.log(res);
        const { Contents } = res;
        setObjects((prev) => [...prev, ...Contents]);
        const lastMarker = res?.IsTruncated
          ? Contents[Contents.length - 1].Key
          : "";
        setNextContinuationToken(lastMarker);
        // console.log("res", res, "\n", "Last_KEY", Contents[Contents.length - 1]);
      })
      .catch((error) => {
        console.log("No more Objects");
      });
  };

  //GET image url from s3 using presigned url
  const getImage = async (key) => {
    const imageUrl = await getImageUrlfromS3(key);
    return imageUrl;
  };

  //Get ALL Objects from Bucket
  const getAllObjects = () => {
    const res = listFilesInBucket(10);
    return res;
  };

  //ViewObject
  const viewObject = async (key) => {
    const objectUrl = await getImageUrlfromS3(key);
    window.open(objectUrl, "_blank");
  };

  //input change
  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDeleteFileInput = (e) => {
    setFileToDelete(e.target.value);
  };

  //upload
  const handleFileUpload = async () => {
    try {
      setUploding(true);
      await uploadObjectIntoS3(selectedFile, setUploadinProgress);
      setUploding(false);
    } catch (error) {
      console.log(error);
    }
    inputFileRef.current.value = null;
    setUploding(false);
    window.location.reload();
  };

  async function deleteFileFromS3() {
    try {
      setDeleting(true);
      await deleteObject(fileToDelete);
      setDeleting(false);
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
    deleteInputRef.current.value = null;
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <>
      <div className="s3Container">
        <Navbar />
        <div className="title">AWS S3 Manager</div>
        <div className="s3Wrapper">
          {/* getObjects */}
          <div className="searchObject">
            <div className="searchObjectText">Storage</div>
            <table>
              <thead>
                <tr>
                  <th className="objectName">Object Name</th>
                  <th className="objectSize">Size</th>
                  <th className="objectLastModified">Last Modified</th>
                  <th className="objectView">View</th>
                  <th className="objectAction">Delete</th>
                </tr>
              </thead>
              <tbody>
                {objects?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="objectKey">{item.Key}</td>
                      <td>{formatBytes(item.Size)}</td>
                      <td>{item.LastModified.toUTCString()}</td>
                      <td>
                        <button onClick={() => viewObject(item.Key)}>
                          View
                        </button>
                      </td>
                      <td>
                        <button>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="uploadObject">
            <div className="uploadText">UploadObject</div>
            <label htmlFor="uploadfile">File</label>
            <input
              ref={inputFileRef}
              id="uploadfile"
              type="file"
              className="uploadInput"
              onChange={handleFileInputChange}
            />
            <button
              disabled={selectedFile === null ? true : false}
              className="uploadButton"
              onClick={handleFileUpload}
            >
              {uploading
                ? `Uploading  ${Math.floor(uploadingProgress * 100)}%`
                : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default S3;
