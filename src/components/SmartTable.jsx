import React, { useState } from 'react';
import { Filter, Search, Edit2 } from 'lucide-react';

export default function SmartTable({ guests, onUpdate }) {
    const [filterSide, setFilterSide] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const filteredGuests = guests.filter(guest => {
        const matchSide = filterSide === 'All' || guest.side === filterSide;
        const matchStatus = filterStatus === 'All' || guest.status === filterStatus;
        const matchSearch = guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guest.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchSide && matchStatus && matchSearch;
    });

    const handleEditClick = (guest) => {
        setEditingId(guest._id);
        setEditFormData({
            firstName: guest.firstName,
            lastName: guest.lastName,
            phone: guest.phone,
            invitedCount: guest.invitedCount,
            confirmedCount: guest.confirmedCount,
            status: guest.status,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        let updates = { [name]: name === 'invitedCount' || name === 'confirmedCount' ? Number(value) : value };
        
        if (name === 'status') {
            if (value === 'Confirmed') {
                updates.confirmedCount = editFormData.invitedCount;
            } else if (value === 'Declined' || value === 'Pending') {
                updates.confirmedCount = 0;
            }
        }
        
        setEditFormData({
            ...editFormData,
            ...updates
        });
    };

    const handleSaveClick = (id) => {
        onUpdate(id, editFormData);
        setEditingId(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    Guest List <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-xs">{filteredGuests.length} Guests</span>
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search guests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>

                    <select
                        value={filterSide}
                        onChange={(e) => setFilterSide(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                        <option value="All">All Sides</option>
                        <option value="Groom">Groom</option>
                        <option value="Bride">Bride</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Declined">Declined</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="py-4 px-6 font-medium">Name</th>
                            <th className="py-4 px-6 font-medium">Side</th>
                            <th className="py-4 px-6 font-medium">Phone</th>
                            <th className="py-4 px-6 font-medium text-center">Invited / Confirmed</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                        {filteredGuests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500 italic">No guests found.</td>
                            </tr>
                        ) : filteredGuests.map((guest) => (
                            <tr key={guest._id} className="hover:bg-primary-50/50 transition-colors">
                                <td className="py-4 px-6 font-medium text-gray-900">
                                    {editingId === guest._id ? (
                                        <div className="flex gap-2">
                                            <input name="firstName" value={editFormData.firstName} onChange={handleEditChange} className="w-20 border rounded px-2 py-1" />
                                            <input name="lastName" value={editFormData.lastName} onChange={handleEditChange} className="w-20 border rounded px-2 py-1" />
                                        </div>
                                    ) : (
                                        `${guest.firstName} ${guest.lastName}`
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 py-1 text-xs rounded-md ${guest.side === 'Groom' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                        {guest.side}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-gray-600">
                                    {editingId === guest._id ? (
                                        <input name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-24 border rounded px-2 py-1" />
                                    ) : (guest.phone)}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editingId === guest._id ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <input type="number" name="invitedCount" value={editFormData.invitedCount} onChange={handleEditChange} className="w-12 border rounded px-1 py-1 text-center" />
                                            <span className="text-gray-400">/</span>
                                            <input type="number" name="confirmedCount" value={editFormData.confirmedCount} onChange={handleEditChange} className="w-12 border rounded px-1 py-1 text-center" />
                                        </div>
                                    ) : (
                                        <span className="font-semibold bg-gray-100 px-3 py-1 rounded-full"><span className="text-gray-500">{guest.invitedCount}</span> <span className="text-gray-300 mx-1">|</span> <span className={guest.confirmedCount > 0 ? 'text-primary-600' : 'text-gray-500'}>{guest.confirmedCount}</span></span>
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    {editingId === guest._id ? (
                                        <select name="status" value={editFormData.status} onChange={handleEditChange} className="border rounded py-1 px-2 text-sm">
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Declined">Declined</option>
                                        </select>
                                    ) : (
                                        <select 
                                            value={guest.status} 
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                let newConfirmedCount = guest.confirmedCount;
                                                if (newStatus === 'Confirmed') {
                                                    newConfirmedCount = guest.invitedCount;
                                                } else if (newStatus === 'Declined' || newStatus === 'Pending') {
                                                    newConfirmedCount = 0;
                                                }
                                                onUpdate(guest._id, { ...guest, status: newStatus, confirmedCount: newConfirmedCount });
                                            }}
                                            className={`px-2 py-1 text-xs font-bold rounded-full border-none cursor-pointer focus:outline-none focus:ring-2 appearance-none 
                                                ${guest.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 focus:ring-emerald-500' :
                                                guest.status === 'Declined' ? 'bg-red-100 text-red-700 focus:ring-red-500' :
                                                'bg-amber-100 text-amber-700 focus:ring-amber-500'}`
                                            }
                                        >
                                            <option value="Pending" className="bg-white text-gray-800">Pending</option>
                                            <option value="Confirmed" className="bg-white text-gray-800">Confirmed</option>
                                            <option value="Declined" className="bg-white text-gray-800">Declined</option>
                                        </select>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editingId === guest._id ? (
                                        <button onClick={() => handleSaveClick(guest._id)} className="text-sm bg-primary-600 text-white px-3 py-1 rounded shadow hover:bg-primary-700 transition">Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(guest)} className="text-gray-400 hover:text-primary-600 transition-colors p-1" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
