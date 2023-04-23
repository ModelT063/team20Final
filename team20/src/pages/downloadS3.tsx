import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import {
    TextField,
  } from "@mui/material";

const S3_BUCKET ='team20-driverapps';
const REGION ='us-east-1';

const DownloadFromS3 = () => {

    const downloadFile = async (file:any) => {

        const creds = {
            accessKeyId: 'AKIAT77CFA37R6U3EMOS',
            secretAccessKey: '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',
        }
        
        const client = new S3Client({
            region: REGION,
            credentials: creds
        })

        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: file,
        });

        try {
            const response = await client.send(command);
            let blob=new Blob([response.Body], {type: response.Body});
            let link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=file;
            link.click();
        } catch (err) {
            console.error(err);
        }
        
    }

    const [fileName, setFileName] = useState<string>("");

    return <div>
        <div>Application File Download</div>
        <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="Sponsor Organization Name"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setFileName(e.target.value + ".pdf");
            }}
          />
        <button onClick={() => downloadFile(fileName)}>Download from S3</button>
    </div>
}

export default DownloadFromS3;
