import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION_MAP: Record<string, string> = {
  "ap-south-1": "ap-south-1",
  "ap-southeast-2": "ap-southeast-2",
  "us-east-1": "us-east-1",
  // Handle display names
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

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const key = `meals/${userId}/${Date.now()}-${file.name}`;
  const bucketName = process.env.AWS_S3_BUCKET || "ruflo-nutrition";

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const url = `https://${bucketName}.s3.amazonaws.com/${key}`;
  return NextResponse.json({ url });
}
