import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function UpravaPraksom() {
    const navigate = useNavigate();

    return (
        <div className='container mx-auto p-6'>
            <div className='overflow-x-auto'>
                <table className='w-[90vw] max-w-[1400px] mx-auto bg-white border border-gray-200 shadow-lg rounded-lg'>
                    <thead className='bg-gray-100'>
                        <tr className='text-gray-700 text-left'>
                            <th className='py-3 px-6 max-sm:hidden'>#</th>
                            <th className='py-3 px-6'>Naziv Projekta</th>
                            <th className='py-3 px-6 max-sm:hidden'>Datum</th>
                            <th className='py-3 px-6 max-sm:hidden'>Lokacija</th>
                            <th className='py-3 px-6 text-center'>Broj aplikanta</th>
                            <th className='py-3 px-6'>Vidljivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageJobsData.map((job, index) => (
                            <tr key={index} className='border-b hover:bg-gray-50'>
                                <td className='py-4 px-6 text-center max-sm:hidden'>{index + 1}</td>
                                <td className='py-4 px-6'>{job.title}</td>
                                <td className='py-4 px-6 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                                <td className='py-4 px-6 max-sm:hidden'>{job.location}</td>
                                <td className='py-4 px-6 text-center'>{job.applicants}</td>
                                <td className='py-4 px-6'>
                                    <input className='scale-125 ml-4' type='checkbox' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-4 flex justify-end'>
                <button 
                    onClick={() => navigate('/dashboard/dodaj-praksu')} 
                    className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200'
                >
                    Dodajte praksu
                </button>
            </div>
        </div>
    );
}

export default UpravaPraksom;
