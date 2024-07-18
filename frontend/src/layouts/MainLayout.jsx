import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="mt-20"> {/* Add top margin here */}
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout
