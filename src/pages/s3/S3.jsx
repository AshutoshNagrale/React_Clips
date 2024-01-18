import React, { useEffect } from "react";
import "./s3.css";
import { getImagesUrlfromS3, listFilesInBucket, main } from "./s3Client";

const S3 = () => {
  // Images Names
  // 1696777733401wbh.png
  // 1696786311238bbgfh.png
  // 1696786581910bbgfh.png
  // 1696786647218bbgfh.png
  // 1696786755590bbgfh.png

  const imageName = "1696777733401wbh.png";

  //GET image url from s3 using presigned url
  const getImage = async () => {
    const imageUrl = await getImagesUrlfromS3(imageName);
    return imageUrl;
  };

  //Get ALL Objects from Bucket
  const getAllObjects = () => {
    const res = listFilesInBucket();
    return res;
  };

  main()

  return (
    <>
      <div className="s3Container">
        <div className="title">S3 Integration</div>
        <div className="s3Wrapper">
          <div className="uploadImage">Upload Image</div>
          <div className="uploadImage">Get Image</div>
          <div className="uploadImage">Get ALL Image</div>
        </div>
      </div>
    </>
  );
};

export default S3;
