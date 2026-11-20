import logo from '../assets/hero.png';

export default function Navbar(){
    return <div className='flex '>
        <div>{logo}</div>
        <div>
            <div>My Second Brain</div>
            <div>Store your brain</div>
        </div>

    </div>
}