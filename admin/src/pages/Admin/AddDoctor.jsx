import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'

const AddDoctor = () => {
  const [docIMg,setDocImg]=useState(false)
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[experience,setExperience]=useState('1 year')
  const[fees,setFees]=useState('')
  const[speciality,setSpeciality]=useState('General physician')
  const[education,setEducation]=useState('')
  const[address1,setAddress1]=useState('')
  const[address2,setAddress2]=useState('')
  const[about,setAbout]=useState('')

  
  return (
    <form  className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add doctor</p>
      <div className=' bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center  gap-4 mb-8 text-gray-800'>
          <label htmlFor='doc-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="" />
          </label>
          <input type="file" id='doc-img' hidden />
          <p>upload <br />doctor picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-800'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input className='border rounded px-3 py-3' type="text" placeholder='Enter your name' required />
            </div>

            <div  className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input  className='border rounded px-3 py-3' type="email" placeholder='email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1' >
              <p>Doctor password</p>
              <input  className='border rounded px-3 py-3' type="Password" placeholder='password' required />
            </div>

            <div className=' flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select  className='border rounded px-3 py-3' name='' id=''>
                <option value="1">1 year</option>
                <option value="2">2 year</option>
                <option value="3">3 year</option>
                <option value="4">4 year</option>
                <option value="5">5 year</option>
                <option value="6">6 year</option>
                <option value="7">7 year</option>
                <option value="8">8 year</option>
                <option value="9">9 year</option>
                <option value="10">10 year</option>
              </select>
            </div>


            <div className='flex-1 flex flex-col gap-1' >
              <p>fees</p>
              <input  className='border rounded px-3 py-3' type="fees" placeholder='fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4' >
            <div className='flex-1 flex flex-col gap-1' >
              <p>speciality</p>
              <select  className='border rounded px-3 py-3' name='' id=''>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastoenterologist'>Gastoenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1' >
              <p>Education</p>
              <input  className='border rounded px-3 py-3' type="text" placeholder='education' required />
            </div>
            <div className=' flex-1 flex flex-col gap-1'>
              <p>address</p>
              <input  className='border rounded px-3 py-3' type="text" placeholder='address1' required />
              <input  className='border rounded px-3 py-3' type="text" placeholder='address2' required />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-1' >
            <p >About Doctor</p>
            <textarea  className='border rounded px-3 py-3' placeholder='write about doctor' rows={5} required />
          </div>
          <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
