import React, { useMemo } from 'react'
import { TrendingUp, Users, Phone, CheckCircle, XCircle } from 'lucide-react';



const LeadStats = ({ leads }) => {

    const stats = useMemo(() => {
        const total = leads.length;
        const newLeads = leads.filter(l => l.status === 'new').length;
        const contacted = leads.filter(l => l.status === 'contacted').length;
        const converted = leads.filter(l => l.status === 'converted').length;
        const lost = leads.filter(l => l.status === 'lost').length;

        const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : '0.0';

        return { total, newLeads, contacted, converted, lost, conversionRate };
    }, [leads]);

    const statCards = [
        {
            title: 'Total Leads',
            value: stats.total,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'New Leads',
            value: stats.newLeads,
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Contacted',
            value: stats.contacted,
            icon: Phone,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            title: 'Converted',
            value: stats.converted,
            icon: CheckCircle,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100'
        },
        {
            title: 'Lost',
            value: stats.lost,
            icon: CheckCircle,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100'
        },
        {
            title: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        }
    ];


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

