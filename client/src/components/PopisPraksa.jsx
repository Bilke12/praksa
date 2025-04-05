import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom"; 
import { assets } from "../assets/assets";
import PraksaCard from "./PraksaCard";

function PopisPraksa() {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    useEffect(() => {
      const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
      const matchesLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
      const matchesStudy = job => searchFilter.studij.length === 0 || searchFilter.studij.includes(job.studij);
  
      const newFilteredJobs = jobs.slice().reverse().filter(
          job => matchesTitle(job) && matchesLocation(job) && matchesStudy(job)
      );
  
      setFilteredJobs(newFilteredJobs);
  }, [jobs, searchFilter]);
  

    return (
      <div className="flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-10 lg:px-20">
        {/* Sidebar (Lijeva strana) */}
        <div className="w-full lg:w-1/4 bg-white px-4 sticky top-0">
          {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Trenutna pretraga</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-gray-100 border border-gray-300 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, title: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 bg-gray-100 border border-gray-300 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() => setSearchFilter((prev) => ({ ...prev, location: "" }))}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

          {/* Navigacija */}
          <nav className="mt-6 border-t pt-4">
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
          </nav>

          {/* Filter po studiju */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-medium text-lg mb-3">Filtriraj po studiju</h3>
            <div className="flex flex-col gap-2 text-gray-600">
              {["Računarstvo", "Strojarstvo", "Elektrotehnika"].map((studij) => (
                <label key={studij} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={searchFilter.studij.includes(studij)}
                    onChange={() => {
                      if (searchFilter.studij.includes(studij)) {
                        setSearchFilter((prev) => ({
                          ...prev,
                          studij: prev.studij.filter((s) => s !== studij),
                        }));
                      } else {
                        setSearchFilter((prev) => ({
                          ...prev,
                          studij: [...prev.studij, studij],
                        }));
                      }
                    }}
                  />
                  {studij}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Glavni sadržaj */}
        <section className="flex-grow text-gray-800">
          <h3 className="font-medium text-3xl py-2" id="popis-praksi">Dostupne Prakse</h3>
          <p className="mb-8">Pronađite praksu koja odgovara baš vama!</p>

          {/* Grid koji se prilagođava veličini ekrana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-fluid gap-4">
            {filteredJobs.map((job, index) => (
              <PraksaCard key={index} job={job} />
            ))}
          </div>
        </section>
      </div>
    );
}

export default PopisPraksa;
