import React, { useContext, useEffect, useState } from 'react';
import { viewApplicationsPageData } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function ViewApplications() {

  const {backendUrl, companyToken} = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  //Funkcija fetch aplikante za poduzece

  const fetchCompanyJobApplications = async() => {
    try {

      const {data} = await axios.get(backendUrl+'/api/company/applicants',
        {headers: {token: companyToken}}
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      }else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  //Funkcija za promjenu statusa aplikacije

  const changeJobApplicationStatus = async(id, status)=>{
    try {

         const{data} = await axios.post(backendUrl+'/api/company/change-status',
          {id, status}, 
          {headers: {token:companyToken}}
         ) 

         if (data.success) {
          fetchCompanyJobApplications()
         } else{
          toast.error(data.message)
         }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  },[companyToken])

  return applicants ? (
    applicants.length === 0 ) ? (
      <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>Ne postoji nijedan prijavljen kandidat</p>
    </div>
    ) : (
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
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='py-4 px-6 text-center'>{index + 1}</td>
                <td className='py-4 px-6 flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full hidden sm:block' src={applicant.userId.image} alt='' />
                  <span>{applicant.userId.name}</span>
                </td>
                <td className='py-4 px-6'>{applicant.jobId.title}</td>
                <td className='py-4 px-6 hidden sm:table-cell'>{applicant.jobId.location}</td>
                <td className='py-4 px-6 text-center font-semibold text-gray-500'>{applicant.prioritet}</td>
                <td className='py-4 px-6 relative'>
                  {applicant.status === "Pending"
                  ? <div className='relative inline-block text-left group'>
                  <button className='text-gray-500 hover:text-gray-700 font-semibold px-4 py-2 rounded'>...</button>
                  <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md group-hover:block'>
                    <button onClick={()=>changeJobApplicationStatus(applicant._id, 'Prihvaceno')} className='block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100 rounded-t'>Prihvati</button>
                    <button onClick={()=>changeJobApplicationStatus(applicant._id, 'Odbijeno')} className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b'>Odbij</button>
                  </div>
                </div>
                : <div>{applicant.status}</div>
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications;
