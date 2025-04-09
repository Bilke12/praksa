import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

function AdminDashboardJobs() {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    projectTitle: "",
    location: "",
    studij: "",
  });
  const [filterStudij, setFilterStudij] = useState("Svi");
  const [searchTitle, setSearchTitle] = useState("");

  const fetchJobs = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs || []);
    } catch (err) {
      toast.error("Greška pri dohvaćanju praksi.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title,
      projectTitle: job.projectTitle,
      location: job.location,
      studij: job.studij,
    });
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovu praksu?")) return;
    try {
      const token = await getToken();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Praksa obrisana.");
      fetchJobs();
    } catch (err) {
      toast.error("Greška pri brisanju prakse.");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await getToken();
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/jobs/${editingJob}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Praksa ažurirana.");
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      toast.error("Greška pri spremanju izmjena.");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (filterStudij === "Svi" || job.studij === filterStudij) &&
      job.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">CRUD – Sve prakse</h2>

      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrirajte po studiju:</label>
          <select
            value={filterStudij}
            onChange={(e) => setFilterStudij(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="Svi">Svi</option>
            <option value="Računarstvo">Računarstvo</option>
            <option value="Strojarstvo">Strojarstvo</option>
            <option value="Elektrotehnika">Elektrotehnika</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pretražite po nazivu poduzeća:</label>
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border px-3 py-2 rounded"
            placeholder="Unesite naziv..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Naziv</th>
              <th className="p-2 text-left">Projekt</th>
              <th className="p-2 text-left">Lokacija</th>
              <th className="p-2 text-left">Studij</th>
              <th className="p-2 text-left">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="border-t">
                <td className="p-2">
                  {editingJob === job._id ? (
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    job.title
                  )}
                </td>
                <td className="p-2">
                  {editingJob === job._id ? (
                    <input
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    job.projectTitle
                  )}
                </td>
                <td className="p-2">
                  {editingJob === job._id ? (
                    <input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    job.location
                  )}
                </td>
                <td className="p-2">
                  {editingJob === job._id ? (
                    <input
                      value={formData.studij}
                      onChange={(e) => setFormData({ ...formData, studij: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    job.studij
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {editingJob === job._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Spremite
                      </button>
                      <button
                        onClick={() => setEditingJob(null)}
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Otkažite
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(job)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Uredite
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Obrišite
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboardJobs;
