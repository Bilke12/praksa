import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function UpravaPraksom() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false); 
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs', {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? jobs.length === 0 ? ( 
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>Ne postoji nijedna objavljena praksa</p>
    </div>
  ) : (
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
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='py-4 px-6 text-center max-sm:hidden'>{index + 1}</td>
                <td className='py-4 px-6'>{job.title}</td>
                <td className='py-4 px-6 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-4 px-6 max-sm:hidden'>{job.location}</td>
                <td className='py-4 px-6 text-center'>{job.applicants}</td>
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
  ) : <Loading />;
}

export default UpravaPraksom;
