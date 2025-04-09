// components/UploadDokument.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

function UploadDokument({ label, type }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const { getToken } = useAuth();

  const handleUpload = async () => {
    if (!file) return toast.error("Odaberite datoteku prije slanja.");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Cloudinary preset

    try {
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcbkvfpno/upload",
        formData
      );

      const fileUrl = cloudinaryRes.data.secure_url;
      const token = await getToken();

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/documents/upload`,
        { url: fileUrl, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Dokument uspješno predan.");
        setStatus("pending");
        setComment("");
      }

    } catch (err) {
      toast.error("Greška pri uploadu.");
    }
  };

  const fetchStatus = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.documents.find(doc => doc.type === type);
      if (found) {
        setStatus(found.status);
        setComment(found.comment);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="mb-6">
      <p className="font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer">
          <img className="w-8 h-8 opacity-70 hover:opacity-100 transition" src={assets.profile_upload_icon} alt="Upload" />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <span className="text-sm text-gray-600">{file?.name || "Odaberite datoteku"}</span>
        <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-1.5 rounded-full hover:bg-blue-700 text-sm ml-4 shadow transition-all"
        >
         Pošaljite
        </button>
      </div>
      {status && (
        <p className={`text-sm mt-1 ${status === "approved" ? "text-green-600" : status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
          Status: {status === "approved" ? "Odobreno" : status === "rejected" ? "Odbijeno" : "Na čekanju"}
        </p>
      )}
      {comment && (
        <p className="text-sm text-gray-500 italic mt-1">Komentar: {comment}</p>
      )}
    </div>
  );
}

export default UploadDokument;
