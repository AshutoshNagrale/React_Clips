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

  const imageName = "";
  const getImage = async () => {
    const imageUrl = await getImagesUrlfromS3(imageToGet);
    return imageUrl;
  };
  listFilesInBucket().then((i) => console.log(i));
  return <div>S3</div>;
};

export default S3;
