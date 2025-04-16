import { S3 } from "aws-sdk";
import path from "path";
import fs from "fs";

const s3 = new S3({
       accessKeyId : process.env.ACCESS_KEYID,
        secretAccessKey : process.env.SECRET_KEYID,
        endpoint : process.env.ENDPOINT
})

export async function downloadS3folder(prefix : string){
    const allfiles = await s3.listObjectsV2({
        Bucket : "vercel",
        Prefix : prefix
    }).promise();

    const allPromises = allfiles.Contents?.map( async({Key})=>{
        return new Promise((resolve)=>{
            if(!Key){
                resolve('')
                return ;
            }

            const finalOutputPath = path.join(__dirname, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirname = path.dirname(finalOutputPath);
            if(fs.existsSync(dirname)){
                fs.mkdirSync(dirname, {recursive : true})
            }
            s3.getObject({
                Bucket : "vercel",
                Key : Key
            }).createReadStream().pipe(outputFile.on("finish",()=>{
                resolve("")
            }))
        })
    }) || []
    
    await Promise.all(allPromises?.filter(x=> x !== undefined))
}