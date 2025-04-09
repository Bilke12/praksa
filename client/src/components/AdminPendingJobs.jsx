import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

function AdminPendingJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchJobs = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error("Greška prilikom dohvaćanja praksi.");
      }
    } catch (err) {
      toast.error("Server greška: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Praksa odobrena.");
        fetchJobs();
      }
    } catch (err) {
      toast.error("Greška prilikom odobravanja.");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Praksa odbijena i obrisana.");
        fetchJobs();
      }
    } catch (err) {
      toast.error("Greška prilikom odbijanja.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Prakse koje čekaju odobrenje</h2>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner min-h-[200px]">
        {loading ? (
          <p>Učitavanje...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-6 rounded text-center text-gray-600 shadow-sm min-h-[120px] flex items-center justify-center">
            Nema neodobrenih praksi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded shadow border hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Projektni zadatak: <span className="font-medium">{job.projectTitle}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Lokacija: {job.location} | Studij: {job.studij}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Dodao: <span className="font-medium">{job.companyId?.name}</span>
                </p>
                
                {job.OPZFileUrl && (
                  <p className="text-sm text-blue-600 underline mb-2">
                    <a href={job.OPZFileUrl} target="_blank" rel="noopener noreferrer">
                      📄 Pogledajte obrazac projektnog zadatka
                    </a>
                  </p>
                )}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleApprove(job._id)}
                    className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    ✅ Odobri
                  </button>
                  <button
                    onClick={() => handleReject(job._id)}
                    className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ❌ Odbij
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPendingJobs;
