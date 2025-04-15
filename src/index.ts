import express from "express";
import cors from "cors"
import generateIdForSession from "./utils";
import simpleGit from "simple-git";

const app = express()

app.use(express.json());
app.use(cors())

app.post("/deploy", async(req,res)=>{
    const repoUrl = req.body.repoUrl 
    const id = generateIdForSession()
    
    await simpleGit().clone(repoUrl, `output/${id}`);
    res.json({
        id : id
    })
});

app.listen(3000)