import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-white shadow-2xl py-4 px-2' >
            <div className='flex items-center justify-between max-w-[1100px] mx-auto ' >
                <h1 className='text-3xl' >Lead Management</h1>

                <div >
                    <Link className='mr-5' to={'/'} > Home </Link>
                    <Link to={'/dashboard'} > Dashboard </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar