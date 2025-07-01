import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            // Replace with your actual authentication logic
            console.log('Signing in with:', { email, password, rememberMe });
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
            background: 'linear-gradient(315deg, hsla(154, 100%, 76%, 1) 0%, hsla(234, 100%, 83%, 1) 50%, hsla(288, 100%, 81%, 1) 100%)'
        }}>
            {/* Soft overlay for depth */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none z-0" />
            <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-xl border border-white/40" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                {/* Left: Animation */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-emerald-400/80 to-purple-400/80 relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                    <div className="flex flex-col items-center justify-center w-full h-full p-8 relative z-10">
                        <DotLottieReact
                            src="https://lottie.host/75ed4659-6fdf-40fb-8c00-41e3a0a12203/aR9wKCfIRt.lottie"
                            loop
                            autoplay
                            style={{ width: 320, height: 320, maxWidth: '100%' }}
                        />
                    </div>
                </div>
                {/* Right: Sign In Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white/70 p-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                                Sign in to your account
                            </h2>
                        </div>
                        {error && (
                            <div className="rounded-md bg-red-50 p-4 animate-pulse">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-xl shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left w-full">
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
                                        className="transition-all duration-200 mt-1 appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white/80 backdrop-blur"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left w-full">
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
                                        className="transition-all duration-200 mt-1 appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm bg-white/80 backdrop-blur"
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
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="/forgot-password" className="font-medium text-purple-500 hover:text-purple-400 transition-colors duration-150">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`transition-all duration-200 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                        <div className="mt-4 text-center">
                            <span className="text-gray-600 text-sm">
                                Are you new to this?{' '}
                                <button
                                    type="button"
                                    className="font-medium text-purple-500 hover:text-purple-400 underline bg-transparent border-none cursor-pointer transition-colors duration-150"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </button>
                            </span>
                        </div>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/80 text-gray-500 backdrop-blur">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                {/* Google */}
                                <a
                                    href="#"
                                    className="transition-all duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    <span className="sr-only">Sign in with Google</span>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a
                                    href="#"
                                    className="transition-all duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg className="w-6 h-6" fill="#1877F3" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                                    </svg>
                                </a>
                                {/* Apple */}
                                <a
                                    href="#"
                                    className="transition-all duration-200 w-12 h-12 flex items-center justify-center rounded-full shadow bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                >
                                    <span className="sr-only">Sign in with Apple</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07zm4.7 13.13c-.06-3.36 2.74-4.97 2.86-5.05-1.56-2.28-3.98-2.6-4.84-2.63-2.06-.21-4.02 1.2-5.07 1.2-1.05 0-2.67-1.17-4.4-1.14-2.26.03-4.36 1.32-5.52 3.36-2.36 4.09-.6 10.14 1.68 13.47 1.12 1.62 2.44 3.44 4.18 3.38 1.68-.07 2.32-1.09 4.36-1.09 2.04 0 2.6 1.09 4.38 1.06 1.82-.03 2.96-1.65 4.06-3.28 1.29-1.89 1.82-3.72 1.84-3.81-.04-.02-3.53-1.36-3.59-5.41z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;