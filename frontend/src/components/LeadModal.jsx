import { Save } from 'lucide-react';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateLeadDetails } from '../api/leadsApi';

const LeadModal = ({ lead, setOpen, onUpdate }) => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: lead
    });

    useEffect(() => {
        reset(lead);
    }, [lead, reset]);

    const inputClasses = () => `
    w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none
  `;

    const onSubmit = async (data) => {
        try {
            const toastId = toast.loading('please wait...')
            const res = await updateLeadDetails(lead._id, data);
            console.log(res)
            toast.success("Lead updated!", { id: toastId });
            onUpdate();
            setOpen(false)
        } catch (err) {
            console.error(err);
            toast.error("Failed to update lead");
        }
    };


    return (
        <div className="fixed inset-0 bg-gray-50/40 flex items-center justify-center p-4 z-50">

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-auto">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input {...register("firstName", { required: "First name is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none "
                                />
                                <p className="text-xs text-red-500">{errors.firstName?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input {...register("lastName", { required: "Last name is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-red-500">{errors.lastName?.message}</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input {...register("email", { required: "Email is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-red-500">{errors.email?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input {...register("phone", { required: "Phone Number is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-red-500">{errors.phone?.message}</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input {...register("company", { required: "Company name is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-red-500">{errors.company?.message}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input {...register("job_title", { required: "Job Title is required" })}
                                    className="mt-1 block w-full border px-3 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none"
                                />
                                <p className="text-xs text-red-500">{errors.job_title?.message}</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                <select
                                    {...register("source")}
                                    className={`w-full pl-2 py-3 border rounded-lg transition-all duration-200 ease-in-out border-gray-300 focus:outline-none `}
                                >
                                    <option value="website">Website</option>
                                    <option value="ad">Ad</option>
                                    <option value="referral">Referral</option>
                                    <option value="social media">Social Media</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <textarea {...register('message')}
                                    className={`w-full  field-sizing-content resize rounded-lg transition-all duration-200 ease-in-out  focus:outline-none`}
                                    placeholder='Additional Notes, about this lead'
                                    rows="4" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mx-6 mb-4  ">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default LeadModal