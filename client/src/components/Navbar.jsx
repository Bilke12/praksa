import React from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Navbar() {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const { setShowRecruiterLogin } = useContext(AppContext);

    return (
        <div className="shadow py-4 w-full bg-white">
            <div className="w-full px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="ml-4">
                    <img onClick={() => navigate('/')} className='cursor-pointer h-12 sm:h-16' src={assets.logo} alt="Logo" />
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Podnesene prijave */}
                            <Link to={'/prijave'} className="text-gray-600 hover:text-blue-600 text-sm sm:text-base">
                                Podnesene prijave
                            </Link>
                            <span className="hidden sm:block">|</span>
                            {/* Prikaz imena samo na većim ekranima */}
                            <p className="hidden sm:block text-gray-600">
                                Pozdrav, {user.firstName + " " + user.lastName}
                            </p>
                            <UserButton />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4 text-gray-600">
                            <button onClick={() => setShowRecruiterLogin(true)} className="text-sm">
                                Prijava-poduzeće
                            </button>
                            <span>|</span>
                            <button
                                onClick={() => openSignIn()}
                                className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base"
                            >
                                Prijava-student
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
