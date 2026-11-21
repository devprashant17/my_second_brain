import logo from '../assets/hero.png';

export default function Navbar(){
    return <div className='flex text-s'>
        <div id="navleft" className='flex'>
            <div className='p-2 mr-4'>
                <img src={logo} className='h-8 w-8'/>
            </div>
            <div>
                <div className='font-bold'>My Second Brain</div>
                <div className='text-slate-700 text-xs'>Store your brain</div>
            </div>
        </div>
        <div id="navright">
            <input placeholder='Search content'></input>
        </div>

    </div>
}