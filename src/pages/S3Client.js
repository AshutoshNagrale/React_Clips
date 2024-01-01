import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
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

export const getImagesUrlfromS3 = async (image) => {
  const getObjectParams = {
    Bucket: bucketname,
    Key: image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return url;
};
