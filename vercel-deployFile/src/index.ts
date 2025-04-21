import { commandOptions, createClient } from "redis";
import { copyFinalDist, downloadS3folder } from "./cloudflare";
import { buildProject } from "./utils";

const subscriber = createClient()
subscriber.connect();

const publisher = createClient()
publisher.connect();

export async function main (){
    while(1){
        const res = await subscriber.brPop( 
            commandOptions({isolated:true}),
            "upload-queue",
            0
        );
        //@ts-ignore
        const id: string = res?.element

        await downloadS3folder(`output/${id}`)
        await buildProject(id) 
        await copyFinalDist(id);
        publisher.hSet("status", id , "Deployed") 
    }
    
}
main();