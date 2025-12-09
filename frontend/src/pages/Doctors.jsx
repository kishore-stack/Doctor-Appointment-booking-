import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import {AppContext} from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)
  const navigate =useNavigate();
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  },[doctors,speciality])
  return (
    <div>

      
       
        <p className='text-gray-600'>Browse through doctors specialist</p>
        <div className='flex flex-col sm:flex-row items-start gap mt-5'>
          <div className=' flex flex-col gap-4 text-sm text-gray-600'>
            <p onClick={() => speciality==='General physician'? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="General physician"? "bg-indigo-100 text-black":""}`}>General physician</p>
            <p onClick={() => speciality==='Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
            <p onClick={() => speciality==='Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
            <p onClick={() => speciality==='Pediatricians'? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
            <p onClick={() => speciality==='Neurologist'? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
            <p onClick={() => speciality==='Gastroenterologist'? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer ${speciality ==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
            { 
            filterDoc.map((item,index) => (
            <div key={item._id} onClick={() => navigate(`/appointment/${item._id}`)} className='  border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
        </div>
        
    </div>
  )
}

export default Doctors
