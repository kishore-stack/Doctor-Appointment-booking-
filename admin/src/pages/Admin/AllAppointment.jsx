import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header Row */}
        <div className='hidden sm:grid 
          sm:grid-cols-[0.5fr_2fr_0.8fr_2fr_2fr_1fr_1fr]
          py-3 px-6 border-b font-semibold text-gray-600'
        >
          <p>#</p>
          <p>patient</p>
          <p>age</p>
          <p>date & time</p>
          <p>doctor</p>
          <p>fees</p>
          <p>actions</p>
        </div>

        {/* Data Rows */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-2 
            sm:grid sm:grid-cols-[0.5fr_2fr_0.8fr_2fr_2fr_1fr_1fr] 
            items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={index}
          >

            {/* # */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor */}
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt='' />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Actions (Cancel or Status) */}
            <div>
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

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
