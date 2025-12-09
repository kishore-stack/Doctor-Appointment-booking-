import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import {AppContext} from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctor from '../components/RelatedDoctor'
import axios from 'axios'
import {toast} from "react-toastify";

const Appointment = () => {
  const {docId} = useParams();
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData} = useContext(AppContext);
  const daysofweek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const navigate =useNavigate()
  const[docInfo,setDocInfo]= useState(null);
  const[docSlots,setDocSlots]= useState([]);
  const[slotIndex,setSlotIndex]= useState(0);
  const[slotTime,setSlotTime]= useState("");
  const fetchDocInfo= async()=>{
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }
const getAvaliableSlots = async () => {
  setDocSlots([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {

    let date = new Date(today);
    date.setDate(today.getDate() + i);

    let endTime = new Date();
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    // Start time logic
    if (i === 0) {
      let now = new Date();
      if (now.getHours() >= 21) {
        // ⬅️ no slots today, return empty array to show the date at least
        setDocSlots(prev => [...prev, []]);
        continue;
      }
      date.setHours(now.getHours() >= 10 ? now.getHours() + 1 : 10);
      date.setMinutes(now.getMinutes() > 30 ? 30 : 0);
    } else {
      date.setHours(10);
      date.setMinutes(0);
    }

    let timeSlots = [];
    while (date < endTime) {
      timeSlots.push({
        datetime: new Date(date),
        time: date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      });
      date.setMinutes(date.getMinutes() + 30);
    }

    setDocSlots(prev => [...prev, timeSlots]);
  }
};
const bookAppointment =async()=>{
if (!token){
  toast.warn('login to book appointment')
  return navigate('/login')
}
try{
  const date = docSlots[slotIndex][0].datetime;
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();
  const slotDate =  day +"_"+ month +"_"+ year;
  const {data}= await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotTime,slotDate},{headers:{token}})
  if(data.success){
    toast.success(data.message);
    getDoctorsData();
    navigate('/MyAppointment')
  } else{
    toast.error(data.message);

  }
  console.log(slotDate);
}
catch(error){
  console.log(error)
  toast.error(error.message)
}
}

  useEffect(() => {
    fetchDocInfo();
  },[doctors,docId])

  useEffect(() => {
    getAvaliableSlots();
  },[docInfo])

useEffect(()=>{
console.log(docSlots);
},[docSlots]
)

if (!docInfo) {
  return <div>Loading...</div>;
}
  
return (
  <div>
    {/* doctor details and info in one flex container */}
    <div className='flex flex-col sm:flex-row gap-6'>
      {/* Left side - Image */}
      <img
        className='bg-primary w-full sm:max-w-72 rounded-lg'
        src={docInfo.image}
        alt=""
      />

      {/* Right side - Doctor info */}
      <div className='flex-1 border border-gray-300 rounded-lg p-8 py-6 bg-white mx-2 sm:mx-0'>
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
          {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
        </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-500'>
          <p>{docInfo.speciality} - {docInfo.degree}</p>
          <button className='py-0.5 px-2 border text-x5 rounded-full'>{docInfo.experience}</button>
        </div>

        {/* Doctor about */}
        <div>
          <p className='flex-items-center gap-1 text-sm font-medium text-gray-600 mt-3 '>About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-500 max-w-[500px] mt-1 '>{docInfo.about}</p>
        </div>
        <p className='flex items-center gap-2 text-1xl font-medium text-gray-900'>
          Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
      </div>
    </div>
    {/* booking slots */}
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-900'>
      <p>Booking Slots</p>
      <div className='flex gap-4 items-center w-full overflow-x-scroll mt-4'>
        {
        docSlots.length && docSlots.map((item,index)=>(
          <div onClick={() => setSlotIndex(index) } className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} key={index}>
            <p>{item[0]&& daysofweek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()}</p>
          </div>
        ))}
      </div>
<div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
  {docSlots.length && docSlots[slotIndex].map((item,index)=>(
    <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} key={index}>{item.time.toLowerCase()}</p>
  ))}
</div>
<button onClick={bookAppointment} className='bg-primary text-white text-small font-light px-5 py-2 rounded-full mt-6'>
  BOOK AN APPOINTMENT
</button>
</div>
{/* listing related doctors */}
<RelatedDoctor docId={docId} speciality={docInfo.speciality}/>
</div>
); 

}

export default Appointment 