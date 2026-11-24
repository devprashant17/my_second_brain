import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'
import { useEffect,useState } from 'react';
import { BACKEND_URL } from '../config';

interface MainpageProps {
  open: boolean;
}

export default function Mainpage({ open }: MainpageProps){
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


    return <div className={`${open?"ml-64":"ml-20"} mt-16 min-h-[calc(100vh-64px)] flex-1 bg-gray-50`}>
                <div className="ml-20">
                    <div className="flex justify-between">
                        <h1 className="ml-[2vw] mt-[2vh] text-[35px] font-bold">All Contents</h1>
                        <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                            {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                            {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                            {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                            {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                        </div>
                    </div>
                    <div className={`${gridview?"grid grid-cols-1 lg:grid-cols-2 gap-2":"ml-[20vw] grid grid-cols-1 gap-2"}`}>
                        {contents.map((content) => (
                            <PostCard
                                key={content._id}
                                title={content.title}
                                type={content.type}
                                link={content.link}
                                tags={content.tags}
                            />
                        ))}
                    </div>

                 </div>

    </div>
}


