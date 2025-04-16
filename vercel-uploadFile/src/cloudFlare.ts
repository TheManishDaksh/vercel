import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3 ({
    accessKeyId : process.env.ACCESS_KEYID,
    secretAccessKey : process.env.SECRET_KEYID,
    endpoint : process.env.ENDPOINT
})

export const uploadfile = async(filename : string, folderPath: string)=>{
    const fileContent = fs.readFileSync(folderPath);
    const response = await s3.upload({
        Key : filename,
        Body : fileContent,
        Bucket : "vercel"
    }).promise();
    console.log(response);
}