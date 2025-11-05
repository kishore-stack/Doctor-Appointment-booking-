import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate =useNavigate();
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 '>
         {/* left side */}
    <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
       <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'><p>Book Appointment</p>
      <p className='mt-4'>with 100+ trusted doctors</p>
      </div>
      <button onClick={() => { navigate('/Login'); scrollTo(0, 0); }} className='mt-8 bg-white text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary hover:text-white'>Create Account</button>
    </div>
      {/* right side */}
    <div className='hidden md:block md:block md:w-1/2 lg:w-[370px] relative '>
      <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt=''/>
    </div>
    </div>
  )
}

export default Banner