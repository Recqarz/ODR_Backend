
import AWS from "aws-sdk";

    AWS.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: process.env.region,
    });

 export   const ses = new AWS.SES({ apiVersion: "2010-12-01" });


