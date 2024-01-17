import {
  S3Client,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
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
export const getImagesUrlfromS3 = async (image) => {
  const getObjectParams = {
    Bucket: bucketname,
    Key: image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return url;
};

// NOT WORKING
export const listFilesInBucket = async () => {
  const command = new ListObjectsV2Command({
    Bucket: bucketname,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    // console.log("Your bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await s3.send(
        command
      );
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
};

// NOT WORKING
export const postImagestoS3 = async (image) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const data = {
      Bucket: bucketname,
      Key: req.body.name,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(data);
    await s3.send(command);

    res.send({});
  });
};
