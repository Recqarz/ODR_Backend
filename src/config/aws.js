
import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from "dotenv";
dotenv.config();

    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: process.env.region,
    });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const s3 = new S3Client({
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });

export {ses,s3}




