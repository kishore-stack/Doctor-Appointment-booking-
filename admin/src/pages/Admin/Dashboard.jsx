import React from 'react'
import { useContext,useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {assets} from '../../assets/assets'


const Dashboard = () => {
  const{aToken,getDashData,cancelAppointment,dashData}=useContext(AdminContext)
  useEffect(()=>{
    if(aToken){
      getDashData()
    }
  },[aToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon} alt=""/>
          <div>
            <p>
              {dashData.doctors}

            </p>
            <p>Doctors</p>
          </div>
        </div>
         <div  className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointments_icon} alt=""/>
          <div>
            <p>
              {dashData.appointments}

            </p>
            <p>Appointments</p>
          </div>
        </div>
         <div  className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt=""/>
          <div>
            <p>
              {dashData.patients}

            </p>
            <p>patients</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 '>
          <img src={assets.list_icon} alt=''/>
          <p>latest appointments</p>
        </div>
        <div className='pt-4 border border-t-0'>
{
  dashData.latestAppointments.map((item,index)=>(
    <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
      <img className='rounded-full w-10 ' src={item.docData.image} alt=''/>
      <div className='flex-1 text-sm'>
        <p className='text-gray-800 font-medium'>{item.docData.name}</p>
        <p className='text-gray-600'>{item.slotDate}</p>
        </div>
         {
                        item.cancelled ? (
                          <p className='text-red-500 font-medium'>cancelled</p>
                        ) :
                          (
                            <img
                              onClick={() => cancelAppointment(item._id)}
                              className='w-8 cursor-pointer'
                              src={assets.cancel_icon}
                              alt='cancel'
                            />
                          )
                      }
        </div>

  ))
}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
