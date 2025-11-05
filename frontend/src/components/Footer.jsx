import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left sectioon */}
      <div className=''>
        <img className='w-32 mb-5' src={assets.logo} alt=''></img>
        <p className='w-full md:w-2/3'>prescripto always welcome you </p>
      </div>
 {/* center section */}
      <div>
<p className='text-xl font-medium mb-5'>
    COMPANY
</p>
<ul className='flex flex-col gap-2 text-gray-600'>
    <li>Home</li>
      <li>About</li>
        <li>Contact Us</li>
          <li>Privacy Policy </li>
</ul>
      </div>
           {/* right section */}
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600' >
            <li>789456123</li>
            <li>info@example.com</li>
        </ul>
         </div>
    </div>
    <div> 
        <hr/>
        <p className='py-5 text-sm text-center'>copyrights 2025@perscripto  All Right Reserved</p>
    </div>
    </div>
  )
}

export default Footer