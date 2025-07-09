import React from 'react';
import Lottie from "lottie-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/auth';
import { setSession } from '../api/authSession';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const data = await signin({ email, password });
            // Store session info (e.g., JWT or session object)
            setSession(data.data?.session || {});
            navigate('/classes');
        } catch (err) {
            setError(err.message || 'Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 sm:px-4 py-6 sm:py-0" style={{
            background: '#FFF8E7'
        }}>
            {/* Soft overlay for depth */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none z-0" />
            <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-xl border border-white/40 mx-auto" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                {/* Left: Animation */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-emerald-400/80 to-purple-400/80 relative min-h-[180px]">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 md:p-8 relative z-10">
                        <Lottie
                            src="https://lottie.host/75ed4659-6fdf-40fb-8c00-41e3a0a12203/aR9wKCfIRt.lottie"
                            loop
                            autoplay
                            style={{ width: 200, height: 200, maxWidth: '100%' }}
                        />
                    </div>
                </div>
                {/* Right: Sign In Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white/70 p-4 sm:p-8">
                    <div className="max-w-md w-full space-y-6 sm:space-y-8">
                        <div className="text-center">
                            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                                Sign in to your account
                            </h2>
                        </div>
                        {error && (
                            <div className="rounded-md bg-red-50 p-3 sm:p-4 animate-pulse">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-xs sm:text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit} autoComplete="off">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-xl shadow-sm space-y-3 sm:space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left w-full">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="transition-all duration-200 mt-1 appearance-none block w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-xs sm:text-sm bg-white/80 backdrop-blur"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left w-full">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="transition-all duration-200 mt-1 appearance-none block w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-xs sm:text-sm bg-white/80 backdrop-blur"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-emerald-500 focus:ring-emerald-400 border-gray-300 rounded transition-all duration-200"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`transition-all duration-200 group relative w-full flex justify-center py-2 px-4 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : 'Sign in'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-3 sm:mt-4 text-center">
                            <span className="text-gray-600 text-xs sm:text-sm">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="font-medium text-purple-500 hover:text-purple-400 underline bg-transparent border-none cursor-pointer transition-colors duration-150"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </button>
                            </span>
                        </div>
                        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600 break-words">
                            Facing issue with signin? Contact <a href="mailto:gauravbshet08@gmail.com" className="text-purple-500 underline">gauravbshet08@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;