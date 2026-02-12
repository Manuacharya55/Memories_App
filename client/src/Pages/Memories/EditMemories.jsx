import React, { useEffect, useState } from 'react'
import MemoryForm from '../../Form/MemoryForm'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useMemory } from '../../Hooks/useMemory';
import { useAuthContext } from '../../Context/AuthContext';


const EditMemories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { memory, fetchSingleMemory, updateMemory } = useMemory();
  const { token } = useAuthContext();
  const [value, setValue] = useState({})

  const fetchMemory = async () => {
    const res = await fetchSingleMemory(`memories/${id}`, token);

    setValue({
      _id: res._id,
      title: res.title,
      image: res.image,
      date: res.date.split("T")[0],
      tag: res.tag
    })
  }

  useEffect(() => {
    if (token) {
      fetchMemory();
    }
  }, [token])

  const submitHandler = async (data) => {
    const res = await updateMemory(`memories/${id}`, data, token);
    if (res) {
      navigate("/home");
    }
  }
  return (
    <div className='h-screen w-full p-10 '>
      <div className='flex justify-start'>
        <button onClick={() => navigate(-1)} className='px-4 py-2 bg-zinc-900 text-white rounded-lg mt-3 hover:bg-zinc-800 transition flex items-center gap-2 font-medium'> <FaArrowLeft /> Back</button>
      </div>
      <h1 className='text-5xl font-bold text-center uppercase mt-16 md:mt-0'>Add Memories</h1>
      <MemoryForm data={value} submitHandler={submitHandler} />
    </div>
  )
}

export default EditMemories