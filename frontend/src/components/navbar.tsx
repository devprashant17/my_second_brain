import logo from '../assets/hero.png';
import user from '../assets/user.png';
import downarrow from '../assets/down-arrow.png';
import search from '../assets/search.png';
import { useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { SquareX } from 'lucide-react';
import { BACKEND_URL } from '../config';

function Dropdown(){
    const [open,setOpen] = useState(false);

    return (
        <section className='relative flex'>
            <div className='cursor-pointer ml-2 flex items-center text-[14px] text-slate-500' onClick={()=>{setOpen(!open)}}>prashant.karki</div>
            {!open && (<img src={downarrow} onClick={()=>{setOpen(!open)}} className='h-6 w-6'/>)}
            {open && (<img src={downarrow} onClick={()=>{setOpen(!open)}} className='rotate-180 h-6 w-6'/>)}
            {open&& (
                <ul className="absolute top-full right-0 -translate-x-2 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Profile
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Settings
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Logout
                    </li>
                </ul>
            )}
        </section>
    );
}

interface NavbarProps {
    refreshContent: () => Promise<void>;
}


export default function Navbar({ refreshContent }: NavbarProps){
    const [open,setOpen] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;
        const tag = tagRef.current?.value || "";
        const tagArray = tag.split(",").map(tag => tag.trim()).filter(tag => tag !== "");;

        const response = await fetch(`${BACKEND_URL}/api/v1/content`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                token: localStorage.getItem("token") || ""
            },
            body:JSON.stringify({
                type:type,
                link: link,
                tags:tagArray,
                title:title
            })
        });

         const data = await response.json();

        if (response.ok) {
            console.log(data);
            await refreshContent();
            setOpen(false);
        } else {
            console.error(data);
        }
    }

    return <div className="fixed top-0 left-0 z-50 h-16 w-full flex items-center justify-between p-2 pr-4 pl-4 shadow-sm bg-white">
        <Link to="/dashboard" id="navleft" className='flex cursor-pointer '>
            <div className='p-2 mr-4'>
                <img src={logo} className='h-8 w-8'/>
            </div>
            <div>
                <div className='font-bold'>My Second Brain</div>
                <div className='text-slate-700 text-xs'>Store your brain</div>
            </div>
        </Link>
        <div id="navright" className='flex items-center'>
            <div className='bg-[#e9ecef] text-slate-300 flex items-center  rounded-full p-2 pr-10 pl-8 '>
                <img src={search} className='cursor-pointer h-4 w-4 mr-7'/>
                <input placeholder='Search content' className='bg-[#e9ecef] text-slate-900 focus:border-none focus:outline-none'/>
            </div>
                
                <div onClick={()=>{setOpen(true)}} className='cursor-pointer shadow-md rounded-xl pl-4 pr-5 pt-2 pb-2 ml-8 flex items-center bg-[#171916] hover:opacity-[90%] hover:shadow-md text-[#F5F6EF]'><Plus className=' mr-2 h-5 w-5' />Add Content  
            </div>
            <div id="profile" className='flex items-center m-2 ml-20'>
                <img src={user} className='h-8 w-8 flex items-center rounded-full border-2 border-[#ffc300]'/>
                <Dropdown />
            </div>
        </div>
        {open && (
            <div className=" fixed inset-0 z-50 flex flex-col items-center justify-center">
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />

                <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl">
                    <div className='flex justify-between mb-7'>
                        <div>
                            <div className='text-[#757A70] text-[12px]'>BUILD YOUR KNOWLEDGE</div>
                            <div className='text-[25px] font-bold'>Add to your brain </div>
                        </div>
                        <SquareX className='ml-[200px] h-10 w-10 text-slate-600' onClick={() => setOpen(false)} />
                    </div>
                    
                    <div className='flex flex-col justify-around'>
                        <div className='mb-7'>
                            <div className='text-slate-700 text-[12px]'>Content Type</div>
                            <select ref={typeRef} name="type" id="type" className="w-full border-[1px] rounded-md p-2">
                                <option value="Link">Link</option>
                                <option value="Youtube">YouTube</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Document">Document</option>
                            </select>
                        </div>

                        <div className='mb-7'>
                            <div className='text-slate-700 text-[12px]'>URL</div>
                            <input ref={linkRef} id="url"className="w-full border-[1px] rounded-md p-2" placeholder='https://example.com/article'></input>
                        </div>

                        <div className='mb-7'>
                            <div className='text-slate-700 text-[12px]'>Title</div>
                            <input ref={titleRef} id="title" className="w-full border-[1px] rounded-md p-2" placeholder='Something worth remembering'></input>
                        </div>

                        <div className='mb-7'>
                            <div className='flex'>
                                <div className='text-slate-700 text-[12px]'>Tags</div>
                                <div className='text-[#757A70] text-[8px] mt-1 ml-1'>Comma separated</div>
                            </div>
                            <input ref={tagRef} id="tags" className="w-full border-[1px] rounded-md p-2" placeholder='Design,Research,Ideas'></input>
                        </div> 
                        <div onClick={addContent} className='cursor-pointer shadow-md rounded-md pl-4 pr-5 pt-2 pb-2 flex justify-center items-center bg-[#171916] hover:opacity-[90%] hover:shadow-md text-[#F5F6EF]'>  
                            <Plus className=' mr-2 h-5 w-5' />
                            <div>Add Content </div> 
                        </div>
                    </div>
                    
                </div>
            </div>
        )}

    </div>
}