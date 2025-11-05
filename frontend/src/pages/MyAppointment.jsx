import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className='my-10 text-gray-800'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>My Appointments</h2>

      <div className='flex flex-col gap-6'>
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row items-center justify-between border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-white'
          >
            {/* Doctor Image */}
            <div className='flex-shrink-0'>
              <img
                src={item.image}
                alt={item.name}
                className='w-28 h-28 rounded-full object-cover border-2 border-blue-200'
              />
            </div>

            {/* Doctor Info */}
            <div className='flex-1 text-center md:text-left md:ml-6 mt-4 md:mt-0'>
              <p className='text-lg font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-500 mb-2'>{item.speciality}</p>

              <div className='text-sm text-gray-700'>
                <p className='font-medium text-gray-600'>Address:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>

              <p className='mt-3 text-sm'>
                <span className='font-medium text-gray-600'>Date & Time:</span> 25 Sep, 2025
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-3 mt-4 md:mt-0'>
              <button className='bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors'>
                Pay Online
              </button>
              <button className='bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
