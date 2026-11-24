import { useState } from "react"
import { BACKEND_URL } from "../config";
import { Link,useNavigate } from "react-router-dom";

import brain from '../assets/brain.png'

import { Eye, EyeOff } from "lucide-react";

export default function SignUp(){
    const [username,setUsername] = useState(""); 
    const [password,setPassword] = useState("");
    const [responseCode,setResponseCode] = useState(200);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    async function handleSignUp(){  
        try{
            setResponseCode(200);
            const response = await fetch(`${BACKEND_URL}/api/v1/signup`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            });

            if(response.ok){
                const data = await response.json();
                localStorage.setItem("token",data.token);
                console.log("Signed Up Successfully!");

                navigate("/dashboard");
            }
            else if(response.status == 411){
                setResponseCode(411);
                console.log("Error in input!");
            }
            else if(response.status == 403){
                setResponseCode(403);
                console.log("Username Taken!");
            }
            else{
                console.log("Something went wrong");
            }

        }

        catch(err){
            console.log("Error connecting to backend",err);
        }
    }

    return <div className="bg-[#080A0C] text-slate-100 flex">
            <div id="leftdiv" className="h-screen w-[60vw] flex flex-col justify-center items-center  border-r border-r-slate-900 ">
                <img src={brain} className="h-[30vh] w-[55vh] mb-[5vh]" />
                <div className="text-[50px] font-bold">MY SECOND BRAIN</div>
                <div className="text-[40px] font-bold mb-[5vh]">Store Your Brain</div>
                <div className="text-[15px]">Join Thousands of People</div>
                <div className="text-[15px]">and share your brains with each other</div>
            </div>
            <div id="rightdiv" className="w-[40vw] flex flex-col">
                <div className="flex h-[10vh] w-full mt-[3vw]  justify-end">
                    <div className="text-slate-500">Already a member?</div>
                    <Link to="/" className="ml-[7px] mr-[5vw] text-slate-100">Sign In</Link>
                </div>
                <div className="flex flex-col mt-[10vh] ml-[15vh]">
                    <div className="text-[#C6FF46] text-[15px] mb-[2vh]" >START CREATING</div>
                    <div className="text-slate-100 text-[35px] font-bold" >Create your account</div>
                    <div className="text-slate-500 text-[15px] mb-[2vh]" >Fill up the details!</div>
                    
                    <div>Username</div>
                    <div><input className=" border-2 hover:border-slate-700 border-slate-800 bg-slate-900 pl-4 pr-3 py-2 mt-[1vh] mb-[3vh] h-[5vh] w-[20vw] rounded-lg text-white" id="user" type="text" placeholder="Name123" onChange={(e)=>setUsername(e.target.value)}/></div>
                    <div>Password</div>
                    <div className="relative w-[20vw]">
                        <input className="border-2 hover:border-slate-700 border-slate-800 bg-slate-900 hover: pl-4 pr-3 py-2 mt-[1vh] mb-[3vh] h-[5vh] w-[20vw] rounded-lg text-white bg-[#0606459]" id="pass" type={showPassword ? "text" : "password"} placeholder="Create your password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className=" absolute right-3 top-[35%] -translate-y-1/3 text-slate-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                    </div>
                    <div className="cursor-pointer bg-[#C6FF46] hover:bg-[#D7FF7D]  hover:shadow-2xl text-black rounded-lg h-[5vh] w-[20vw] rounded-lg flex justify-center items-center" onClick={handleSignUp}>Sign Up</div>
                    {(responseCode==411) && (<div className="text-red-400 shadow-md text-[18px] mt-5">
                            <li>Username must be between 3-10 characters.</li>
                            <li>Password must be between 8-20 characters and must have</li>
                            <div>at least one lowercase, uppercase and special character</div>
                        </div>)}
                    {(responseCode==403) && (<div className="text-red-400 shadow-md text-[18px] mt-5">
                            Username already taken!
                        </div>)}
                
                </div>
                
            </div>

        </div>
}