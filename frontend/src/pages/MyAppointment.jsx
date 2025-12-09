import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {
  const { backendUrl,token,getDoctorsData} = useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const months=["","January","February","March","April","May","June","July","August","September","October","November","December"]
  const slotDateFormat =(slotDate)=>{
    const dateArray=slotDate.split("_")
    return dateArray[0]+" "+ months[Number(dateArray[1])]+"" +dateArray[2]
  }
  const naviagte= useNavigate()
  const getUserAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const cancelAppointment = async(appointmentId)=>{
    try {
     const {data}= await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
     if(data.success){
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
      }else{
        toast.error(data.message)
        
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
useEffect(()=>{
  if(token){
    getUserAppointments()

  }
},[token])
  return (
    <div className='my-10 text-gray-800'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>My Appointments</h2>

      <div className='flex flex-col gap-6'>
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row items-center justify-between border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-white'
          >
            {/* Doctor Image */}
            <div className='flex-shrink-0'>
              <img
                src={item.docData.image}
                alt={item.name}
                className='w-28 h-28 rounded-full object-cover border-2 border-blue-200'
              />
            </div>

            {/* Doctor Info */}
            <div className='flex-1 text-center md:text-left md:ml-6 mt-4 md:mt-0'>
              <p className='text-lg font-semibold'>{item.docData.name}</p>
              <p className='text-sm text-gray-500 mb-2'>{item.docData.speciality}</p>

              <div className='text-sm text-gray-700'>
                <p className='font-medium text-gray-600'>Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>

              <p className='mt-3 text-sm'>
                <span className='font-medium text-gray-600'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>


            {/* Action Buttons */}
            <div className='flex flex-col gap-3 mt-4 md:mt-0'>
              {!item.cancelled && <button className='bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors'>
                Pay Online
              </button> }
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors'> 
                Cancel Appointment
              </button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border -red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
