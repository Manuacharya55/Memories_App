import React from 'react'
import Input from '../../Components/UI/Input'
import MemoryForm from '../../Form/MemoryForm'
import { useMemory } from '../../Hooks/useMemory'
import { useAuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const AddMemories = () => {
  const data = {
    title: "",
    image: "",
    date: "",
    tag: "",
  }
  const navigate = useNavigate();
  const { createMemory, processing } = useMemory();
  const { token } = useAuthContext();
  const submitHandler = async (data) => {

    if (!token) return;

    const response = await createMemory("memories", data, token)

    if (response) {
      navigate("/home")
    }
  }

  return (
    <div className='h-screen w-full p-10 '>
      <div className='flex justify-start'>
        <button onClick={() => navigate(-1)} className='px-4 py-2 bg-zinc-900 text-white rounded-lg mt-3 hover:bg-zinc-800 transition flex items-center gap-2 font-medium'> <FaArrowLeft /> Back</button>
      </div>
      <h1 className='text-5xl font-bold text-center uppercase mt-16 md:mt-0 w-full'>Add Memories</h1>
      <MemoryForm data={data} submitHandler={submitHandler} processing={processing} />
    </div>
  )
}

export default AddMemories