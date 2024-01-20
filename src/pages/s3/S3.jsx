import React, { useEffect, useState } from "react";
import S3Pagination from "./S3Pagination";
import "./s3.css";
import {
  getImageUrlfromS3,
  listFilesInBucket,
  createPresignedUrlWithClient,
  uploadObjectIntoS3,
  loadObjects,
} from "./s3Client";
import {
  S3Client,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import axios from "axios";

// Images Names
// 1696777733401wbh.png
// 1696786311238bbgfh.png
// 1696786581910bbgfh.png
// 1696786647218bbgfh.png
// 1696786755590bbgfh.png
const S3 = () => {
  const [objects, setObjects] = useState([]);
  const [nextContinuationToken, setNextContinuationToken] = useState(null);
  const imageName = "1696777733401wbh.png";
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log("UseEffect");
    loadObjects(nextContinuationToken).then((res) => {
      const { Contents } = res;
      setObjects((prev) => [...prev, ...Contents]);
      const lastMarker =
        nextContinuationToken === null ? Contents[Contents.length - 1].Key : "";
      setNextContinuationToken(lastMarker);
      // console.log("res", res, "\n", "Last_KEY", Contents[Contents.length - 1]);
    });
  }, []);

  // console.log("objects", objects);
  // console.log("nextContinuationToken", nextContinuationToken);

  const handleLoadMore = () => {
    console.log("HandleMoreButton");
    loadObjects(nextContinuationToken)
      .then((res) => {
        console.log(res);
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
  const getImage = async () => {
    const imageUrl = await getImagesUrlfromS3(imageName);
    return imageUrl;
  };

  //Get ALL Objects from Bucket
  const getAllObjects = () => {
    const res = listFilesInBucket(10);
    return res;
  };

  //input change
  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //upload
  const handleFileUpload = async () => {
    await uploadObjectIntoS3(selectedFile);
  };

  return (
    <>
      <div className="s3Container">
        <div className="title">S3 Integration</div>
        <div className="s3Wrapper">
          <div className="allObjects">
            <p>Objects Table</p>
            <ul>
              {objects.map((object, index) => (
                <li key={index}>{object.Key}</li>
              ))}
            </ul>
            {nextContinuationToken && (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          <div className="GetObjects">Get Image</div>
          <div className="uploadImage">
            <input
              type="file"
              className="uploadInput"
              onChange={handleFileInputChange}
            />
            <button
              disabled={selectedFile === null ? true : false}
              className="uploadButton"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default S3;
