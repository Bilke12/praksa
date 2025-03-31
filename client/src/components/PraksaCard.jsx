import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function PraksaCard({ job }) {

    const navigate = useNavigate()

  return (
    <div className='border p-6 shadow rounded'>
        <div className='flex justify-between items-center'>
            <img className='h-8' src={assets.company_icon} alt='' />
        </div>
        <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs'>
            <span className='bg-gray-400 border-gray-600 px-4 py-1.5 rounded'>{job.location}</span>
        </div>
        <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}} ></p>
        <div className='mt-4 flex gap-4 text-sm'> 
            <button onClick={()=> {navigate(`/prijavi-praksu/${job._id}`); scrollTo(0,0)}} className='bg-blue-400 text-white px-4 py-2 rounded'>Prijavi se</button>
            <button onClick={()=> {navigate(`/prijavi-praksu/${job._id}`); scrollTo(0,0)}} className='text-gray-700 border-gray-500 bg-gray-300 rounded px-4 py-2'>Detaljno</button>
        </div>
    </div>
  )
}

export default PraksaCard