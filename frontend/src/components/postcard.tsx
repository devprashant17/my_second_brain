import { Ellipsis,Clock5,ExternalLink,FileText,Link,Heart,SquareX,Upload } from 'lucide-react';

import { createPortal } from "react-dom";

import yt from '../assets/youtube.png';
import twitter from '../assets/twitter.png';
import { useState,useRef    } from 'react';

import { BACKEND_URL } from '../config';

function timeElapsed(date:any){
    const now = Date.now();
    const created = new Date(date).getTime();

    const seconds = Math.floor((now-created)/1000);
    if(seconds<60) 
        return "Just now";

    const minutes = Math.floor(seconds/60);

    if(minutes === 1)
        return `${minutes} minute ago`;

    if(minutes<60) 
        return `${minutes} minutes ago`;

    const hours = Math.floor(minutes/60);

    if(hours === 1)
        return `${hours} hour ago`;

    if(hours<24) 
        return `${hours} hours ago`;

    const days = Math.floor(hours/24);

    if(days === 1)
        return `${days} day ago`;

    if(days<30) 
        return `${days} days ago`;

    const months = Math.floor(days/30);

    if(months === 1)
        return `${months} month ago`;

    if(months<12) 
        return `${months} months ago`;

    const years = Math.floor(months/12);

    if(years === 1)
        return `${years} year ago`;

    return `${years} years ago`;
}

function Tags(props:any){
    let returnArray:any = [];
    props.arr.forEach((e:string) => {
        returnArray.push(
            <div className="mr-2 p-1 pr-2 pl-2 text-[13px] bg-[#EBECE5] rounded-lg"># {e}</div>
        );
    });
    return <div className=" mt-4 flex">{returnArray}</div>

}

