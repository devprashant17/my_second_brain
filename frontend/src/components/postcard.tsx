function Tags(props:any){
    let returnArray:any = [];
    props.arr.forEach((e:string) => {
        returnArray.push(
            <div className="p-1 bg-red-200 rounded-full">{e}</div>
        );
    });
    return <div className="mt-4 flex gap-2">{returnArray}</div>;
}

export default function PostCard(props:any){
    return <div className="m-10 shadow-md rounded-lg w-[30vw] p-6 ">
        <h1 className="text-xl font-bold mb-4">{props.title}</h1>
        <div className=" mb-4">Type: {props.type}</div>
        <a className="underline-offset-1 text-blue-600 visited:text-purple-600 mb-4" href={props.link}>Link</a>
    
        <Tags arr={props.tags} />
       

    </div>
}