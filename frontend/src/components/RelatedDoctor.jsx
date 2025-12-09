import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const RelatedDoctor = ({speciality,docId}) => {
    const {doctors}=useContext(AppContext)
    const [relDoc,setrelDoc]=useState([])
    const navigate = useNavigate()
    useEffect(()=>
    {
        if(doctors.length>0 && speciality){
            const doctorsData =doctors.filter((doc)=> doc.speciality === speciality && doc._id !==docId)
            setrelDoc(doctorsData)
        }
    },
[doctors,speciality,docId])
    
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10 '>
      <h2 className='  text-3xl font-semibold'>Top Doctors to Book</h2>
      <p className='sm:w-1/3 text-center'>Find and book appointments with the best doctors in your area.</p>
      <div className='w-full grid grid-cols-[var(--grid-cols-auto)] gap-4 pt-2 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item,index) => (
            <div  key={item._id}  onClick={() => {navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='  border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500 ' >
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    </div>
                    <p className='text-grey-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-grey-600 text-sm'>{item.speciality}</p>
                </div>
                </div>
        ))}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'>more</button>
    </div>
  )
}


export default RelatedDoctor