import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminPendingJobs from "../components/AdminPendingJobs";
import AdminDocumentsPanel from "../components/AdminDocumentsPanel";
import AdminDashboardJobs from "../components/AdminDashboardJobs";



function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const { getToken } = useAuth();
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState({});
  const [filterProgram, setFilterProgram] = useState("Svi");
  const [searchName, setSearchName] = useState("");


  const fetchUsers = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) setUsers(data.users);
    } catch (err) {
      toast.error("Greška pri dohvaćanju korisnika.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedApplications = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/applications/selected`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setApplications(res.data.applications);
        const initialComments = {};
        res.data.applications.forEach(app => {
          initialComments[app._id] = app.adminComment || "";
        });
        setComments(initialComments);
      }
    } catch (err) {
      console.error("Greška kod dohvata aplikacija:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
      fetchSelectedApplications();
    }
  }, [activeTab]);

  const handleToggleStatus = async (id, value) => {
    try {
      const token = await getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/applications/${id}/flags`,
        { praksaUspjesnoObavljena: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Status spremljen.");
        fetchSelectedApplications();
      }
    } catch (err) {
      toast.error("Greška kod spremanja statusa.");
    }
  };

  const handleCommentSave = async (id) => {
    try {
      const token = await getToken();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/applications/${id}/comment`,
        { comment: comments[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) toast.success("Komentar spremljen.");
    } catch (err) {
      toast.error("Greška kod spremanja komentara.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {["users", "jobs", "docs", "stats"].map((tab, index) => {
              const labels = ["👥 Korisnici", "📄 Prakse", "📁 Dokumenti", "🛠 Upravljanje praksama"];
              const descriptions = [
                "Pregled svih korisnika.",
                "Odobravanje praksi.",
                "Pregled i odobravanje dokumenata.",
                "Akcije nad praksama."
              ];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-6 rounded shadow hover:shadow-md transition text-left ${
                    activeTab === tab ? "bg-gray-100 border border-gray-300" : "bg-white"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-2">{labels[index]}</h3>
                  <p className="text-gray-600 text-sm">{descriptions[index]}</p>
                </button>
              );
            })}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
            {activeTab === "users" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Popis studenata</h3>
                {loading ? (
                  <p>Učitavanje...</p>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border rounded shadow mb-10">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Ime</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Uloga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                              <td className="py-2 px-4 flex items-center gap-3">
                                <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
                                {user.name}
                              </td>
                              <td className="py-2 px-4">{user.email}</td>
                              <td className="py-2 px-4 capitalize">{user.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <h3 className="text-xl font-semibold mb-4">Prakse – status</h3>
                      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 mb-6">
                      {/* Filter po studiju */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtriraj po studiju:</label>
                        <select
                          value={filterProgram}
                          onChange={(e) => setFilterProgram(e.target.value)}
                          className="border px-3 py-2 rounded w-full sm:w-[200px]"
                        >
                          <option value="Svi">Svi</option>
                          <option value="Računarstvo">Računarstvo</option>
                          <option value="Strojarstvo">Strojarstvo</option>
                          <option value="Elektrotehnika">Elektrotehnika</option>
                        </select>
                      </div>

                      {/* Pretraga po imenu */}
                      <div className="relative w-full sm:w-[200px] mt-4 sm:mt-0">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pretraži po imenu:</label>
                        <input
                          type="text"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          className="border px-3 py-2 rounded w-full pr-10"
                          placeholder="Unesite ime studenta"
                        />
                        {searchName && (
                          <button
                            onClick={() => setSearchName("")}
                            className="absolute right-2 top-9 text-gray-400 hover:text-gray-600"
                            title="Očisti pretragu"
                          >
                            ✕
                          </button>
                        )}
                            </div>

                      {/* Reset gumb */}
                      <div className="mt-4 sm:mt-0">
                        <button
                          onClick={() => {
                            setFilterProgram("Svi");
                            setSearchName("");
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded"
                        >
                          Resetirajte filtere
                        </button>
                      </div>
                    </div>
                      <table className="min-w-full bg-white border rounded shadow">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Student</th>
                            <th className="py-2 px-4">Poduzeće</th>
                            <th className="py-2 px-4">Naziv projekta</th>
                            <th className="py-2 px-4">Lokacija</th>
                            <th className="py-2 px-4">Studij</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Komentar</th>
                          </tr>
                        </thead>
                        <tbody>
                        {applications
                              .filter(
                                (app) =>
                                  (filterProgram === "Svi" || app.jobId?.studij === filterProgram) &&
                                  app.userId?.name?.toLowerCase().includes(searchName.toLowerCase())
                              )
                              .map((app) => (

                              <tr key={app._id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{app.userId?.name}</td>
                                <td className="py-2 px-4">{app.jobId?.title}</td>
                                <td className="py-2 px-4">{app.jobId?.projectTitle}</td>
                                <td className="py-2 px-4">{app.jobId?.location}</td>
                                <td className="py-2 px-4">{app.jobId?.studij}</td>
                                <td className="py-2 px-4">
                                  <label className="inline-flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={app.praksaUspjesnoObavljena}
                                      onChange={(e) => handleToggleStatus(app._id, e.target.checked)}
                                    />
                                    <span className="text-sm">Praksa uspješno obavljena</span>
                                  </label>
                                </td>
                                <td className="py-2 px-4">
                                  <textarea
                                    rows={2}
                                    className="border p-1 text-sm w-full"
                                    value={comments[app._id] || ""}
                                    onChange={(e) => setComments({ ...comments, [app._id]: e.target.value })}
                                  />
                                  <button
                                    onClick={() => handleCommentSave(app._id)}
                                    className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                  >
                                    Spremite komentar
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "jobs" && <AdminPendingJobs />}
            {activeTab === "docs" && <AdminDocumentsPanel />}
            {activeTab === "stats" && <AdminDashboardJobs />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;