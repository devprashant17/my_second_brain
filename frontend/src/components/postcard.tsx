import { Ellipsis } from 'lucide-react';
import { Clock5 } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Link } from 'lucide-react';
import yt from '../assets/youtube.png';
import twitter from '../assets/twitter.png';

function Tags(props:any){
    let returnArray:any = [];
    props.arr.forEach((e:string) => {
        returnArray.push(
            <div className="p-1 pr-2 pl-2 text-[13px] bg-[#EBECE5] rounded-lg"># {e}</div>
        );
    });
    return <div className="mt-4 flex">{returnArray}</div>

}

export default function PostCard(props:any){
    return <div style={{borderTop: `6px solid ${props.color}`}} className="ml-7 m-10 shadow-md rounded-lg w-[21vw] p-6 pb-4 bg-[#F7F7F2] relative transition-all duration-100 ease-out hover:-translate-y-1 hover:shadow-md hover:z-3">
        <div className='flex justify-between'>
            <div className=" mb-4">{props.type}</div>
            <div><Ellipsis/></div>
        </div>
        <h1 className="text-xl font-bold mb-4">{props.title}</h1>
    
        <Tags arr={props.tags} />
                <hr className='mt-4 mb-4'/>
        <div className='flex justify-between'>
            <div className='text-[#757A70] text-[13px]'>notion.doc</div>
            <div className='flex'>
                <Clock5 className='text-[#757A70] h-3 w-3 mt-[3px] mr-2' />
                <div className='text-[12px] text-[#757A70]'>5 hours ago </div>
                <a href={props.link}><ExternalLink className='text-[#757A70] h-4 w-4 ml-2 ' /></a>
            </div>
        </div>
       

    </div>
}