import React, { useState } from 'react'
import { useContext } from 'react';
import {toast} from 'react-toastify'
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'

const NewsLetterBox =  () => {
  const { backendUrl, token } = useContext(ShopContext)
  const [feedback, setFeedback] = useState('');
  const onSubmitHandler = async (event)=>{
      event.preventDefault();
      if(!token){
        toast.error("Please login to send feedback")
        return
      }
      try {
        const response = await axios.post(backendUrl+'/api/feedback/send',{feedbackMessage:feedback},{headers:{token}})
        if(response.data.success){
          toast.success("Feedback Sent")
          setFeedback('')
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Share Your Experience</p>
        <p className='text-gray-400 mt-3'>
          Your feedback helps us grow. Tell us what you loved, what we can improve, and how we can serve you better.
        </p>
        <form className='w-full sm:w-1/2  flex flex-col items-center gap-3 mx-auto my-6  pl-3' onSubmit={onSubmitHandler} action="">
          <textarea value={feedback} onChange={(e)=>setFeedback(e.target.value)} className='w-full sm:flex-1 outline-none border border-teal-900/50 rounded-lg px-3 py-2 text-gray-600' type="text" placeholder='Write your feedback here' required />
          <button 
  type="submit"
  className="px-10 py-4 text-xs text-white tracking-wide
  bg-gradient-to-r from-emerald-800 to-teal-900/70
  hover:opacity-90 active:scale-95
  transition-all duration-300 rounded-md shadow-md">
  SEND
</button>
        </form>
    </div>

  )
}

export default NewsLetterBox