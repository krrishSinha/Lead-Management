import React from 'react'
import { TrendingUp, Users, Phone, CheckCircle, XCircle } from 'lucide-react';

const statCards = [
    {
        title: 'Total Leads',
        value: '0%',
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
    },
    {
        title: 'New Leads',
        value: '0%',
        icon: TrendingUp,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
    },
    {
        title: 'Contacted',
        value: '0%',
        icon: Phone,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
    },
    {
        title: 'Qualified',
        value: '0%',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
    },
    {
        title: 'Converted',
        value: '0%',
        icon: CheckCircle,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100'
    },
    {
        title: 'Conversion Rate',
        value: `0.0%`,
        icon: TrendingUp,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
    }
];

// const conversionRate = stats.total > 0 ? ((stats.converted / stats.total) * 100).toFixed(1) : '0.0';    
// const conversionRate = '0.0'

const LeadStats = () => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {statCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                <IconComponent className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default LeadStats

