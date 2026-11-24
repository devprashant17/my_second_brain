import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'
import hero from '../assets/hero.png';
import { useEffect,useState } from 'react';
import { BACKEND_URL } from '../config';

interface MainpageProps {
  open: boolean;
}



export default function AllContent({ open }: MainpageProps){
    const [gridview,setGridView] = useState(true);
    const [contents, setContents] = useState<any[]>([]);

    useEffect( ()=>{
        async function getContents(){
        const response = await fetch(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                token: localStorage.getItem("token") || ""
            }
        });

        console.log("Status:", response.status);

        const data = await response.json();

        setContents(data.content);
        }
        
        getContents();

    },[]);

    function SummaryCard(){
        let total = 0 ;
        return <div className='flex items-center p-3 pr-5 pl-5 rounded-xl bg-[#F7F7F2] border-[2px] border-'>
            <img src={hero} className='h-7 w-7 mr-5'/>
            <div className='flex flex-col'>
                <div className='font-bold'>{total}</div>
                <div className='uppercase text-[13px] text-[#757A70]'>Ideas Collected</div>
            </div>

        </div>
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
                        <div className="ml-[2vw] text-[35px] font-bold">Wanna see what you've saved?</div>
                        <div className='flex '>
                            <div className='mt-2'><SummaryCard /></div>
                            <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                                {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                                {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                            </div>  
                        </div>
                    </div>
                    <div className='flex ml-[35px] text-[#757A70]'>Here you go</div>

                    <hr className='border-1 border-gray-300 mt-7 ml-8 mr-14' />
                     <div>
                            <div className=' ml-7 mt-3 font-bold text-[22px]'>All Contents</div>
                            <div className=' ml-7 mt-1 text-[#757A70] text-[15px]'>Go through your saved posts.</div>
                        </div>
                    <div className={`${gridview?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2":"ml-[20vw] grid grid-cols-1 gap-2"}`}>
                        {contents.map((content) => (
                            <PostCard
                                key={content._id}
                                title={content.title}
                                type={content.type}
                                link={content.link}
                                tags={content.tags}
                                color={getColor(content._id)}
                            />
                        ))}
                    </div>

                 </div>

    </div>
}


