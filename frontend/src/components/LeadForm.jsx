import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import { createLead } from '../api/leadsApi';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Building, Briefcase, MessageSquare, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const leadShcema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.email('Invalid email'),
    phone: z.string().min(7).max(15).regex(/^\d+$/, 'Digits only'),
    company: z.string().min(1, 'Company Name is required'),
    job_title: z.string().min(1, 'Job Title is required'),
    message: z.string().max(500).optional(),
    source: z.enum(['website', 'ad', 'referral', 'social media', 'other'])
});


const LeadForm = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(leadShcema) });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); 

    const onSubmit = async (values) => {

        const toastId = toast.loading('Please wait...')
        try {
            const result = await createLead(values)
            toast.success('Lead created', { id: toastId }) 
            navigate('/dashboard')
            reset()
        } catch (err) {
            console.error(err)
            toast.error('Failed to create lead')
        }
    };

    const inputClasses = () => `
    w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none
  `;

    const leadSources = [
        'website',
        'ad',
        'referral',
        'Referral',
        'social media',
        'other',
    ];

    return (

        <div className='max-w-[1100px] mx-auto px-2' >

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 my-8 border border-gray-100  ">

                <div className='flex items-center gap-2 ' >
                    <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center' >
                        <Plus className='' />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 ">Create New Lead</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name *</label>

                        <div className='relative mt-2' >
                            <User className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('firstName')}
                                className={`${inputClasses} ${errors.firstName ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter First Name'
                            />
                        </div>

                        <p className="text-xs text-red-500">{errors.firstName?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Last Name *</label>

                        <div className='relative mt-2' >
                            <User className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('lastName')}
                                className={`${inputClasses} ${errors.firstName ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter Last Name'
                            />
                        </div>
                        <p className="text-xs text-red-500">{errors.lastName?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Email Address</label>
                        <div className='relative mt-2' >
                            <Mail className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('email')}
                                className={`${inputClasses} ${errors.firstName ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter Email Address'
                            />
                        </div>
                        <p className="text-xs text-red-500">{errors.email?.message}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Phone Number*</label>
                        <div className='relative mt-2' >
                            <Phone className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('phone')}
                                className={`${inputClasses} ${errors.firstName ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter Phone Number'
                            />
                        </div>
                        <p className="text-xs text-red-500">{errors.phone ? 'Phone Numer is Required' : ''}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Company*</label>
                        <div className='relative mt-2' >
                            <Building className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('company')}
                                className={`${inputClasses} ${errors.company ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter Comapny Name'
                            />
                        </div>
                        <p className="text-xs text-red-500">{errors.company ? 'Company Name is Required' : ''}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Job Title*</label>
                        <div className='relative mt-2' >
                            <Briefcase className="absolute top-1/2 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <input {...register('job_title')}
                                className={`${inputClasses} ${errors.job_title ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Enter Job Title'
                            />
                        </div>
                        <p className="text-xs text-red-500">{errors.job_title ? 'Job Title is Required' : ''}</p>
                    </div>

                    <div>
                        <label className="block text-sm">Lead Source *</label>
                        <select
                            {...register('source')}
                            className={`${inputClasses} !pl-2 mt-2 ${errors.firstName ? 'border-red-400 bg-red-50' : 'bg-white'} `}>

                            <option value='' className='' > Select Lead Source </option>
                            <option value='website'> Website  </option>
                            <option value='ad'> Ad  </option>
                            <option value='referral'> Referral  </option>
                            <option value='social media'> Social Media  </option>
                            <option value='other'> Other  </option>

                        </select>
                        <p className="text-xs text-red-500">{errors.source ? 'Source is required' : ''}</p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm">Note (optional)</label>
                        <div className='relative mt-2' >
                            <MessageSquare className="absolute top-7 left-2 -translate-y-[50%] w-5 h-5 text-gray-400" />
                            <textarea {...register('message')}
                                className={`${inputClasses} ${errors.message ? 'border-red-400 bg-red-50' : 'bg-white'} `}
                                placeholder='Additional Notes, about this lead'
                                rows="4" />
                        </div>
                        <p className="text-xs text-red-500">{errors.message?.message}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-4">

                    <input type="submit"
                        className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer'
                        value={`${isLoading ? "Saving..." : "Submit"}`} disabled={isLoading} />
                </div>
            </form>

        </div>
    )
}

export default LeadForm