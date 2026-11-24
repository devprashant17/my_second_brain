import {House} from 'lucide-react';
import {SquareText} from 'lucide-react';
import { Tag } from 'lucide-react';
import { Heart } from 'lucide-react';
import { UsersCollaboration } from 'lucide-react';
import { Menu } from 'lucide-react';

import { useState } from 'react';


import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
    const [selected,setSelected] = useState("dashboard");

    return(
    <aside className={`text-[#757A70] bg-[#171916] fixed left-0 top-16 z-40 shadow-md p-4 h-[calc(100vh-64px)] transition-[width] duration-300 ease-in-out ${open ? "w-64" : "w-20"}`}>
        {open && (<div className='flex justify-end m-2 mb-6 cursor-pointer' onClick={()=>{setOpen(!open)}}>
            <Menu  />
        </div>
        )}
        {!open && (<div className='flex items-center ml-4 mb-6 cursor-pointer' onClick={()=>{setOpen(!open)}}>
            <Menu className='mt-2' />
        </div>
        )}

        <ul className='flex-column h-1/2 justify-between cursor-pointer'>
            <Link to="/dashboard" onClick={()=>{setSelected("dashboard"); setOpen(true)}} id="dashboard" className={`h-[5vh] flex items-center p-1 pl-2  rounded-md ${selected==="dashboard"?"bg-[#292C26] text-[#F5F6EF] border-l-2 border-l-[#CCE96D]":" hover:bg-[#21231F]"} hover:text-[#F5F6EF]`}>
                <House className='h-5 w-5 ml-1'/>
                {open && (<li className='p-2 pr-10'>Dashboard</li>)}
            </Link>
            <Link to="/content" onClick={()=>{setSelected("all content"); setOpen(true)}} id="content" className={`h-[5vh] flex items-center p-1 pl-2 rounded-md ${selected==="all content"?"bg-[#292C26] text-[#F5F6EF] border-l-2 border-l-[#CCE96D]":" hover:bg-[#21231F]"} hover:text-[#F5F6EF]`}>
                <SquareText className='h-5 w-5 pr-0 ml-1'/>
                {open && (<li className='p-2 pr-10 '>All Contents</li>)}
            </Link>
            <Link to="favourites" onClick={()=>{setSelected("favourites"); setOpen(true)}} id="content" className={`h-[5vh] flex items-center p-1 pl-2 rounded-md ${selected==="favourites"?"bg-[#292C26] text-[#F5F6EF] border-l-2 border-l-[#CCE96D]":" hover:bg-[#21231F]"} hover:text-[#F5F6EF]`}>
                <Heart className='h-5 w-5 pr-0 ml-1' />
                {open && (<li className='p-2 pr-10 '>Favourites</li>)}
            </Link>
            <Link to="tags" onClick={()=>{setSelected("tags"); setOpen(true)}} id="content" className={`h-[5vh] flex items-center p-1 pl-2 rounded-md ${selected==="tags"?"bg-[#292C26] text-[#F5F6EF] border-l-2 border-l-[#CCE96D]":" hover:bg-[#21231F]"} hover:text-[#F5F6EF]`}>
                <Tag className='h-5 w-5 pr-0 ml-1' />
                {open && (<li className='p-2 pr-10'>Tags</li>)}
            </Link>
            <Link to="shared" onClick={()=>{setSelected("shared brain"); setOpen(true)}} id="content" className={`h-[5vh] flex items-center p-1 pl-2 rounded-md ${selected==="shared brain text-[#F5F6EF]"?"bg-[#292C26] border-l-2 border-l-[#CCE96D]":" hover:bg-[#21231F]"} hover:text-[#F5F6EF]`}>
                <UsersCollaboration className='h-5 w-5 pr-0 ' />
                {open && (<li className='p-2 pr-10 '>Shared Brain</li>)}
            </Link>
        </ul>
    </aside>
    );
}
