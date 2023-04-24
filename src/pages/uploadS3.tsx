import React, { useState } from "react";
import AWS from "aws-sdk";
import Navbar from "../components/Navbar";
import { UserType } from "@/types/user";
import NotFoundPage from "@/components/404";
import { Auth } from "aws-amplify";

const S3_BUCKET = "team20-driverapps";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: "AKIAT77CFA37R6U3EMOS",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <h2>
        PLEASE NAME THE APPLICATION: &#39name of your organization&#39.pdf
      </h2>
      <div>Application File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default UploadToS3WithNativeSdk;
