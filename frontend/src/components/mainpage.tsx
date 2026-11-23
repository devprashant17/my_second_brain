interface MainpageProps {
  open: boolean;
}

function Tags(props:any){
    let returnArray:any = [];
    props.arr.forEach((e:string) => {
        returnArray.push(
            <div className="p-1 bg-red-200 rounded-full">{e}</div>
        );
    });
    return <div className="mt-4 flex gap-2">{returnArray}</div>;
}

function PostCard(props:any){
    return <div className="border-2 h-[35vh] w-1/3">
        <h1 className="text-xl font-bold mb-4">{props.title}</h1>
        <div className=" mb-4">Type: {props.type}</div>
        <div className=" mb-4">{props.description}</div>
        <a className="underline-offset-1 text-blue-600 visited:text-purple-600 mb-4" href={props.link}>Link</a>
    
        <Tags className="mt-4 flex" arr={props.tags} />
       

    </div>
}
export default function Mainpage({ open }: MainpageProps){
    return <div className={`${open?"ml-64":"ml-20"} mt-16 min-h-[calc(100vh-64px)] flex-1 bg-gray-50`}>
        <div className="flex">
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
                        
            <PostCard title=" The most wanted free SVG user interface icons
50,400+ free, UI icons in 9 different styles. All fully editable and customizable for you to make them truly yours" 
                type="Link"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, consequuntur placeat? A, modi praesentium perspiciatis maiores laborum sunt eos voluptates! Consequuntur odit commodi illo nesciunt cum sed similique aut impedit!"
                link="https://www.flaticon.com/search?word=three%20bars"
                tags={["UI/UX","Security","WEBDEV"]}
            />
            
        </div>


    </div>
}