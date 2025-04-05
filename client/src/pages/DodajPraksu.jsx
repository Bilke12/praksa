import React, { useContext, useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 
import { assets, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function DodajPraksu() {
    const [title, setTitle] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [location, setLocation] = useState('');
    const [brojstudenata, setBrojstudenata] = useState(0);
    const [OPZ, setOPZ] = useState(null); // Drži odabranu datoteku
    const [loading, setLoading] = useState(false); 
    const [studij, setStudij] = useState('');


    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const { backendUrl, companyToken } = useContext(AppContext);

    // Obrađivač za slanje forme
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Aktiviraj učitavanje

        try {
            const description = quillRef.current.root.innerHTML;

            let fileUrl = ''; // pohranita URL iz Cloudinary-a

            // Ako postoji datoteka, pošaljemo je na Cloudinary
            if (OPZ) {
                const formData = new FormData();
                formData.append('file', OPZ);
                formData.append('upload_preset', 'ml_default'); 
                const response = await axios.post('https://api.cloudinary.com/v1_1/dcbkvfpno/upload', formData);
                fileUrl = response.data.secure_url; // Spremi link na datoteku
            }

            // Pošaljemo sve podatke u backend
            const { data } = await axios.post(
                backendUrl + '/api/company/post-job',
                { title, projectTitle, description, location, studij, brojstudenata, OPZFileUrl: fileUrl }, // Pošaljemo URL datoteke
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setProjectTitle('');
                setBrojstudenata(0);
                setOPZ(null); // Resetiraj odabranu datoteku
                quillRef.current.root.innerHTML = ''; 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false); // Završimo s učitavanjem
        }
    };

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Unesite opis zadatka...',
            });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className="container flex flex-col w-full items-start gap-3 p-4 space-y-4">
            <div className="w-full">
                <p className="font-medium w-full">Naziv poduzeća</p>
                <input 
                    type="text" 
                    placeholder="Unesite naziv poduzeća"
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    required 
                    className="w-full max-w-lg px-3 py-2 border p-2 border-gray-300 rounded"
                />
            </div>

            <div className="w-full">
                <p className="font-medium w-full">Naziv projektnog Zadatka</p>
                <input 
                    type="text" 
                    placeholder="Unesite naziv projektnog zadatka"
                    onChange={(e) => setProjectTitle(e.target.value)} 
                    value={projectTitle} 
                    required 
                    className="w-full max-w-lg px-3 py-2 border p-2 border-gray-300 rounded"
                />
            </div>

            <div className="w-full max-w-lg">
                <p className="my-2 font-medium">Opis projektnog zadatka</p>
                <div ref={editorRef} className="border rounded h-40"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
    <div className="w-full sm:w-[180px]">
        <p className="mb-2">Lokacija</p>
        <input 
            type="text" 
            placeholder="Unesite lokaciju" 
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
            value={location} 
            required
             />
            </div>
        </div>

            <div className="w-full">
            <p className="mb-2">Studij</p>
            <select 
                className="w-full px-3 py-2 border-2 sm:w-[180px] border-gray-300 rounded"
                onChange={(e) => setStudij(e.target.value)}
                value={studij}
                required
            >
                <option value="">Odaberi studij</option>
                <option value="Računarstvo">Računarstvo</option>
                <option value="Strojarstvo">Strojarstvo</option>
                <option value="Elektrotehnika">Elektrotehnika</option>
            </select>
            </div>



            <div>
                <p className="mb-2">Broj potrebnih studenata</p>
                <input min={0} className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" onChange={(e) => setBrojstudenata(Number(e.target.value))} type="Number" placeholder="0" />
            </div>

            <div className="w-full max-w-lg p-4 border border-gray-300 rounded bg-gray-50">
                <h2 className="text-lg font-medium text-gray-700 mb-3">Obrazac projektnog zadatka</h2>
                <div className="flex items-center gap-3">
                    <label className="cursor-pointer" htmlFor="OPZUpload">
                        <img className="w-10 h-10 opacity-70 hover:opacity-100 transition" src={assets.profile_upload_icon} alt="Upload" />
                        <input id="OPZUpload" onChange={e => setOPZ(e.target.files[0])} accept="application/pdf" type="file" hidden />
                    </label>
                    {OPZ && <span className="text-gray-600 text-sm">{OPZ.name}</span>}
                </div>
            </div>

            <button className="w-28 py-3 mt-4 bg-gray-500 text-white rounded" disabled={loading}>
                {loading ? 'Učitavanje...' : 'Dodajte'}
            </button>
        </form>
    );
}

export default DodajPraksu;
