import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import SetAvatar from './components/SetAvatar'
import AreaChart from './components/AreaChart';
import PieChart from './components/PieChart';
import ExpensePage from './components/ExpensePage';
import ReportPage from './components/ReportPage';
import IncomePage from './components/IncomePage';
import AdminDashboard from './components/AdminDashboard'
import EnvelopePage from './components/EnvelopePage';
import StartPage from './components/StartPage';



const App = () => {

  return (
      <div className='w-full min-h-screen bg-[#e1e6e9] flex items-center justify-center overflow-x-hidden'>
        <Router>
          <Routes>
            <Route path='/' element={<StartPage />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/mainpage' element={<MainPage />} />
            <Route path='/setAvatar' element={<SetAvatar />} />
            <Route path='/areaChart' element={<AreaChart />} />
            <Route path='/pieChart' element={<PieChart />} />
            <Route path='/expensePage' element={<ExpensePage />} />
            <Route path='/reportPage' element={<ReportPage />} />
            <Route path='/incomePage' element={<IncomePage />}/>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path='/envelopePage' element={<EnvelopePage />} />
          </Routes>
        </Router>
      </div>

  )
}

export default App