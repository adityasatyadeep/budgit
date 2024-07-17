import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'


// Budget Page
// 

const Navbar = () => {

    const linkClass = ({isActive}) => isActive 
    ? 'text-black bg-pink-600 hover:bg-pink-900 hover:text-white rounded-md px-3 py-2' 
    : 'text-white bg-black hover:bg-pink-900 hover:text-white rounded-md px-3 py-2'
  
    return (
        <nav className="bg-black border-b border-pink-700">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div
                className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
              >
                {/* <!-- Logo --> */}
                <NavLink>
                </NavLink>
                <div className="md:ml-auto">
                  <div className="flex space-x-2">
                    <NavLink
                      to="/form"
                      className = {linkClass}
                    >Form
                    </NavLink>
                    <NavLink
                      to="/history"
                      className = {linkClass}
                    >History
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
}

export default Navbar