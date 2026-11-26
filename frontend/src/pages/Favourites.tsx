import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'

import { useState } from 'react';
import { Link } from 'react-router-dom';

interface MainpageProps {
  open: boolean;
  contents: any[];
  favcontents: any[];
  handleFavChange: (id: string, fav: boolean) => void;
}

export default function Favourite({ open, contents, favcontents, handleFavChange   }: MainpageProps){
    const [gridview,setGridView] = useState(true);

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

    const recents = Math.min(favcontents.length, 6);
    
    const result = [...favcontents].reverse().slice(0,6);

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
                        <div className="ml-[2vw] text-[35px] font-bold">Welcome to favorites!</div>  
                            <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                                {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                                {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                            </div>  
                    </div>

                    <hr className='border-1 border-gray-300 mt-7 ml-8 mr-14' />
                     <div>
                            <div className=' ml-7 mt-3 font-bold text-[22px]'>Favourite Ones</div>
                            <div className=' ml-7 mt-1 text-[#757A70] text-[15px]'>{recents} items in your collection</div>
                        </div>
                    {(result.length==0) && (<div className='flex justify-center mb-[10vh] mt-[30vh] text-[25px] ml-[35px] text-[#757A70]'>[ Empty Brain ]</div>)}
                    <div className={`${gridview?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2":"ml-[20vw] grid grid-cols-1 gap-2"}`}>
                        {result.map(content => (
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
        onFavChange={handleFavChange}
    />
))}
                    </div>

                 </div>
                 <div className='flex justify-end'>
                    <Link to="/content" className='mr-10 bg-[#171916] text-slate-300 hover:text-[#F5F6EF] p-2 pr-4 pl-4 rounded-lg'>See All Contents</Link>
                 </div>

    </div>
}


