import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";


const DownloadFromS3 = () => {

    const downloadFile = async (file:any) => {
        const client = new S3Client({})

        const command = new GetObjectCommand({
            Bucket: "team20-driverapps",
            Key: "hello-s3.txt"
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
        <button onClick={() => downloadFile(selectedFile)}>Download from S3</button>
    </div>
}

export default DownloadFromS3;
