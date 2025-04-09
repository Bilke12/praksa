import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import UploadDokument from './UploadDokument';

function Dokumenti() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles([...uploadedFiles, ...files]);
    };
    
    const materials = [
        { name: 'Pravilnik o stručnoj praksi.pdf', url: '/pdf/Pravilnik o stručnoj praksi.pdf' },
        { name: 'Sporazum o stručnoj praksi.docx', url: '/pdf/Sporazum o stručnoj praksi.docx' },
        { name: 'Obrazac projektnog zadatka.docx', url: '/pdf/Obrazac projektnog zadatka.docx' },
        { name: 'Zahtjev za obavljanje stručne prakse.docx', url: '/pdf/Zahtjev za obavljanje stručne prakse.docx' },
        { name: 'Završno izvješće o projektu.docx', url: '/pdf/Završno izvješće o projektu.docx' },
        { name: 'Predložak postera projekta.pptx', url: '/pdf/Predložak postera projekta.pptx' }
    ];
    
    return (
        <div className="bg-white min-h-screen text-gray-700">
            <Navbar />
            <div className="flex flex-grow px-4 sm:px-10 lg:px-20 py-8">
                {/* Navigacija - lijevo */}
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
                    <h1 className="text-2xl font-semibold mb-6">Opći dio</h1>
                    <div className="space-y-4 text-gray-600">
                        <p>Studenti koji ne povezuju praksu i diplomski dužni su:</p>
                        <ol className="list-decimal list-inside">
                            <li>Prije početka obavljanja prakse dostaviti potpisan i pečatiran Sporazum o stručnoj praksi za akademsku 2024./2025. godinu i popunjen, potpisan i pečatiran Obrazac projektnog zadatka (ako su samostalno pronašli firmu u kojoj rade praksu)</li>
                            <li>Po završetku prakse poslati izvješće o studentskoj praksi (slobodna forma, seminarski rad od cca. 15-ak stranica),</li>
                            <li>Poslati završno izvješće o praksi potpisano i opečaćeno od strane mentora i odgovorne osobe u poduzeću</li>
                            <li>Napraviti prezentaciju prakse u za to predviđenim terminima.</li>
                        </ol>
                        <p className="font-semibold">NAPOMENA: Termine obrana ćemo dogovoriti nakon obavljene prakse.</p>
                        <p>Studenti koji povezuju praksu i diplomski dužni su:</p>
                        <ol className="list-decimal list-inside">
                            <li>Prije početka obavljanja prakse dostaviti potpisan i pečatiran Sporazum o stručnoj praksi za aktualnu akademsku godinu i popunjen, potpisan i pečatiran Obrazac projektnog zadatka (ako su samostalno pronašli firmu u kojoj rade praksu)</li>
                            <li>Dogovoriti temu diplomskog rada s mentorom na Fakultetu (mentor mora odobriti temu),</li>
                            <li>Javiti nama da je to dogovoreno (mailom, u CC staviti profesora mentora),</li>
                            <li>Nakon završetka prakse (4 mjeseca) poslati završno izvješće o praksi potpisano i opečaćeno od strane mentora i odgovorne osobe u poduzeću (obrazac se nalazi u dokumentima).</li>
                            <li> Nakon što mentor odobri diplomski rad (završnu verziju) diplomskog rada poslati ju nekome od nastavnika angažiranih na praksi (nije potrebno predati izvješće u formi seminarskog rada nego se diplomski rad podrazumijeva kao izvješće).</li>
                        </ol>
                    </div>

                    <h2 className="text-xl font-semibold mt-10 mb-4">Materijali za studente</h2>
                    <div className="space-y-3 max-w-2xl">
                        {materials.map((material, index) => (
                            <div key={index} className="flex items-center p-4 border border-gray-300 rounded bg-gray-50">
                                <img className="w-6 h-6 mr-3" src={assets.dokk} alt="Dokument Ikona" />
                                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {material.name}
                                </a>
                            </div>
                        ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-10 mb-4">Predajte vaše dokumente</h2>
                    <h2 className="text-xl font-semibold mt-10 mb-4">Predajte vaše dokumente</h2>

                    <div className="w-full max-w-2xl p-6 border border-gray-300 rounded bg-gray-50 space-y-5">
                    <h2 className="text-lg font-medium text-gray-700">Dodajte dokumente</h2>

                    <UploadDokument type="sporazum" label="Sporazum o stručnoj praksi" />
                    <UploadDokument type="opz" label="Obrazac projektnog zadatka" />
                    <UploadDokument type="izvjesce" label="Izvješće o studentskoj praksi" />
                    <UploadDokument type="zavrsno" label="Završno izvješće" />
                    <UploadDokument type="poster" label="Poster" />
                    <UploadDokument type="prezentacija" label="Prezentacija" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dokumenti;
