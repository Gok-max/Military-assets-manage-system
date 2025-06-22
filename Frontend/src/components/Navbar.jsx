import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    navigate('/');
  }
  return (
    <nav className="bg-armygreen p-4 text-khaki flex justify-between items-center">
    <div className='flex gap-2'>
    <img src={logo} className='w-10 h-10'/>
    <p className='font-bold text-2xl text-sand'>Military Assets Management</p>
    </div>
    
      <div className="flex gap-4">
        <Link to="/dashboard" className='mt-2'>Dashboard</Link>
        <Link to="/purchases" className='mt-2'>Purchases</Link>
        <Link to="/transfers" className='mt-2'>Transfers</Link>
        <Link to="/assignments" className='mt-2'>Assignments</Link>
        <Link to="/profile" className='mt-2'>Profile</Link>
        <button
        onClick={handleLogout}
        className="bg-khaki p-2 rounded text-darkbrown"
      >
        Logout
      </button>
      </div>
      
    </nav>
  );
}
