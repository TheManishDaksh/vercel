import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath : string) =>{
    let response : string[] = [];

    const getAllFilesAndFolder = fs.readdirSync(folderPath);
    getAllFilesAndFolder.forEach(file => {
        const getFullPath = path.join(folderPath, file);
        if(fs.statSync(getFullPath).isDirectory()){
            response = response.concat(getAllFiles(getFullPath));
        } else {
            response.push(getFullPath);
        }
    })
    return response ;
}