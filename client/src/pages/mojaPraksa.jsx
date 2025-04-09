import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import ProgressTracker from "../components/ProgressTracker";

const MojaPraksa = () => {
  const { userApplications } = useContext(AppContext);

  // Filtriraj odabranu praksu
  const selectedApplication = userApplications.find(app => app.selected);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow px-4 sm:px-10 lg:px-20 py-8">
        {/* Navigacija lijevo */}
        <div className="w-auto bg-white p-4 rounded-lg mr-6">
          <h3 className="font-medium text-lg mb-3">Navigacija</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">🏠 Početna</Link>
            </li>
            <li>
              <Link to="/mojaPraksa" className="block px-3 py-2 rounded hover:bg-gray-100">📋 Moja praksa</Link>
            </li>
            <li>
              <Link to="/dokumenti" className="block px-3 py-2 rounded hover:bg-gray-100">📂 Dokumenti</Link>
            </li>
          </ul>
        </div>

        {/* Glavni sadržaj */}
        <div className="flex-grow bg-gray-100 shadow-md p-7 rounded-lg max-w-8xl">
          {selectedApplication ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Praksu obavlja u poduzeću: <span className="text-blue-600">{selectedApplication.companyId.name}</span>
              </h2>
              <p className="text-gray-600 mb-4">
                Projektni zadatak: <span className="font-medium text-blue-600">{selectedApplication.jobId.projectTitle}</span>
              </p>

              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-gray-800 font-medium">Status prakse:</p>
                <p className="text-gray-700 mt-1">
                  {selectedApplication.praksaUspjesnoObavljena
                    ? "Praksa uspješno obavljena ✅"
                    : selectedApplication.status}
                </p>

                {/* 📄 Dokumentacija odobrena */}
                {selectedApplication.predaniDokumenti && (
                  <p className="text-green-600 font-medium mt-2">
                    📄 Dokumentacija odobrena ✅
                  </p>
                )}
              </div>
              <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <p className="text-gray-800 font-medium">Komentar administratora:</p>
                <p className="text-red-600 italic mt-1">
                  {selectedApplication.adminComment || "Nema komentara"}
                </p>
              </div>

              {/* Progress tracker komponenta */}
              <ProgressTracker selectedApplication={selectedApplication} />
            </>
          ) : (
            <p className="text-gray-700">Niste još odabrali praksu.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MojaPraksa;
