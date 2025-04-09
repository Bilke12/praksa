import React from 'react'
import { useNavigate } from 'react-router-dom'

function PraksaCard({ job }) {
    const navigate = useNavigate()

    // Funkcija za određivanje boje na temelju studija
    const getStudyBadgeColor = (studij) => {
        switch (studij) {
            case "Računarstvo":
                return "bg-blue-200 text-gray-800";
            case "Strojarstvo":
                return "bg-red-200 text-gray-800";
            case "Elektrotehnika":
                return "bg-orange-200 text-gray-800";
            default:
                return "bg-gray-200 text-gray-600"; // Default boja
        }
    };

    return (
        <div className='border p-6 shadow-lg rounded-2xl bg-white hover:shadow-xl transition duration-300'>
            <div className='flex items-center mb-4'>
                {/* Slika kompanije na lijevoj strani */}
                <img className='h-12 w-12 object-cover rounded-full' src={job.companyId.image} alt='Company Logo' />
                <div className='ml-4'>
                    <h4 className='font-semibold text-xl text-gray-900'>{job.title}</h4>
                    <h3 className='font-medium text-lg text-gray-700'>{job.projectTitle}</h3>
                </div>
            </div>
            <div className='flex items-center gap-3 mt-3 text-sm'>
                <span className='bg-gray-200 text-gray-600 px-4 py-1.5 rounded-full'>{job.location}</span>
                {/* studij sa odgovarajućom bojom */}
                <span className={`px-4 py-1.5 rounded-full ${getStudyBadgeColor(job.studij)}`}>
                    {job.studij}
                </span>
            </div>
            <p className='text-gray-500 text-sm mt-4 line-clamp-3' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + "..." }}></p>
            <div className='mt-6 flex gap-4 text-sm'> 
                <button 
                    onClick={() => {navigate(`/prijavi-praksu/${job._id}`); scrollTo(0,0)}} 
                    className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200 shadow-md'>
                    Prijavi se
                </button>
                <button 
                    onClick={() => {navigate(`/prijavi-praksu/${job._id}`); scrollTo(0,0)}} 
                    className='text-gray-700 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-2 transition duration-200 shadow-md'>
                    Detaljno
                </button>
            </div>
        </div>
    )
}

export default PraksaCard
