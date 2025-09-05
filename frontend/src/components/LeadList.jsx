import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Mail, Phone, Building, Briefcase, Users, Download, Search, Filter, Eye, Trash2 } from 'lucide-react';
import { deleteLead, getLeads, updateLeadStatus } from '../api/leadsApi';
import { differenceInHours, format, formatDistanceToNow } from 'date-fns'



const LeadList = () => {
    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [source, setSource] = useState('all')

    const [open, setOpen] = useState(false);

    const fetch = async () => {
        setLoading(true)
        try {
            const res = await getLeads({ search, status, source })
            setLeads(res.data || [])
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [search, status, source])

    const changeLeadStatus = async (id, status) => {
        try {
            await updateLeadStatus(id, status);
            fetch()
        } catch (error) {
            console.log(error);
        }
    };

    const deleteLeadHandler = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this lead?");
        if (!confirmed) return;

        try {
            await deleteLead(id);
            fetch()
        } catch (error) {
            console.log(error);
        }
    };

    console.log(leads);

    return (

        <div className="bg-white rounded-xl shadow-lg py-8 border border-gray-100 my-8 min-h-[80vh]  ">

            <div className='sm:flex sm:justify-between px-8' >
                <div className='flex items-center' >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900' >Lead Database</h1>
                        <p className='text-sm text-gray-600' >0 total leads</p>
                    </div>
                </div>

                <div className='mt-4 sm:mt-0 '>
                    <button className="flex items-center px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 w-full " >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className='grid sm:grid-cols-5 gap-5 mt-7 px-8 ' >

                <div className=' relative flex items-center sm:col-span-3 ' >
                    <Search className="absolute left-2 top-1/2 -translate-y-[50%] w-4 h-4 text-gray-400" />
                    <input type="text" placeholder='Search Leads'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='pl-8 py-2 w-[100%] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500  outline-none' />
                </div>

                <div className=' sm:grid sm:grid-cols-2 sm:col-span-2 sm:gap-5 space-y-5 sm:space-y-0 ' >

                    <div className='' >
                        <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            value={status}
                            onChange={(e) => setSearch(e.target.value)}
                        >

                            <option value="all">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                        </select>
                    </div>

                    <div className='' >
                        <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        >
                            <option value="all"> All Source </option>
                            <option value="website"> Website </option>
                            <option value="ad"> Add </option>
                            <option value="referral"> Referral </option>
                            <option value="social media"> Social Media </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>

                </div>

            </div>

            {/* divider  */}
            <div className='w-full h-[1px] bg-gray-200 mt-5 ' ></div>

            {
                loading ? (
                    <div>loading...</div>
                )
                    :
                    leads.length == 0 ? (
                        <div className='text-center py-20' >
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
                            <p className="text-gray-600">Start by capturing your first lead using the form above.</p>
                        </div>
                    )
                        :
                        leads.length > 0 && leads.map((lead, index) => (
                            <div className="p-6" key={index} >
                                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">

                                    <div className="flex items-start justify-between">

                                        <div className="flex-1">

                                            <div className="flex items-center mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {lead.firstName} {lead.lastName}
                                                </h3>
                                                <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full 
                                            ${lead.status == 'new' && 'bg-yellow-100 text-yellow-700 '} 
                                            ${lead.status == 'contacted' && 'bg-blue-200 text-blue-600'} 
                                            ${lead.status == 'converted' && 'bg-green-100 text-green-600'}
                                            ${lead.status == 'lost' && 'bg-red-100 text-red-500'}
                                            `}  >
                                                    {lead.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center">
                                                    <Mail className="w-4 h-4 mr-2" />
                                                    {lead.email}
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {lead.phone}
                                                </div>
                                                <div className="flex items-center">
                                                    <Building className="w-4 h-4 mr-2" />
                                                    {lead.company}
                                                </div>
                                                <div className="flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-2" />
                                                    {lead.job_title}
                                                </div>
                                            </div>

                                            <div className="sm:flex sm:items-center gap-2 text-sm text-gray-500">

                                                <div className='flex items-center' >
                                                    <Filter className="w-4 h-4 mr-1" />
                                                    <p>
                                                        Source: {lead.source.charAt(0).toUpperCase() + lead.source.slice(1)}
                                                    </p>
                                                </div>

                                                <div className='mt-2 sm:mt-0' >• Created: {
                                                    lead.createdAt
                                                        ? differenceInHours(new Date(), new Date(lead.createdAt)) < 24
                                                            ? (formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })
                                                                .includes("less than a minute")
                                                                ? "Now"
                                                                : formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true }))
                                                            : format(new Date(lead.createdAt), "MMM d, yyyy")
                                                        : "Unknown"
                                                }
                                                </div>

                                            </div>

                                        </div>

                                        <div className="ml-4 flex flex-col space-y-2">

                                            <select
                                                value={lead.status}
                                                onChange={(e) => changeLeadStatus(lead._id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="converted">Converted</option>
                                                <option value="lost">Lost</option>
                                            </select>

                                            <div className="flex space-x-1">
                                                <button
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                                                    title="View details"
                                                    onClick={() => setOpen(!open)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteLeadHandler(lead._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                                                    title="Delete lead"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={`mt-3 ${lead.message && 'p-3'} bg-gray-50 rounded-lg`} >
                                        <p className="text-sm text-gray-700"> {lead.message} </p>
                                    </div>

                                </div>
                            </div>
                        ))
            }

            {/* modal  */}

            {
                open &&
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-gray-50/40 flex items-center justify-center p-4 z-50">

                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <p className="text-gray-900">Carl Johnson</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full`}>
                                        New
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-gray-900"> carl@gmail.com </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <p className="text-gray-900">+91 99999999</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <p className="text-gray-900">Carl Finance</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <p className="text-gray-900"> Software Enginner </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                    <p className="text-gray-900"> Website </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                                    <p className="text-gray-900"> Now </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-gray-900"> take that Lead </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>

    )
}

export default LeadList