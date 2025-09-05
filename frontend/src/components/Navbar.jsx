import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-white shadow-2xl py-4 px-2' >
            <div className='flex items-center justify-between max-w-[1100px] mx-auto ' >
                <Link to={'/'} >
                    <h1 className='text-xl sm:text-3xl' >Lead Management</h1>
                </Link>

                <div className='flex items-center ' >
                    <div >
                        <Link className='mr-5 text-gray-700 font-semibold ' to={'/'} > Home </Link>
                    </div>

                    <div className='bg-blue-200 px-3 py-2 text-blue-700 font-semibold cursor-pointer rounded hover:bg-blue-200 hover:text-blue-900 ' >
                        <Link to={'/dashboard'} > Dashboard </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar