import Sidebar from './components/sidebar';
import Mainpage from './components/mainpage';
import Navbar from './components/navbar';


export default function App() {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Mainpage/>
      </div>

    </div>
  );
}

