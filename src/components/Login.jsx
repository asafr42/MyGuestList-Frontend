import React, { useState } from 'react';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import axios from 'axios';
import loginBg from '../assets/login-bg.png';

const Auth = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const res = await axios.post(endpoint, { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.email);
            onLogin(res.data.token, res.data.email);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Login Card */}
            <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white mb-2">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-300">
                        {isRegister ? 'Register to start managing your guest list' : 'Sign in to manage your guest list'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 sm:text-sm outline-none transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-white/50 sm:text-sm outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 text-red-300 text-sm px-4 py-2 rounded-lg border border-red-400/30">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    >
                        {isRegister ? <UserPlus size={18} /> : <LogIn size={18} />}
                        {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => { setIsRegister(!isRegister); setError(''); }}
                        className="text-sm text-blue-300 hover:text-white hover:underline transition-colors"
                    >
                        {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
