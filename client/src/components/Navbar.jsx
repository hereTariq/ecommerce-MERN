import React, { useState } from 'react';
import UserPic from '../assets/react.svg';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    return (
        <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink href="/" className="flex items-center">
                    <img
                        src={UserPic}
                        className="h-8 mr-3"
                        alt="website Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        ECO
                    </span>
                </NavLink>
                <div className="flex items-center md:order-2">
                    <button
                        type="button"
                        className={`${
                            !isLoggedIn && 'hidden'
                        } flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 `}
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                        onClick={(e) => setIsUserOpen(!isUserOpen)}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://images.pexels.com/photos/18503562/pexels-photo-18503562/free-photo-of-young-woman-immersed-in-a-lake-among-the-reeds.jpeg"
                            alt="user photo"
                        />
                    </button>

                    <div
                        className={`absolute top-16  z-50 ${
                            isLoggedIn && isUserOpen ? 'block' : 'hidden'
                        } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow`}
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 ">
                                username
                            </span>
                            <span className="block text-sm  text-gray-500 truncate ">
                                name@gmail.com
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                    Settings
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 "
                                    onClick={(e) => {
                                        setIsLoggedIn(false);
                                        navigate('/login');
                                    }}
                                >
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                    <NavLink
                        to="/login"
                        className={`text-black hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:ml-4 px-4 py-2 text-center mr-3 md:mr-0 ${
                            isLoggedIn && 'hidden'
                        } `}
                    >
                        Login
                    </NavLink>

                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                        onClick={(e) => setIsHamburgerOpen(!isHamburgerOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between ${
                        !isHamburgerOpen && 'hidden'
                    } w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-blue-700 md:p-0 hover:bg-gray-100 "
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
