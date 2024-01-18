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

const s3 = new S3Client({
  credentials: {
    accessKeyId: accesskeys,
    secretAccessKey: secretaccesskeys,
  },
  region: bucketregion,
});

//Working
export const getImagesUrlfromS3 = async (filename) => {
  const getObjectParams = {
    Bucket: bucketname,
    Key: filename,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return url;
};

//WORKING
export const listFilesInBucket = async () => {
  const params = {
    // ListObjectsRequest
    Bucket: bucketname, // required
    MaxKeys: "10",
  };

  const command = new ListObjectsCommand(params);
  const { Contents } = await s3.send(command);
  const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
  return contentsList;
};

// NOT WORKING
export const createPresignedUrlWithClient = ({ key }) => {
  const command = new PutObjectCommand({ Bucket: bucketname, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
};

function put(url, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          resolve(responseBody);
        });
      }
    );
    req.on("error", (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
}
export const main = async () => {
  const KEY = "src/assets/g2.jpg";

  // There are two ways to generate a presigned URL.
  // 1. Use createPresignedUrl without the S3 client.
  // 2. Use getSignedUrl in conjunction with the S3 client and GetObjectCommand.
  try {
    const clientUrl = await createPresignedUrlWithClient({
      key: KEY,
    });

    // After you get the presigned URL, you can provide your own file
    // data. Refer to put() above.

    console.log("Calling PUT using presigned URL with client");
    await put(clientUrl, "Hello World");

    console.log("\nDone. Check your S3 console.");
  } catch (err) {
    console.error(err);
  }
};
