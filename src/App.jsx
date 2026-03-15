import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import SmartTable from './components/SmartTable';
import AddGuestForm from './components/AddGuestForm';
import Login from './components/Login';
import { Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/guests';

function App() {
    const [guests, setGuests] = useState([]);
    const [stats, setStats] = useState({ totalInvited: 0, totalConfirmed: 0, totalDeclined: 0 });
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('email') || '');

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
        try {
            setLoading(true);
            const [guestsRes, statsRes] = await Promise.all([
                axios.get(API_URL, authHeaders),
                axios.get(`${API_URL}/stats`, authHeaders)
            ]);
            setGuests(guestsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
            if (error.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchData();
        else setLoading(false);
    }, [token]);

    const handleLogin = (newToken, email) => {
        setToken(newToken);
        setUserEmail(email);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setToken(null);
        setUserEmail('');
        setGuests([]);
    };

    const handleAddGuest = async (newGuest) => {
        try {
            await axios.post(API_URL, newGuest, authHeaders);
            fetchData();
        } catch (error) {
            console.error("Failed to add guest", error);
        }
    };

    const handleUpdateGuest = async (id, updatedData) => {
        try {
            await axios.put(`${API_URL}/${id}`, updatedData, authHeaders);
            fetchData();
        } catch (error) {
            console.error("Failed to update guest", error);
        }
    };

    if (!token) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <header className="bg-primary-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={32} />
                        <h1 className="text-3xl font-bold tracking-tight">MyGuestList</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-white/70 hidden sm:block">{userEmail}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-white text-primary-600 hover:bg-gray-50 focus:outline-none transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <>
                        <Dashboard stats={stats} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 border-r border-gray-200 pr-0 lg:pr-8">
                                <AddGuestForm onAdd={handleAddGuest} />
                            </div>
                            <div className="lg:col-span-2">
                                <SmartTable guests={guests} onUpdate={handleUpdateGuest} />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;

