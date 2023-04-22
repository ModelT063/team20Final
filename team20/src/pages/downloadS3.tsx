import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='team20-driverapps';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: 'AKIAT77CFA37R6U3EMOS',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const DownloadFromS3 = () => {

    const downloadFile = async (file:any) => {
        const client = new S3Client({})

        const command = new GetObjectCommand({
            Bucket: "team20-driverapps",
            Key: file
        });

        try {
            const response = await client.send(command);
            // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
            const str = await response.Body.transformToString();
            console.log(str);
        } catch (err) {
            console.error(err);
        }
    }

    return <div>
        <div>Application File Download</div>
        <button onClick={() => downloadFile("homework 1.pdf")}>Download from S3</button>
    </div>
}

export default DownloadFromS3;
