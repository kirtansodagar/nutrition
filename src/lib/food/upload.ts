import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION_MAP: Record<string, string> = {
  "ap-south-1": "ap-south-1",
  "ap-southeast-2": "ap-southeast-2",
  "us-east-1": "us-east-1",
  "Asia Pacific (Sydney) ap-southeast-2": "ap-southeast-2",
  "Asia Pacific (Mumbai) ap-south-1": "ap-south-1",
  "US East (N. Virginia) us-east-1": "us-east-1",
};

const rawRegion = process.env.AWS_REGION || "ap-south-1";
const s3 = new S3Client({
  region: REGION_MAP[rawRegion] || rawRegion,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "ruflo-nutrition";

export async function uploadMealPhoto(
  file: Buffer,
  contentType: string,
  userId: string
): Promise<string> {
  const key = `meals/${userId}/${Date.now()}.jpg`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
}
