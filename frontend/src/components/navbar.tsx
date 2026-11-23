import logo from '../assets/hero.png';
import user from '../assets/user.png';
import downarrow from '../assets/down-arrow.png';
import plus from '../assets/plus.png';
import search from '../assets/search.png';
import { useState } from 'react';

function Dropdown(){
    const [open,setOpen] = useState(false);

    return (
        <section className='relative'>
            {!open && (<img src={downarrow} onClick={()=>{setOpen(!open)}} className='h-6 w-6'/>)}
            {open && (<img src={downarrow} onClick={()=>{setOpen(!open)}} className='rotate-180 h-6 w-6'/>)}
            {open&& (
                <ul className="absolute top-full right-0 -translate-x-2 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Profile
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Settings
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                        Logout
                    </li>
                </ul>
            )}
        </section>
    );
}

export default function Navbar(){
    return <div className='flex justify-between text-s m-2 mr-8 ml-8'>
        <div id="navleft" className='flex'>
            <div className='p-2 mr-4'>
                <img src={logo} className='h-8 w-8'/>
            </div>
            <div>
                <div className='font-bold'>My Second Brain</div>
                <div className='text-slate-700 text-xs'>Store your brain</div>
            </div>
        </div>
        <div id="navright" className='flex items-center'>
            <div className='bg-[#e9ecef] text-slate-300 flex items-center border-2 rounded-full p-2 pr-10 pl-8 '>
                <img src={search} className='cursor-pointer h-4 w-4 mr-7'/>
                <input placeholder='Search content' className='bg-[#e9ecef] text-slate-900 focus:border-none focus:outline-none'/>
            </div>
            <div className='cursor-pointer border-2 border-slate-300 rounded-full pl-5 pr-5 pt-1 pb-1 ml-8 flex items-center bg-[#ffc300]'>Create
                <img src={plus} className=' ml-2 h-3 w-3' />
            </div>
            <div id="profile" className='flex items-center m-2 ml-20'>
                <img src={user} className='h-8 w-8 flex items-center rounded-full border-2 border-[#ffc300]'/>
                <div className='ml-2 flex items-center text-[14px] text-slate-500'>prashant.karki</div>
                <Dropdown />
            </div>
        </div>

    </div>
}