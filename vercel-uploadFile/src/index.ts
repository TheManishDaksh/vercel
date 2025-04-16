import express from "express";
import cors from "cors"
import generateIdForSession from "./utils";
import simpleGit from "simple-git";
import path from "path";
import { getAllFiles } from "./file";
import { uploadfile } from "./cloudFlare";
import { createClient } from "redis";

const publisher = createClient()
publisher.connect()
const app = express()

app.use(express.json());
app.use(cors())

app.post("/deploy", async(req,res)=>{
    const repoUrl = req.body.repoUrl 
    const id = generateIdForSession()
    
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)) ;
    const allfiles = getAllFiles(path.join(__dirname, `output/${id}`))
    allfiles.forEach(file => {
        uploadfile(file.slice(__dirname.length+1),file);  
    })

    publisher.lPush("upload-queue", id)
    res.json({
        id : id
    })
});

app.listen(3000, ()=>{
    console.log(`Server is running on PORT 3000`);
})