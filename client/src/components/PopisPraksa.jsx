import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom"; 
import { assets, JobCategories, JobLocations } from "../assets/assets";
import PraksaCard from "./PraksaCard";
import { useEffect } from "react";

function PopisPraksa() {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [filteredJobs, setFilteredJobs] = useState(jobs)

    useEffect(()=>{
        
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())


        const newFilteredJobs= jobs.slice().reverse().filter(
            job => matchesTitle(job) && matchesLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
    
    },[jobs,searchFilter])
  
    return (
      <div className="flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-10 lg:px-20">
        {/* Sidebar (Lijeva strana) */}
        <div className="w-full lg:w-1/4 bg-white px-4">
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
        </div>
  
        {/* Glavni sadržaj - Poravnano uz sidebar i puni prostor */}
        <section className="flex-grow text-gray-800">
          <h3 className="font-medium text-3xl py-2" id="popis-praksi">Dostupne Prakse</h3>
          <p className="mb-8">Pronađite praksu koja odgovara baš vama!</p>
  
          {/* Dinamičan grid koji se prilagođava veličini ekrana */}
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