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

export async function copyFinalDist(id : string){
    const folderPath = path.join(__dirname, `output/${id}/dist`);
    const allfiles = getAllFiles(folderPath)
    allfiles.forEach(file =>{
        uploadFile(`dist/${id}/` + file.slice(folderPath.length+1),file)
    })
}

const getAllFiles = (folderPath: string)=>{
    let response : string[] = []

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file)
        if(fs.statSync(fullFilePath).isDirectory()){
            response = response.concat(getAllFiles(fullFilePath))
        }else{
            response.push(fullFilePath)
        }
    }) 
    return response ;
}

const uploadFile = async(fileName : string, localFIlePath : string)=>{
    const fileContent = fs.readFileSync(localFIlePath)
    const response = await s3.upload({
        Body : fileContent,
        Bucket : "vercel",
        Key : fileName
    }).promise()
}