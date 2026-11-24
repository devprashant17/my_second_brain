import { useState } from "react"
import { BACKEND_URL } from "../config";



export default function SignUp(){
    const [username,setUsername] = useState(""); 
    const [password,setPassword] = useState("");

    async function handleSignIn(){  
        try{
            const response = await fetch(`${BACKEND_URL}/api/v1/signin`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            });

            const data = await response.json();

            console.log("Response status:", response.status);
            console.log("Response URL:", response.url);
            console.log("Response body:", data);

            if(response.ok){
                localStorage.setItem("token",data.token);
                console.log("Signed In Successfully!");
            }
            else{
                console.log("Sigin In Failed!");
            }

        }

        catch(err){
            console.log("Error connecting to backend",err);
        }
    }

    return <div className="ml-[500px]">
        <input id="user" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
        <input id="pass" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleSignIn}>Login</button>
    </div>
}