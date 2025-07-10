import React, { useState } from 'react';
import { Home, FileText, ListOrdered, Settings, FileSliders, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api/auth';

const PresentationUI = () => {
    const [formData, setFormData] = useState({
        grade: '',
        subject: '',
        topic: '',
        language: 'English',
        pages: 5
    });

    const [generatedSlides, setGeneratedSlides] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pptDownloadUrl, setPptDownloadUrl] = useState(null);

    const navigate = useNavigate();

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: false, path: '/dashboard' },
        { icon: FileSliders, label: 'New Presentation', active: true, path: '/presentation' },
        { icon: ListOrdered, label: 'Total Presentations', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    // Sign out handler
    const handleSignOut = async () => {
        try {
            await signout();
            localStorage.removeItem('token'); // Fallback: ensure token is removed
            navigate('/');
        } catch (err) {
            alert(err.message || 'Sign out failed');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGeneratePPT = async () => {
        if (!formData.grade || !formData.subject || !formData.topic || !formData.language || !formData.pages) {
            alert('Please fill in all required fields');
            return;
        }

        setIsGenerating(true);
        setPptDownloadUrl(null);
        setGeneratedSlides([]);

        try {
            const response = await fetch('http://localhost:8000/ppt/generate-ppt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade: formData.grade,
                    subject: formData.subject,
                    topic: formData.topic,
                    language: formData.language,
                    pages: Number(formData.pages),
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to generate PPT');
            }

            const data = await response.json();
            setPptDownloadUrl(data.public_url);
            setGeneratedSlides([{ id: 1, title: 'Download PPT', content: '' }]);
        } catch (err) {
            alert(err.message || 'Error generating PPT');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 overflow-x-hidden">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#EDEAE0] shadow-sm sticky top-0 z-20">
                <div className="flex items-center space-x-2">
                    <FileSliders className="w-7 h-7 text-gray-700" />
                    <span className="text-lg font-bold text-gray-800">PresentGen</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </div>
            {/* Sidebar */}
            <div className={`fixed md:sticky md:top-0 top-0 left-0 z-30 md:z-10 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 flex-shrink-0 bg-[#EDEAE0] md:block h-full md:h-screen`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="hidden md:flex items-center space-x-2 mb-8">
                        <FileSliders className="w-8 h-8 text-gray-700" />
                        <h1 className="text-xl font-bold text-gray-800">PresentGen</h1>
                    </div>
                    <nav className="space-y-2 flex-1">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => { if (item.path) navigate(item.path); setSidebarOpen(false); }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active
                                        ? 'bg-white bg-opacity-70 text-gray-900 shadow-sm'
                                        : 'text-gray-700 hover:bg-white hover:bg-opacity-50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                        {/* Sign Out Button */}
                        <button
                            type="button"
                            onClick={() => { handleSignOut(); setSidebarOpen(false); }}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </nav>
                </div>
            </div>
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row" style={{ backgroundColor: '#FEFEFA' }}>
                {/* Form Section */}
                <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 order-2 md:order-1">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Generate Presentation</h2>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Grade Level *
                                    </label>
                                    <input
                                        type="number"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 5"
                                        min="1"
                                        max="12"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs sm:text-sm"
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="English">English</option>
                                        <option value="Urdu">Urdu</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Marathi">Marathi</option>
                                        <option value="Science">Science</option>
                                        <option value="History">History</option>
                                        <option value="Civics">Civics</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Maths">Maths</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Topic *
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Noun"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Language *
                                    </label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs sm:text-sm"
                                    >
                                        <option value="English">English</option>
                                        <option value="Urdu">Urdu</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Marathi">Marathi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Number of Slides
                                    </label>
                                    <input
                                        type="number"
                                        name="pages"
                                        value={formData.pages}
                                        onChange={handleInputChange}
                                        min="3"
                                        max="10"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-xs sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGeneratePPT}
                                    disabled={isGenerating}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-xs sm:text-sm"
                                >
                                    {isGenerating ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Generating...</span>
                                        </div>
                                    ) : (
                                        'Generate PPT'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Preview Section */}
                <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-8 order-1 md:order-2">
                    <div className="h-full bg-white rounded-xl shadow-lg">
                        <div className="p-4 sm:p-6 border-b">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Preview</h3>
                        </div>
                        <div className="p-4 sm:p-6 h-full overflow-y-auto">
                            {pptDownloadUrl ? (
                                <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-700">
                                    <div className="text-center">
                                        <FileSliders className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-500" />
                                        <p className="text-base sm:text-lg font-medium mb-2">Your PPT is ready!</p>
                                        <a href={pptDownloadUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors">Download Presentation</a>
                                    </div>
                                </div>
                            ) : generatedSlides.length === 0 ? (
                                <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                                    <div className="text-center">
                                        <FileSliders className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
                                        <p className="text-base sm:text-lg font-medium">No slides generated yet</p>
                                        <p className="text-xs sm:text-sm">Fill out the form and click 'Generate PPT' to see your slides here</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 sm:space-y-6">
                                    {generatedSlides.map((slide) => (
                                        <div
                                            key={slide.id}
                                            className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-blue-500"
                                        >
                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Slide {slide.id}</h4>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    {slide.id === 1 ? 'Title Slide' : 'Content Slide'}
                                                </span>
                                            </div>
                                            <h5 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                                                {slide.title}
                                            </h5>
                                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                                {slide.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresentationUI;