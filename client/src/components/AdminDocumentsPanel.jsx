import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const dokumentiTipovi = [
  "sporazum",
  "opz",
  "izvjesce",
  "zavrsno",
  "poster",
  "prezentacija",
];

function AdminDocumentsPanel() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("Svi");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/documents`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setUsers(res.data.users);
    } catch (err) {
      toast.error("Greška pri dohvaćanju dokumenata.");
    }
  };

  const handleStatusChange = async (docId, status) => {
    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/documents/${docId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status ažuriran.");
      fetchDocs();
    } catch (err) {
      toast.error("Greška pri spremanju statusa.");
    }
  };

  const handleCompleteChange = async (userId, checked) => {
    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/documents/complete/${userId}`,
        { value: checked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, dokumentacijaKompletna: checked } : user
        )
      );
      toast.success("Status dokumentacije spremljen.");
    } catch (err) {
      toast.error("Greška pri spremanju statusa dokumentacije.");
    }
  };

  const handleSporazumPredanChange = async (userId, checked) => {
    try {
      const token = await getToken();
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/applications/${userId}/sporazum`,
        { value: checked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(prev =>
        prev.map(user =>
          user._id === userId ? { ...user, sporazumPredan: checked } : user
        )
      );
      toast.success("Status sporazuma spremljen.");
    } catch (err) {
      toast.error("Greška pri spremanju statusa sporazuma.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchStudij = filter === "Svi" || user.studij === filter;
    const matchIme = user.name.toLowerCase().includes(search.toLowerCase());
    return matchStudij && matchIme;
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Dokumentacija studenata</h3>

      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Studij:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="Svi">Svi</option>
            <option value="Računarstvo">Računarstvo</option>
            <option value="Strojarstvo">Strojarstvo</option>
            <option value="Elektrotehnika">Elektrotehnika</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Pretraga po imenu:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Unesite ime..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Ime i prezime</th>
              <th className="p-2 text-left">Studij</th>
              {dokumentiTipovi.map((tip) => (
                <th key={tip} className="p-2 text-left capitalize">{tip}</th>
              ))}
              <th className="p-2 text-left">Dokumentacija kompletna</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.studij}</td>
                  {dokumentiTipovi.map((tip) => {
                    const doc = user.documents.find((d) => d.type === tip);
                    return (
                      <td key={tip} className="p-2">
                        {doc ? (
                          <div>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Otvorite
                            </a>
                            <select
                              className="mt-1 block border text-sm px-1 py-0.5 rounded"
                              defaultValue={doc.status}
                              onChange={(e) => handleStatusChange(doc._id, e.target.value)}
                            >
                              <option value="pending">Na čekanju</option>
                              <option value="approved">Odobreno</option>
                              <option value="rejected">Odbijeno</option>
                            </select>
                            {tip === "sporazum" && (
                              <div className="mt-1">
                                <label className="inline-flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={user.sporazumPredan || false}
                                    onChange={(e) =>
                                      handleSporazumPredanChange(user._id, e.target.checked)
                                    }
                                  />
                                  <span>Sporazum predan</span>
                                </label>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">Nema</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="p-2">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={user.dokumentacijaKompletna || false}
                        onChange={(e) => handleCompleteChange(user._id, e.target.checked)}
                      />
                      <span className="text-sm">Kompletna</span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDocumentsPanel;