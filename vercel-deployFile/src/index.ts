import { commandOptions, createClient } from "redis";

const subscriber = createClient()
subscriber.connect();

export async function main (){
    while(1){
        const res = await subscriber.brPop( 
            commandOptions({isolated:true}),
            "upload-queue",
            0
        )
    }
    
}