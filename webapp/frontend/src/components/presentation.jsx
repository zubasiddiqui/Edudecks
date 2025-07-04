import React, { useState } from 'react';
import { Home, FileText, ListOrdered, Settings, FileSliders, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api/auth';

const PresentationUI = () => {
    const [formData, setFormData] = useState({
        subject: '',
        topic: '',
        pages: 5
    });

    const [generatedSlides, setGeneratedSlides] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const navigate = useNavigate();

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: true, path: '/dashboard' },
        { icon: FileSliders, label: 'New Presentation', path: '/presentation' },
        { icon: ListOrdered, label: 'Total Presentations' },
        { icon: Settings, label: 'Settings' },
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
        if (!formData.subject || !formData.topic) {
            alert('Please fill in all required fields');
            return;
        }

        setIsGenerating(true);

        // Simulate API call
        setTimeout(() => {
            const slides = Array.from({ length: parseInt(formData.pages) }, (_, index) => ({
                id: index + 1,
                title: index === 0
                    ? `${formData.subject}: ${formData.topic}`
                    : `${formData.topic} - Slide ${index + 1}`,
                content: index === 0
                    ? `Introduction to ${formData.topic}`
                    : `Content for slide ${index + 1} about ${formData.topic}. This slide covers key concepts and important information related to ${formData.subject}.`
            }));

            setGeneratedSlides(slides);
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0" style={{ backgroundColor: '#EDEAE0' }}>
                <div className="p-6">
                    <div className="flex items-center space-x-2 mb-8">
                        <FileSliders className="w-8 h-8 text-gray-700" />
                        <h1 className="text-xl font-bold text-gray-800">PresentGen</h1>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => { if (item.path) navigate(item.path); }}
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
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex" style={{ backgroundColor: '#FEFEFA' }}>
                {/* Form Section */}
                <div className="w-2/5 p-8">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Presentation</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Computer Science"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Topic *
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Machine Learning Basics"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Pages
                                    </label>
                                    <input
                                        type="number"
                                        name="pages"
                                        value={formData.pages}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="20"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGeneratePPT}
                                    disabled={isGenerating}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
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
                <div className="w-3/5 p-8">
                    <div className="h-full bg-white rounded-xl shadow-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-800">Preview</h3>
                        </div>

                        <div className="p-6 h-full overflow-y-auto">
                            {generatedSlides.length === 0 ? (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    <div className="text-center">
                                        <FileSliders className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <p className="text-lg font-medium">No slides generated yet</p>
                                        <p className="text-sm">Fill out the form and click 'Generate PPT' to see your slides here</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {generatedSlides.map((slide) => (
                                        <div
                                            key={slide.id}
                                            className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-bold text-gray-800">Slide {slide.id}</h4>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    {slide.id === 1 ? 'Title Slide' : 'Content Slide'}
                                                </span>
                                            </div>
                                            <h5 className="text-lg font-semibold text-gray-700 mb-2">
                                                {slide.title}
                                            </h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">
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