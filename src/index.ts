import express from "express";
import cors from "cors"
import generateIdForSession from "./utils";
import simpleGit from "simple-git";
import path from "path";
import { getAllFiles } from "./file";
import { uploadfile } from "./cloudFlare";

const app = express()

app.use(express.json());
app.use(cors())

app.post("/deploy", async(req,res)=>{
    const repoUrl = req.body.repoUrl 
    const id = generateIdForSession()
    
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)) ;
    const allfiles = getAllFiles(path.join(__dirname, `output/${id}`))
    allfiles.forEach(file => {
        uploadfile(file, `output.${id}`);  
    })
    res.json({
        id : id
    })
});

app.listen(3000, ()=>{
    console.log(`Server is running on PORT 3000`);
})