export default function PostCard(props:any){
    const [open,setOpen] = useState(false);
    const url = new URL(props.link);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    const [fav, setFav] = useState(props.fav || false);

    async function setFavState(val: boolean) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/content/favorite`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token") || ""
                },
                body: JSON.stringify({
                    contentId: props.id,
                    fav: val
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return;
            }

            setFav(val);
            props.onFavChange(props.id, val);
        }
        catch (err) {
            console.log("Error updating favorite:", err);
        }
    }

    async function updateContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const tag = tagRef.current?.value || "";
        const type = typeRef.current?.value;

        const tagArray = tag
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/content/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token") || ""
                },
                body: JSON.stringify({
                    contentId: props.id,
                    title,
                    link,
                    type,
                    tags: tagArray
                })
            });

            const data = await response.json();

            if (response.ok) {
                setShowEditBox(false);
                setShowUpdatedMessage(true);
                setOpen(false);

                await props.refreshContent();
                setTimeout(() => {
                    setShowUpdatedMessage(false);
                }, 1500);

            } else {
                console.error(data);
            }
        } catch (err) {
            console.error("Error updating content:", err);
        }
        
    }

    async function deleteContent(){
        try{
            const response = await fetch(`${BACKEND_URL}/api/v1/content`,{
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token") || ""
                },
                body: JSON.stringify({
                    contentId: props.id
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.msg);
                setShowDeletedMessage(true);
                setOpen(false);

                await props.refreshContent();
                setTimeout(() => {
                    setShowDeletedMessage(false);
                    
                }, 1500);
                
                return;
            }
        }
        catch(err){
            console.log("Error msg: ",err);
        }
    }

    return <div style={{borderTop: `6px solid ${props.color}`}} className="flex flex-col justify-between ml-7 m-10 shadow-md rounded-lg w-[21vw] p-6 pb-4 bg-[#F7F7F2] relative transition-all duration-100 ease-out hover:-translate-y-1 hover:shadow-md hover:z-3">
                <div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            {(props.type==="Link")&&(<Link className='h-4 w-4 mt-[2px]'/>)}
                            {(props.type==="Document")&&(<FileText className='h-4 w-4 mt-[1px]'/>)}
                            {(props.type==="Youtube")&&(<img src={yt} className='h-4 w-4 mt-[2px]'/>)}
                            {(props.type==="Tweet")&&(<img src={twitter} className='h-4 w-4 mt-[2px]'/>)}
                            <div className="text-[14px] text-[#858A7F] ml-4 mb-4 ">{props.type}</div>
                        </div>
                        <div className='flex'>
                            {!fav ? 
                            ( <Heart onClick={() => setFavState(true)} className='mr-2 h-5 w-5 cursor-pointer' />) : 
                            ( <Heart onClick={() => setFavState(false)} className='mr-2 h-5 w-5 cursor-pointer text-red-500 fill-red-500'/>)}
                            <Ellipsis onClick={()=>{setOpen(!open)}} className='cursor-pointer'/>
                        </div>
                            
                    </div>
                    <section className='relative flex'>
                                {open && (
                                    <ul className="absolute top-full -translate-y-[2vh] translate-x-[17vw] mt-2 w-[8vw] rounded-lg border bg-white shadow-lg">
                                        <li onClick={async ()=>{
                                            await navigator.clipboard.writeText(props.link);
                                            setOpen(false);
                                            setShowCopiedMessage(true);
                                            setTimeout(() => setShowCopiedMessage(false), 1500);
                                        }} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                            Copy Link
                                        </li>
                                        <li onClick={()=>{
                                            setOpen(false);
                                            setShowEditBox(true);
                                        } } className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                            Edit
                                        </li>
                                        <li onClick={deleteContent} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                            Delete 
                                        </li>
                                    </ul>
                                )}
                                {(!open && showCopiedMessage) && (
                                    <span className='flex justify-around absolute top-full -translate-y-[2vh] translate-x-[15vw] mt-2 w-[7vw] rounded-md border bg-[#16a34a] shadow-lg text-slate-100 text-[14px] pt-2 pb-2 pr-2 pl-2'>
                                        <span>✓</span>
                                        <span>Link copied!</span>
                                    </span>
                                )} 
                                {(!open && showDeletedMessage) && (
                                    <span className='flex justify-around absolute top-full -translate-y-[2vh] translate-x-[15vw] mt-2 w-[7vw] rounded-md border bg-[#dc2626] shadow-lg text-slate-100 text-[14px] pt-2 pb-2 pr-2 pl-2'>
                                        <span>✓</span>
                                        <span>Post deleted!</span>
                                    </span>
                                )}
                                {(!open && showUpdatedMessage) && (
                                    <span className='flex justify-around absolute top-full -translate-y-[2vh] translate-x-[15vw] mt-2 w-[7vw] rounded-md border bg-[#16a34a] shadow-lg text-slate-100 text-[14px] pt-2 pb-2 pr-2 pl-2'>
                                        <span>✓</span>
                                        <span>Post Updated!</span>
                                    </span>
                                )} 
                                
                            </section>
                    <h1 className="text-xl font-bold mb-4 ">{props.title}</h1>
            
                    <Tags arr={props.tags} />
                </div>
                <div className='h-[7vh]'>
                    <hr className='mt-4 mb-4'/>
                    <div className='flex justify-between mt-5'>
                        <div className='flex'>
                            <div className='flex'>
                                {(props.type==="Link")&&(<Link className='h-2 w-2 mt-[2px] mt-[5px]'/>)}
                                {(props.type==="Document")&&(<FileText className='h-2 w-2 mt-[1px] mt-[5px]'/>)}
                                {(props.type==="Youtube")&&(<img src={yt} className='h-2 w-2 mt-[2px] mt-[5px]'/>)}
                                {(props.type==="Tweet")&&(<img src={twitter} className='h-2 w-2 mt-[2px] mt-[5px]'/>)}
                                
                            </div>
                            <div className='text-[#757A70] text-[13px] ml-2'>{url.hostname}</div>
                        </div>
                        
                        <div className='flex'>
                            <Clock5 className='text-[#757A70] h-3 w-3 mt-[3px] mr-2' />
                            <div className='text-[12px] text-[#757A70]'>{timeElapsed(props.createdAt)}</div>
                            <a href={props.link}><ExternalLink className='text-[#757A70] h-4 w-4 ml-2 ' /></a>
                        </div>
                    </div>
                </div>
                {showEditBox && createPortal(
                                    <div className=" fixed inset-0 z-50 flex flex-col items-center justify-center">
                                        <div
                                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                                            onClick={() => setShowEditBox(false)}
                                        />

                                        <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl">
                                            <div className='flex justify-between mb-7'>
                                                <div>
                                                    <div className='text-[#757A70] text-[12px]'>Wanna Change?</div>
                                                    <div className='text-[25px] font-bold'>Update Your Post </div>
                                                </div>
                                                <SquareX className='ml-[200px] h-10 w-10 text-slate-600' onClick={() => setShowEditBox(false)} />
                                            </div>
                                            
                                            <div className='flex flex-col justify-around'>
                                                <div className='mb-7'>
                                                    <div className='text-slate-700 text-[12px]'>Content Type</div>
                                                    <select ref={typeRef} defaultValue={props.type} name="type" id="type" className="w-full border-[1px] rounded-md p-2">
                                                        <option value="Link">Link</option>
                                                        <option value="Youtube">YouTube</option>
                                                        <option value="Twitter">Twitter</option>
                                                        <option value="Document">Document</option>
                                                    </select>
                                                </div>

                                                <div className='mb-7'>
                                                    <div className='text-slate-700 text-[12px]'>URL</div>
                                                    <input defaultValue={props.link} ref={linkRef} id="url"className="w-full border-[1px] rounded-md p-2" placeholder='https://example.com/article'></input>
                                                </div>

                                                <div className='mb-7'>
                                                    <div className='text-slate-700 text-[12px]'>Title</div>
                                                    <input defaultValue={props.title} ref={titleRef} id="title" className="w-full border-[1px] rounded-md p-2" placeholder='Something worth remembering'></input>
                                                </div>

                                                <div className='mb-7'>
                                                    <div className='flex'>
                                                        <div className='text-slate-700 text-[12px]'>Tags</div>
                                                        <div className='text-[#757A70] text-[8px] mt-1 ml-1'>Comma separated</div>
                                                    </div>
                                                    <input defaultValue={props.tags.join(", ")} ref={tagRef} id="tags" className="w-full border-[1px] rounded-md p-2" placeholder='Design,Research,Ideas'></input>
                                                </div> 
                                                <div onClick={updateContent} className='cursor-pointer shadow-md rounded-md pl-4 pr-5 pt-2 pb-2 flex justify-center items-center bg-[#171916] hover:opacity-[90%] hover:shadow-md text-[#F5F6EF]'>  
                                                    <Upload className=' mr-2 h-5 w-5' />
                                                    <div>Update Post </div> 
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                , document.body)}

       

    </div>
}