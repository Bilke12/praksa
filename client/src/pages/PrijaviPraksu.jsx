import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';

function PrijaviPraksu() {
  const { id } = useParams();
  const { getToken } = useAuth();

  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const [prioritet, setPrioritet] = useState(1);
  const { backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
        if (data.success) {
          setJobData(data.job);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchJob();
  }, [id, backendUrl]);

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Morate biti prijavljeni kako bi aplicirali za praksu');
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: JobData._id, prioritet },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserApplications()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId && item.jobId._id === JobData._id);

    setIsAlreadyApplied(hasApplied)
  }

  useEffect(()=>{
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  },[JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId.image}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{JobData.title}</h1>
                <h2 className="text-2xl sm:text-2xl font-medium">{JobData.projectTitle}</h2>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.studij}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    Broj potrebnih studenata: {JobData.brojstudenata}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                className="bg-blue-600 p-2.5 px-10 text-white rounded"
              >
                {isAlreadyApplied? 'Prijavljeni ste':'Prijavite se'}
              </button>
              <p className="mt-1 text-gray-600">
                Objavljeno {moment(JobData.date).format('DD. MM. YYYY')}
              </p>
                {/* input field */}
                <div className="mt-5">
                <label htmlFor="prioritet" className="font-medium text-medium block mb-2">
                  Prioritet:
                </label>
                <input
                  type="number"
                  id="prioritet"
                  value={prioritet}
                  onChange={(e) => setPrioritet(Number(e.target.value))}
                  min="1"
                  max="4"
                  className="w-13 text-center mx-auto border p-2 border-gray-300 rounded-md"
                />
              </div>   
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full">
              <h2 className="font-bold text-2xl mb-4">Opis projekta</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>

              {JobData.OPZFileUrl && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Obrazac projektnog zadatka</h2>
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center p-4 border border-gray-300 rounded bg-gray-50">
                      <img className="w-6 h-6 mr-3" src={assets.dokk} alt="Dokument Ikona" />
                      <a
                        href={JobData.OPZFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Obrazac projektnog zadatka (PDF)
                      </a>
                    </div>
                  </div>
                </div>
              )}


              <button
                onClick={applyHandler}
                className="bg-blue-600 p-2.5 px-10 text-white rounded mt-6"
              >
                {isAlreadyApplied? 'Prijavljeni ste':'Prijavite se'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default PrijaviPraksu;
