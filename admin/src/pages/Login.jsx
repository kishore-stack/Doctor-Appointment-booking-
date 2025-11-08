
import {assets} from '../assets/assets'

import { AdminContext } from '../context/AdminContext'
import React, { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
    const [state,setstate]= useState('Admin')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const onSubmitHandler=async(e)=>{
        e.preventDefault()
     try {
    if (state === 'Admin') {
        const{data}= await axios.post(backendUrl + '/api/admin/login',{email,password})
        if(data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token);
        // admin login logic
        } else {
            toast.error(data.message)
        }
    } else {
        // doctor login logic
  
    }
} catch (error) {
    console.log(error);
}

        }
    
    
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
    <p className='text-2xl font-semibold m-auto'> <span className='text-primary'>{state}</span> Login</p>
    <div className='w-full'>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type='email' required/>
    </div>
    <div className='w-full'>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type='password' required/>
    </div>
    <button className='bg-primary text-white rounded p-2 mt-4'>Login</button>
    {state==='Admin' ?<p className='text-sm'>Doctor Login? as <span onClick={()=>setstate('Doctor')} className='text-primary cursor-pointer'>Click here</span></p>:<p className='text-sm'>Admin login? <span onClick={()=>setstate('Admin')} className='text-primary cursor-pointer'>click here</span></p>}
</div>
    </form>
    
  )
}

export default Login