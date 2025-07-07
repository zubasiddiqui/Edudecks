
import { Book, Pen } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-[#D0F4DE] to-[#FDFFB6]">
            {/* Floating Study Elements Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Books */}
                <Book className="absolute top-20 left-16 w-12 h-12 text-green-600/30 rotate-12 animate-pulse" />
                <Book className="absolute top-40 right-20 w-8 h-8 text-blue-500/40 -rotate-12" />
                <Book className="absolute bottom-32 left-32 w-10 h-10 text-purple-500/30 rotate-45" />
                <Book className="absolute top-60 left-1/4 w-6 h-6 text-indigo-400/50 -rotate-6" />
                <Book className="absolute bottom-20 right-16 w-14 h-14 text-teal-500/25 rotate-30" />
                {/* Pens */}
                <Pen className="absolute top-32 right-1/3 w-10 h-10 text-orange-500/40 rotate-45 animate-pulse" />
                <Pen className="absolute bottom-40 left-20 w-8 h-8 text-red-400/35 -rotate-30" />
                <Pen className="absolute top-80 right-32 w-12 h-12 text-yellow-600/30 rotate-12" />
                <Pen className="absolute top-16 left-1/2 w-6 h-6 text-pink-500/45 -rotate-45" />
                <Pen className="absolute bottom-60 right-1/4 w-9 h-9 text-cyan-500/40 rotate-60" />
                {/* Additional scattered elements */}
                <Book className="absolute top-72 left-12 w-7 h-7 text-violet-400/35 rotate-90" />
                <Pen className="absolute bottom-16 left-1/3 w-11 h-11 text-emerald-500/30 -rotate-15" />
                <Book className="absolute top-44 right-12 w-9 h-9 text-amber-500/40 -rotate-30" />
                <Pen className="absolute bottom-72 right-40 w-7 h-7 text-rose-400/35 rotate-75" />
                <Book className="absolute top-96 left-40 w-8 h-8 text-sky-500/30 rotate-15" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="text-center max-w-4xl mx-auto px-6">
                    <h1 className="text-6xl font-bold mb-6 text-gray-800">Select Your Class</h1>
                    <p className="text-xl text-gray-600 mb-12">Choose your class to access tailored educational content and resources</p>
                    {/* Class Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Class 6 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                            <div className="bg-green-500 p-8 text-white">
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">6</span>
                                </div>
                                <h3 className="text-2xl font-bold">Class 6</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-6">
                                    Subjects and resources for Class 6 - Building strong foundations in core subjects
                                </p>
                                <button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                        {/* Class 7 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                            <div className="p-8 text-white" style={{ backgroundColor: '#00bbf9' }}>
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">7</span>
                                </div>
                                <h3 className="text-2xl font-bold">Class 7</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-6">
                                    Subjects and resources for Class 7 - Advancing knowledge and critical thinking
                                </p>
                                <button
                                    className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:opacity-90"
                                    style={{ backgroundColor: '#00bbf9' }}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                        {/* Class 8 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                            <div className="p-8 text-gray-800" style={{ backgroundColor: '#98f5e1' }}>
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold">8</span>
                                </div>
                                <h3 className="text-2xl font-bold">Class 8</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-6">
                                    Subjects and resources for Class 8 - Preparing for advanced concepts
                                </p>
                                <button
                                    className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:opacity-90"
                                    style={{ backgroundColor: '#98f5e1' }}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-500 mt-12">
                        Need help choosing? Contact our support team for guidance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Classes;
