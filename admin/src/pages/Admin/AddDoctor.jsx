import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
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
              <input type="text" placeholder='Enter your name' required />
            </div>

            <div flex-1 flex flex-col gap-1>
              <p>Doctor Email</p>
              <input type="email" placeholder='email' required />
            </div>

            <div flex-1 flex flex-col gap-1>
              <p>Doctor password</p>
              <input type="Password" placeholder='password' required />
            </div>

            <div flex-1 flex flex-col gap-1>
              <p>Experience</p>
              <select name='' id=''>
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


            <div flex-1 flex flex-col gap-1>
              <p>fees</p>
              <input type="fees" placeholder='fees' required />
            </div>
          </div>

          <div w-full lg:flex-1 flex flex-col gap-4>
            <div flex-1 flex flex-col gap-1>
              <p>speciality</p>
              <select name='' id=''>
                <option value='General physician'>General physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastoenterologist'>Gastoenterologist</option>
              </select>
            </div>
            <div flex-1 flex flex-col gap-1>
              <p>Education</p>
              <input type="text" placeholder='education' required />
            </div>
            <div flex-1 flex flex-col gap-1>
              <p>address</p>
              <input type="text" placeholder='address1' required />
              <input type="text" placeholder='address2' required />
            </div>
          </div>
          <div flex-1 flex flex-col gap-1>
            <p>About Doctor</p>
            <textarea placeholder='write about doctor' rows={5} required />
          </div>
          <button>Add doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
