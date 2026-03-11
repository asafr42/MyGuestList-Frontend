import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

export default function AddGuestForm({ onAdd }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        side: 'Groom',
        category: 'Friends',
        invitedCount: 1,
        status: 'Pending'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'invitedCount' ? Number(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        // Reset Form
        setFormData({
            ...formData,
            firstName: '',
            lastName: '',
            phone: '',
            invitedCount: 1,
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                    <UserPlus size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Add Guest</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">First Name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Last Name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="Doe" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Side</label>
                        <select name="side" value={formData.side} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors">
                            <option value="Groom">Groom</option>
                            <option value="Bride">Bride</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors">
                            <option value="Family">Family</option>
                            <option value="Friends">Friends</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Party Size (Invited)</label>
                    <input required type="number" min="1" name="invitedCount" value={formData.invitedCount} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors" />
                </div>

                <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 mt-4">
                    Add to Guest List
                </button>
            </form>
        </div>
    );
}
