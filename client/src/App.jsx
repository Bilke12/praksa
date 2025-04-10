import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import PrijaviPraksu from './pages/PrijaviPraksu'
import Prijave from './pages/Prijave'
import MojaPraksa from './pages/mojaPraksa'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import DodajPraksu from './pages/DodajPraksu'
import UpravaPraksom from './pages/UpravaPraksom'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import Dokumenti from './components/Dokumenti'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminDashboard from "./pages/AdminDashboard"
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AdminPendingJobs from './components/AdminPendingJobs'



const App = () => {

  const{showRecruiterLogin, companyToken}= useContext(AppContext)
  const { userData } = useContext(AppContext)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userData?.role === 'admin' && location.pathname === '/') {
      navigate('/admin');
    }
  }, [userData, location, navigate]);
  



  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prijavi-praksu/:id' element={<PrijaviPraksu />}/>
        <Route path='/prijave' element={<Prijave />} />
        <Route path='/mojaPraksa' element={<MojaPraksa />} />
        <Route path='/dokumenti' element={<Dokumenti />} />
        {userData?.role === 'admin' && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/prakse" element={<AdminPendingJobs />} />
          </>
        )}
        <Route path='/dashboard' element={<Dashboard/>}>
        {
          companyToken ? <> 
          <Route path='dodaj-praksu' element={<DodajPraksu />} />
          <Route path='upravljajte-praksom' element={<UpravaPraksom />} />
          <Route path='aplikanti' element={<ViewApplications />} />
        </>: null
        }
        </Route>
      </Routes>
    </div>
  )
}

export default App