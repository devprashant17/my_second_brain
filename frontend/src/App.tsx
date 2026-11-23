import Sidebar from './components/sidebar';
import Mainpage from './components/mainpage';
import Navbar from './components/navbar';
import { useState } from 'react';


export default function App() {
  const [open,setOpen] = useState(true);
  return (
    <div >
      <Navbar />
      <div className='flex'>
        <Sidebar open={open} setOpen={setOpen} />
        <Mainpage open={open} />
      </div>

    </div>
  );
}

