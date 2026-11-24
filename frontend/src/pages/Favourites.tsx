import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'
import { useState } from 'react';

interface MainpageProps {
  open: boolean;
}


export default function Mainpage({ open }: MainpageProps){
    const [gridview,setGridView] = useState(true);
    return <div className={`bg-[#EEEFE8] ${open?"ml-64":"ml-20"} mt-16 min-h-[calc(100vh-64px)] flex-1 bg-gray-50`}>
                <div className="ml-20">
                    <div className="flex justify-between">
                        <h1 className="ml-[2vw] mt-[2vh] text-[35px] font-bold">Favourites</h1>
                        <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                            {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                            {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                            {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                            {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                        </div>
                    </div>
                    <div className={`${gridview?"grid grid-cols-1 lg:grid-cols-2 gap-2":"ml-[20vw] grid grid-cols-1 gap-2"}`}>
                        <PostCard title="How to find usability errors on your website!" 
                            type="Youtube"
                            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, consequuntur placeat? A, modi praesentium perspiciatis maiores laborum sunt eos voluptates! Consequuntur odit commodi illo nesciunt cum sed similique aut impedit!"
                            link="https://www.youtube.com/@karkisnexus"
                            tags={["UI/UX","Security","WEBDEV"]}
                        />
                        
                        <PostCard title="
            🔴 Live Talk with IOE 2082 Rank 1 | Toppers’ Strategy Revealed 🎓#ioe #entrance #topper #rank1" 
                            type="Youtube"
                            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, consequuntur placeat? A, modi praesentium perspiciatis maiores laborum sunt eos voluptates! Consequuntur odit commodi illo nesciunt cum sed similique aut impedit!"
                            link="https://www.youtube.com/watch?v=fWgo9KCQr9I&t=224s"
                            tags={["UI/UX","Security","WEBDEV"]}
                        />
                                    
                    </div>

                 </div>

    </div>
}


