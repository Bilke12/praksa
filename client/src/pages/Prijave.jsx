import React from 'react';
import Navbar from '../components/Navbar';
import { jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';

function Prijave() {
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
                </tr>
              </thead>
              <tbody>
                {jobsApplied.map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2 border-b">
                      <img className="w-8 h-8" src={job.logo} alt="" />
                      {job.company}
                    </td>
                    <td className="py-2 px-4 border-b">{job.title}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format('DD.MM.YYYY')}</td>
                    <td className="py-2 px-4 border-b max-sm:hidden">1</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-4 py-1.5 rounded min-w-[120px] inline-block text-center ${
                          job.status === 'Accepted'
                            ? 'bg-green-300 text-green-800'
                            : job.status === 'Rejected'
                            ? 'bg-red-300 text-red-800'
                            : 'bg-gray-300 text-gray-800'
                        }`}
                      >
                        {job.status === 'Accepted' ? 'Prihvaćeno' :
                         job.status === 'Rejected' ? 'Odbijeno' : 'Na čekanju'}
                      </span>
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
