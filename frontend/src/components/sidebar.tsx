import dashboard from '../assets/dashboard.png';
import content from '../assets/content.png';
import tag from '../assets/hashtag.png';
import shared from '../assets/shared.png';
import fav from '../assets/fav.png';
import category from '../assets/category.png';
import menu from '../assets/menu.png';
import { useState } from 'react';

import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
    const [selected,setSelected] = useState("dashboard");

    return(
    <aside className={`fixed left-0 top-16 z-40 shadow-md p-4 h-[calc(100vh-64px)] transition-[width] duration-300 ease-in-out ${open ? "w-64" : "w-20"}`}>
        {open && (<div className='flex justify-end m-2 mb-6 cursor-pointer' onClick={()=>{setOpen(!open)}}>
            <img src={menu} className={`h-6 w-6 rounded-md `} />
        </div>
        )}
        {!open && (<div className='flex items-center ml-4 mb-6 cursor-pointer' onClick={()=>{setOpen(!open)}}>
            <img src={menu} className='h-6 w-6 pr-0 hover:bg-gray-100 rounded-md' />
        </div>
        )}

        <ul className='flex-column h-1/2 justify-around cursor-pointer'>
            <Link to="/dashboard" onClick={()=>{setSelected("dashboard"); setOpen(true)}} id="dashboard" className={`flex items-center p-1 pl-2  rounded-md ${selected==="dashboard"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={dashboard} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10'>Dashboard</li>)}
            </Link>
            <Link to="/content" onClick={()=>{setSelected("all content"); setOpen(true)}} id="content" className={`flex items-center p-1 pl-2 rounded-md ${selected==="all content"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={content} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10 '>All Contents</li>)}
            </Link>
            <Link to="categories" onClick={()=>{setSelected("categories"); setOpen(true)}} id="content" className={`flex items-center p-1 pl-2 rounded-md ${selected==="categories"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={category} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10 '>Categories</li>)}
            </Link>
            <Link to="favourites" onClick={()=>{setSelected("favourites"); setOpen(true)}} id="content" className={`flex items-center p-1 pl-2 rounded-md ${selected==="favourites"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={fav} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10 '>Favourites</li>)}
            </Link>
            <Link to="tags" onClick={()=>{setSelected("tags"); setOpen(true)}} id="content" className={`flex items-center p-1 pl-2 rounded-md ${selected==="tags"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={tag} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10'>Tags</li>)}
            </Link>
            <Link to="shared" onClick={()=>{setSelected("shared brain"); setOpen(true)}} id="content" className={`flex items-center p-1 pl-2 rounded-md ${selected==="shared brain"?"bg-gray-200":" hover:bg-gray-100"}`}>
                <img src={shared} className="h-6 w-6 mr-4 m-2" />
                {open && (<li className='p-2 pr-10 '>Shared Brain</li>)}
            </Link>
        </ul>
    </aside>
    );
}
