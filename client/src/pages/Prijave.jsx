import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

function Prijave() {
  const { user } = useUser();
  const { userApplications, fetchUserApplications } = useContext(AppContext);
  const { getToken } = useAuth();

  const handleSelect = async (applicationId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/select-internship`,
        { applicationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Greška pri prihvaćanju prakse.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const hasSelected = userApplications.some(app => app.selected);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-between px-4 sm:px-10 lg:px-20">
        <div>
          <h2 className="text-2xl font-semibold mb-6 mt-10">Prijavljene prakse</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b text-left">Poduzeće</th>
                  <th className="py-3 px-4 border-b text-left">Projekt</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden">Lokacija</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden">Datum</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden">Prioritet</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">Akcije</th>
                </tr>
              </thead>
              <tbody>
              {userApplications
              .filter(job => job.jobId && job.companyId) // samo oni koji imaju podatke
              .map((job, index) => (

                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2 border-b">
                      <img className="w-8 h-8" src={job.companyId.image} alt="" />
                      {job.jobId.title}
                    </td>
                    <td className="py-2 px-4 border-b">{job.jobId.projectTitle}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{job.jobId.location}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format('DD.MM.YYYY')}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{job.prioritet}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-4 py-1.5 rounded min-w-[120px] inline-block text-center ${
                          job.status === 'Prihvaceno'
                            ? 'bg-green-300 text-green-800'
                            : job.status === 'Odbijeno'
                            ? 'bg-red-300 text-red-800'
                            : 'bg-gray-300 text-gray-800'
                        }`}
                      >
                        {job.status === 'Prihvaceno'
                          ? 'Prihvaćeno'
                          : job.status === 'Odbijeno'
                          ? 'Odbijeno'
                          : 'Na čekanju'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {job.status === 'Prihvaceno' && !job.selected && !hasSelected && (
                        <button
                          onClick={() => handleSelect(job._id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                        >
                          Prihvati ovu praksu
                        </button>
                      )}
                      {job.selected && (
                        <span className="text-green-600 font-semibold text-sm">(Odabrana)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Prijave;
