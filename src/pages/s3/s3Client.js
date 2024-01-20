import https from "https";
import {
  S3Client,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketname = import.meta.env.VITE_BUCKET_NAME;
const bucketregion = import.meta.env.VITE_BUCKET_REGION;
const accesskeys = import.meta.env.VITE_ACCESS_KEYS;
const secretaccesskeys = import.meta.env.VITE_SECRET_ACCESS_KEYS;

// S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: accesskeys,
    secretAccessKey: secretaccesskeys,
  },
  region: bucketregion,
});

//GET SIGNED URL FOR SINGLE OBJECT
export const getImageUrlfromS3 = async (filename) => {
  const getObjectParams = {
    Bucket: bucketname,
    Key: filename,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return url;
};

//LIST ALL OBJECTS OF BUCKET
export const listFilesInBucket = async (maxkey) => {
  const params = {
    // ListObjectsRequest
    Bucket: bucketname, // required
    MaxKeys: maxkey,
  };

  const command = new ListObjectsCommand(params);
  const { Contents } = await s3.send(command);
  const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
  return contentsList;
};

// PUT OBJECTS INTO BUCKET USING SIGNED URL
export const createPresignedUrlWithClient = async (key) => {
  const command = new PutObjectCommand({ Bucket: bucketname, Key: key });
  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

//PUT OBJECT IN S3 USING PRE SIGNED URL GOT FROM
// createPresignedUrlWithClient METHOD
export const uploadObjectIntoS3 = async () => {
  try {
    const s3_upload_url = await createPresignedUrlWithClient(selectedFile.name);

    const response = await axios.put(s3_upload_url, selectedFile, {
      headers: {
        "Content-Type": selectedFile.type,
      },
    });

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

//LoadObjects with marker
export const loadObjects = async (nextmarker) => {
  try {
    const params = {
      Bucket: bucketname,
      Marker: nextmarker,
      MaxKeys: 5,
    };

    const data = new ListObjectsCommand(params);
    const res = await s3.send(data);
    return res;
  } catch (error) {
    console.error("Error fetching S3 objects:", error);
  }
};
