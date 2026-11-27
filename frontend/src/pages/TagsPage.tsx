import PostCard from '../components/postcard';
import blackgrid from '../assets/blackgrid.png';
import colorgrid from '../assets/colorgrid.png';
import blacklist from '../assets/blacklist.png';
import colorlist from '../assets/colorlist.png'
import { useEffect,useState } from 'react';
import { BACKEND_URL } from '../config';

interface MainpageProps {
    open: boolean;
    contents: any[];
    setContents: React.Dispatch<React.SetStateAction<any[]>>;
    refreshContent: (id: string, fav: boolean) => void;
}

function Tags({
    arr,
    onTagClick
}: {
    arr: string[];
    onTagClick: (tag: string) => void;
}) {
    return (
        <div className="pl-7 mt-4 flex flex-wrap gap-2">
            {arr.map((e, index) => (
                <div
                    key={index}
                    onClick={() => onTagClick(e)}
                    className="cursor-pointer flex border-2 items-center p-2 text-[13px] bg-[#F6F6F0] rounded-lg hover:bg-[#E2E5D9]"
                >
                    # {e}
                </div>
            ))}
        </div>
    );
}

export default function TagsPage({ open, contents, setContents, refreshContent }: MainpageProps){
    const [gridview,setGridView] = useState(true);
    const [TagsArray, setTagsArray] = useState<string[]>([]);
    const [selectedTag,setSelectedTag] = useState<string | null>(null);

    const filteredContents = selectedTag
    ? contents.filter((content) =>
        content.tags?.includes(selectedTag)
    )
    : contents;

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

async function fetchTags() {
    const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
        headers: {
            token: localStorage.getItem("token") || ""
        }
    });

    const data = await response.json();

    const allTags: string[] = data.content.flatMap(
        (content: any) => content.tags as string[]
    );

    const uniqueTags: string[] = [...new Set<string>(allTags)];

    setTagsArray(uniqueTags);
}

    useEffect(() => {
        fetchTags();
    }, []);

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
                        <div className="ml-[2vw] text-[35px] font-bold">Tags</div>
                        <div className='flex '>
                            <div className="flex ml-[2vw] mt-[2vh] text-[35px] ">
                                {!gridview && (<img src={blackgrid} className="h-[29px] w-[29px] m-2 mr-1 opacity-20" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={colorgrid} className="h-7 w-7 m-2" onClick={()=>{setGridView(true)}} />)}
                                {gridview && (<img src={blacklist} className="h-9 w-7 m-1 mr-[3vw] opacity-20" onClick={()=>{setGridView(false)}} />)}
                                {!gridview && (<img src={colorlist} className="h-7 w-7 m-2 mr-[3vw]" onClick={()=>{setGridView(false)}} />)}                           
                            </div>  
                        </div>
                    </div>
                    <div className='flex ml-[35px] text-[#757A70]'>Browse your saved ideas by topic.</div>

                    <hr className='border-1 border-gray-300 mt-7 ml-8 mr-14' />
                    <Tags
                        arr={TagsArray}
                        onTagClick={(tag) => {setSelectedTag(tag);}}
                    />

                   {/* Selected tag and clear filter */}
<div className="flex items-center ml-[35px] mt-5 gap-3">
    {selectedTag && (
        <>
            <div className="text-[#757A70]">
                Showing posts for <b className='text-slate-800'>#{selectedTag}</b>
            </div>

            <button
                onClick={() => setSelectedTag(null)}
                className="text-sm underline cursor-pointer"
            >
                Show all
            </button>
        </>
    )}
</div>

{/* Empty state */}
{filteredContents.length === 0 && (
    <div className="flex justify-center mt-[30vh] text-[25px] ml-[35px] text-[#757A70]">
        [ No posts found ]
    </div>
)}

{/* Posts */}
<div className={`${gridview
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    : "ml-[20vw] grid grid-cols-1 gap-2"
}`}>
    {filteredContents.map((content) => (
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
            refreshContent={refreshContent}
        />
    ))}
</div>

                 </div>

    </div>
}


