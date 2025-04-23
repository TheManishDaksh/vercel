import axios from "axios";
import { useEffect, useState } from "react"

function App() {

  const [repoUrl, setRepoUrl] = useState("");
  useEffect( ()=>{
    const deploy = async ()=>{
      try{
        const res = await axios.post("http://localhost:3001",{
          repoUrl : repoUrl
        })
        if(res){
  
        }
      }catch(error){
        console.log(error);
        alert("something erong with server side")
      }
    }
    if(repoUrl){
      deploy()
    }
  },[repoUrl])
return (
  <div style={{display:"flex",justifyContent:"center", alignItems: "center", height:"100vh", width: "100vw",backgroundColor:"#e2e8f0"}}>
    <div style={{backgroundColor: "white",padding : "40px", borderRadius : "10px" }}>
    <div style={{ paddingBottom : "10px"}}> 
      <p>Deploy your GitHub Repositories</p>
      <p style={{ color : "#94a3b8"}}>Enter the URL of your GitHub repo to deploy </p>  
    </div>

    <div>
      <p>Github Repository URL</p>
      <div><input onChange={(e)=>{
        setRepoUrl(e.target.value)
      }}
      style={{padding : "8px", width:"100%",borderRadius : "10px", }}
      type="text" placeholder="https://github.com/username/project"/></div>

      <div style={{ paddingTop : "10px"}}>
      <button onClick={()=>{
        alert("your deployment is on the way")
      }}
      style={{ padding : "8px", width : "107%", borderRadius : "10px", cursor : "pointer",backgroundColor:"black", color : "white" }}>upload</button>
      </div>
    </div>
    </div>
  </div>
)
}

export default App
