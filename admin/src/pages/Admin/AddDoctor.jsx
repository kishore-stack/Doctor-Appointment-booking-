
import { assets } from '../../assets/assets'
import React, { useState, useContext } from 'react' 
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddDoctor = () => {
  const [docImg,setDocImg]=useState(false)
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[experience,setExperience]=useState('1')
  const[fees,setFees]=useState('')
  const[speciality,setSpeciality]=useState('General physician')
  const[degree,setDegree]=useState('')
  const[address1,setAddress1]=useState('')
  const[address2,setAddress2]=useState('')
  const[about,setAbout]=useState('')

 const { backendUrl, aToken } = useContext(AdminContext);


const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (!docImg) {
      return toast.error("Please upload doctor image");
    }

    // Continue API call here...
    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees",Number(fees));
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("address",JSON.stringify( {line1: address1, line2: address2}));
    formData.append("about", about);
    //console.log(...formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

const{ data }= await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken}})
if (data.success){
  toast.success(data.message)
  setDocImg(false)
  setName('')
  setEmail('')
  setPassword('')
  setAddress1('')
  setAddress2('')
  setAbout('')
  setDegree('')

}
else{
  toast.error(data.message)
}
  } catch (error) {
    toast.error("error.message");
    console.log(error);
  } 
};


  return (
    <form onSubmit={onSubmitHandler}  className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add doctor</p>
      <div className=' bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center  gap-4 mb-8 text-gray-800'>
          <label htmlFor='doc-img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>upload <br />doctor picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-800'>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange ={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Enter your name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1' >
              <p>Doctor Email</p>
              <input onChange ={(e)=> setEmail(e.target.value)} value={email}  className='border rounded px-3 py-2' type="email" placeholder='email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1' >
              <p>Doctor password</p>
              <input onChange ={(e)=> setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2' type="Password" placeholder='password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1' >
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience}  className='border rounded px-3 py-2' name='' id=''>
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
              <input onChange={(e)=> setFees(e.target.value)} value={fees}  className='border rounded px-3 py-2' type="fees" placeholder='fees' required />
            </div>
          </div>

          <div className=' w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1' >
              <p>speciality</p>
              <select onChange ={(e)=> setSpeciality(e.target.value)} value={speciality}  className='border rounded px-3 py-2' name='' id=''>
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
              <input onChange ={(e)=> setDegree(e.target.value)} value={degree}  className='border rounded px-3 py-2' type="text" placeholder='education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1' >
              <p >address</p>
              <input onChange ={(e)=> setAddress1(e.target.value)} value={address1}  className='border rounded px-3 py-2' type="text" placeholder='address1' required />
              <input onChange ={(e)=> setAddress2(e.target.value)} value={address2}  className='border rounded px-3 py-2' type="text" placeholder='address2' required />
            </div>
          </div>
          <div className=' flex-1 flex flex-col gap-1'>
            <p>About Doctor</p>
            <textarea onChange={(e)=> setAbout(e.target.value)} value={about}  className='border rounded px-3 py-2' placeholder='write about doctor' rows={5} required />
          </div>
          <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
