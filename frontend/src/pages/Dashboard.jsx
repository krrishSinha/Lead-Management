import React, { useState } from 'react'
import LeadList from '../components/LeadList'
import LeadStats from '../components/LeadStats'

const Dashboard = () => {

    const [leads, setLeads] = useState([])

    const handleSetLeads = (data)=>{
        setLeads(data)
    }

    return (
        <div className='max-w-[1100px] mx-auto px-2 mt-10 ' >
        <LeadStats leads={leads} />
            <LeadList handleSetLeads={handleSetLeads} />
        </div>
    )
}

export default Dashboard