import './styles/app.css'
import './styles/fonts.css'
import {Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import Event from './views/Event';
import CreateEvent from './views/CreateEvent';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import "./styles/app.css";
import "./styles/fonts.css";

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Dashboard />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/new' element={<CreateEvent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/event/:id' element={<Event />} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App
