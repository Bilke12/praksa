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

const App = () => {

  const{showRecruiterLogin}= useContext(AppContext)

  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prijavi-praksu/:id' element={<PrijaviPraksu />}/>
        <Route path='/prijave' element={<Prijave />} />
        <Route path='/mojaPraksa' element={<MojaPraksa />} />
        <Route path='/dokumenti' element={<Dokumenti />} />
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='dodaj-praksu' element={<DodajPraksu />} />
          <Route path='upravljajte-praksom' element={<UpravaPraksom />} />
          <Route path='aplikanti' element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App