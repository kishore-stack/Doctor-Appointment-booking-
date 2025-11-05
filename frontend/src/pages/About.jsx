import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 font-weight-semibold'>
         <p>
        ABOUT <span className='text-gray-500 font-medium'>US</span></p>
      </div>
      <div className=' my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full max-w-[360px]' src={assets.about_image} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>welcome to prescripto,your trusted partner in managing your healthcare needs conviently and effeciently.</p>
          <p>prescripto is commited to excellence in healthcare technology </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To provide accessible and affordable healthcare solutions to everyone.</p>
        </div>
      </div>
     
    </div>
  )
}

export default About