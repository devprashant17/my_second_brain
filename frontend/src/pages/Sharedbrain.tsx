import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'
import search from '../assets/search.png'
import { useState,useRef } from 'react';
import { BACKEND_URL } from '../config';

interface MainpageProps {
  open: boolean;
  contents: any[];
  setContents: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Item {
  _id: string;
  title: string;
  type: string;
  link: string;
  tags: string[];
  userId: string;
  fav: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SharedBrain({ open, contents, setContents   }: MainpageProps){
    const [gridview,setGridView] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [wrongShareLink,setWrongShareLink] = useState(false);
    const [sharedContents,setSharedContents] = useState<Item[]>([]);

    const sharelinkRef = useRef<HTMLInputElement>(null);

    async function fetchsharedbrain(){
        const shareLink = sharelinkRef.current?.value;

        if(shareLink ==""){
            setUsername(null);
            setWrongShareLink(false);
            setSharedContents([]);
        }
        else{
            const response =  await fetch(`${BACKEND_URL}/api/v1/brain/${shareLink}`,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();

            if (response.ok) {
                setWrongShareLink(false);
                setSharedContents(data.content);
                setUsername(data.username);
            }
            if(response.status==404){
                setWrongShareLink(true);
            }
        }

    }

    const today = new Date();

    const colors = [
    "#CCE96D",
    "#F9A8D4",
    "#93C5FD",
    "#C4B5FD",
    "#FDBA74",
    "#86EFAC"
];

    function getColor(id: string) {
        let hash = 0;
    
        for (let i = 0; i < id.length; i++) {
            hash += id.charCodeAt(i);
        }
    
        return colors[hash % colors.length];
    }
    
    const result = [...sharedContents].reverse();

    return <div className={`${open?"ml-64":"ml-20"} mt-16 min-h-[calc(100vh-64px)] flex-1 bg-[#EEEFE8]`}>
                <div className="ml-20">
                    <div className='uppercase flex ml-[2vw] text-[#757A70] pt-8 mb-1'>
                        {today.toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}
                    </div>
                    <div className="flex justify-between">
                        <div className="ml-[2vw] text-[35px] font-bold">Shared Brain</div>
                        <div className='flex '> 
                            <div className='bg-[#e9ecef] border-2 text-slate-300 flex items-center h-[6vh] mt-5 mr-20 w-[25vw] rounded-xl p-2 pl-8 '>      
                            <img onClick={fetchsharedbrain}  src={search} className='cursor-pointer h-4 w-4 mr-7'/>
                                <input ref={sharelinkRef} placeholder='Paste the sharelink here' className='w-full pr-5 bg-[#e9ecef] text-slate-900 focus:border-none focus:outline-none'/>
                            </div>
                            <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                                {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                                {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                            </div>  
                        </div>
                    </div>
                    {username && (<div className='flex ml-[35px] text-[#757A70]'>Here’s a sneakpeak to the brain of <b className='underline text-slate-700 ml-2'> {username}</b></div>)}
                   
                    <hr className='border-1 border-gray-300 mt-7 ml-8 mr-14' />
                    {(!wrongShareLink && !username ) && (<div className='flex justify-center mt-[40vh] ml-[35px] text-[25px] text-[#757A70]'>Where's the share link?</div>)}
                    {wrongShareLink && (<div className='flex justify-center mt-[40vh] text-[25px] ml-[35px] text-[#757A70]'>Wrong share link!</div>)}
                    {(username && !wrongShareLink && result.length===0) && (<div className='flex justify-center mt-[40vh] text-[25px] ml-[35px] text-[#757A70]'>[ Empty Brain ]</div>)}
                    {!wrongShareLink && (<div className={`${gridview?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2":"ml-[20vw] grid grid-cols-1 gap-2"}`}>
                        {(sharedContents.length!=0) && (result.map(content => (
                            <PostCard
                                key={content._id}
                                title={content.title}
                                type={content.type}
                                link={content.link}
                                tags={content.tags}
                                color={getColor(content._id)}
                                createdAt={content.createdAt}
                                id={content._id}
                                fav={content.fav}
                                
                            />
                        )))}
                </div>)}

            </div>
        </div>
}


