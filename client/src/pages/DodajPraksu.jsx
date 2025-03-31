import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 
import { assets, JobLocations } from '../assets/assets';

function DodajPraksu() {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Mostar');
    const [brojstudenata, setBrojstudenata] = useState(0);

    const editorRef = useRef(null);
    const quillInstance = useRef(null);
    const [isEdit,setIsEdit] = useState(false)
    const[OPZ,setOPZ] = useState(null)

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Unesite opis zadatka...',
            });
        }
    }, []);

    return (
        <form className="container flex flex-col w-full items-start gap-3 p-4 space-y-4">
            <div className='w-full'>
                <p className="font-medium w-full">Naziv Poduzeća</p>
                <input 
                    type="text" 
                    placeholder="Unesite naziv poduzeća"
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    required 
                    className="w-full max-w-lg px-3 py-2 border p-2 border-gray-300 rounded"
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className="my-2 font-medium">Opis Projektnog zadatka</p>
                <div ref={editorRef} className="border rounded h-40"></div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Lokacija</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location,index)=>(
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <p className='mb-2'>Broj potrebnih studenata</p>
                <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' onChange={e=> setBrojstudenata(e.target.value)} type="Number" placeholder='0' />
            </div>

            <div className='w-full max-w-lg p-4 border border-gray-300 rounded bg-gray-50'>
                <h2 className='text-lg font-medium text-gray-700 mb-3'>Obrazac projektnog zadatka</h2>
                <div className='flex items-center gap-3'>
                    <label className='cursor-pointer' htmlFor="OPZUpload">
                        <img className='w-10 h-10 opacity-70 hover:opacity-100 transition' src={assets.profile_upload_icon} alt="Upload" />
                        <input id='OPZUpload' onChange={e => setOPZ(e.target.files[0])} accept='application/pdf' type="file" hidden />
                    </label>
                    {OPZ && <span className='text-gray-600 text-sm'>{OPZ.name}</span>}
                </div>
            </div>

            <button className='w-28 py-3 mt-4 bg-gray-500 text-white rounded'>Dodajte</button>
        </form>
    );
}

export default DodajPraksu;