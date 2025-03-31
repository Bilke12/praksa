import React from 'react';
import { viewApplicationsPageData } from '../assets/assets';

function ViewApplications() {
  return (
    <div className='container mx-auto p-6'>
      <div className='overflow-x-auto'>
        <table className='w-full max-w-full sm:w-[90vw] max-w-[1400px] mx-auto bg-white border border-gray-200 shadow-lg rounded-lg'>
          <thead className='bg-gray-100'>
            <tr className='text-gray-700 text-left'>
              <th className='py-3 px-6'>#</th>
              <th className='py-3 px-6'>Ime</th>
              <th className='py-3 px-6'>Naziv projekta</th>
              <th className='py-3 px-6 hidden sm:table-cell'>Lokacija</th>
              <th className='py-3 px-6'>Prioritet</th>
              <th className='py-3 px-6'>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='py-4 px-6 text-center'>{index + 1}</td>
                <td className='py-4 px-6 flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full hidden sm:block' src={applicant.imgSrc} alt='' />
                  <span>{applicant.name}</span>
                </td>
                <td className='py-4 px-6'>{applicant.jobTitle}</td>
                <td className='py-4 px-6 hidden sm:table-cell'>{applicant.location}</td>
                <td className='py-4 px-6 text-center font-semibold text-blue-600'>{applicant.priority}</td>
                <td className='py-4 px-6 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 hover:text-gray-700 font-semibold px-4 py-2 rounded'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100 rounded-t'>Prihvati</button>
                      <button className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b'>Odbij</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewApplications;
