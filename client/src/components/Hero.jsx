import React from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useRef } from 'react';
import { useContext } from 'react';

function Hero() {

    const {setSearchFilter, setIsSearched} = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title:titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
        
    }

    return (
      <div className="w-full 2xl:px-20 mx-auto my-10">
        <div className="bg-gradient-to-r from-gray-500 to-gray-800 text-white py-16 text-center mx-2 rounded-xl w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
            Pronađi svoju idealnu praksu!
          </h2>
          <p className="mb-8 max-w-3xl mx-auto text-sm font-light px-5">
            Razvijaj vještine kroz stvarne projekte uz jednostavan i brz sustav prijave i praćenja prakse. Pronađi priliku koja odgovara tvojim interesima i stekni vrijedno iskustvo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto bg-white rounded text-gray-600 p-4">
            {/* Pretraga */}
            <div className="flex items-center flex-1 sm:mr-2 mb-4 sm:mb-0">
              <img className="h-6 sm:h-8 mr-3" src={assets.search_icon} alt="" />
              <input
                type="text"
                placeholder="Pretrazujte ponuđene prakse"
                className="p-3 rounded outline-none w-full text-sm" ref={titleRef}
              />
            </div>
            
            {/* Lokacija */}
            <div className="flex items-center flex-1 sm:mr-2 mb-4 sm:mb-0">
              <img className="h-6 sm:h-8 mr-3" src={assets.location_icon} alt="" />
              <input
                type="text"
                placeholder="Lokacija"
                className="p-3 rounded outline-none w-full text-sm" ref={locationRef}
              />
            </div>
  
            {/* Dugme "Traži" */}
            <button onClick={onSearch} className="bg-blue-400 px-8 py-3 rounded text-white w-full sm:w-auto mt-4 sm:mt-0">
              Traži
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  

export default Hero