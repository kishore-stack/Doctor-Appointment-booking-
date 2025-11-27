import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Contact from './pages/Contact'
import About from './pages/About'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
  



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Doctors' element={<Doctors/>}/>
        <Route path='/Doctors/:speciality' element={<Doctors/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Profile' element={<MyProfile/>}/>
        <Route path='/MyAppointment' element={<MyAppointment/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Appointment/:docId' element={<Appointment/>}/>
        

      </Routes>
      <Footer/>
    </div>
  )
}

export default App