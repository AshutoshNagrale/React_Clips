import React, { useEffect } from "react";
import "./s3.css";
import { getImagesUrlfromS3, listFilesInBucket } from "./s3Client";

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

  listFilesInBucket()
};

export default S3;
