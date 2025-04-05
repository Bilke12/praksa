import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'


function Dashboard() {

    const navigate = useNavigate()
    const {companyData, setCompanyData, setCompanyToken} = useContext(AppContext)
    //Funkcija za logout poduzeca

    const logout = ()=>{
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(()=>{
        if (companyData) {
            navigate('/dashboard/upravljajte-praksom')
        }
    },[companyData])

  return (
    <div className='min-h-screen'>

        <div className='shadow py-4'>
            <div className='px-5 flex justify-between items-center'>
                <img onClick={e => navigate('/')} className='max-sm:w-32 h-12 sm:h-16 cursor-pointer' src={assets.logo} alt="" />
                {companyData && (
                       
                <div className='flex items-center gap-3'>
                <p className='max-sm:hidden'>Dobrodošli, {companyData.name}</p>
                <div className='relative group'>
                    <img className='w-8 border rounded-full' src={companyData.image} alt="" />
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>
                                Odjava
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                )}
             
            </div>
        </div>

    <div className='flex items-start'>
        {/*Lijeva Strana */}
        <div className='inline-block min-h-screen border-r-2'>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/dodaj-praksu'}>
                    <img className='min-w-4' src={assets.add_icon} alt="" />
                    <p className='max-sm:hidden'>Dodajate praksu</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/upravljajte-praksom'}>
                    <img className='min-w-4' src={assets.home_icon} alt="" />
                    <p className='max-sm:hidden'>Upravljajte praksom</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/aplikanti'}>
                    <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                    <p className='max-sm:hidden'>Lista aplikanata</p>
                </NavLink>
            </ul>
        </div>

        <div className='flex-1 h-full p-2 sm:p-5'>
            <Outlet />
        </div>

    </div>

    </div>
  )
}

export default Dashboard