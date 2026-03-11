import React from 'react';
import { Mail, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        {
            title: 'Total Invited',
            value: stats.totalInvited,
            icon: <Mail className="text-primary-500" size={24} />,
            bgColor: 'bg-primary-50',
            borderColor: 'border-primary-100',
        },
        {
            title: 'Total Confirmed',
            value: stats.totalConfirmed,
            icon: <CheckCircle className="text-emerald-500" size={24} />,
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
        },
        {
            title: 'Pending Replies',
            value: stats.totalInvited - stats.totalConfirmed,
            icon: <Clock className="text-amber-500" size={24} />,
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
                <div key={idx} className={`glass ${card.bgColor} ${card.borderColor} rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 transition-transform hover:scale-105 duration-300`}>
                    <div className="flex items-center space-x-3">
                        {card.icon}
                        <h3 className="text-lg font-medium text-gray-700">{card.title}</h3>
                    </div>
                    <p className="text-4xl font-extrabold text-gray-900">{card.value}</p>
                </div>
            ))}
        </div>
    );
}
