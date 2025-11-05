import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT<span className='text-gray-700'>US</span>
        </p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[300px]' src={assets.contact_image} alt='' ></img>
        <div className='flex flex-col justify-center gap-6'>
          <p className='font-semibold text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'> PLOT NO 66 AMBATTUR CHENNAI</p>
          <p className='text-gray-600'>PHONE: 123-456-7890</p>
          <p className='text-lg text-gray-600'>EMAIL: contact@ourcompany.com</p>
          <p className='font-semibold text-gray-600'>careers at PERSCRIPTO</p>
          <button className='bg-gray-800 text-white py-2 px-4 rounded'>Explore Jobs</button>
        </div>
        </div>
    </div>
  )
}

export default Contact