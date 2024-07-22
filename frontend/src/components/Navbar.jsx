import React from 'react';
import { NavLink } from 'react-router-dom';

// Budget Page

const Navbar = () => {

    const linkClass = ({ isActive }) => isActive 
    ? 'text-white bg-pink-500 hover:bg-pink-700 hover:text-white rounded-md px-3 py-2' 
    : 'text-white bg-black hover:bg-pink-300 hover:text-black rounded-md px-3 py-2';

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black border-b border-pink-700 z-50">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        {/* <!-- Logo --> */}
                        {/* <NavLink>
                        </NavLink> */}
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <NavLink
                                    to="/form"
                                    className={linkClass}
                                >
                                    Record Transaction
                                </NavLink>
                                <NavLink
                                    to="/history"
                                    className={linkClass}
                                >
                                    History
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;