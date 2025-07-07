import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Home, Users, Settings, BarChart3, FileText, Bell, Presentation, ListOrdered, LogOut, Menu } from 'lucide-react';
import { signout } from '../api/auth';

export default function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemValue, setNewItemValue] = useState('');
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewItemName('');
        setNewItemValue('');
    };

    const handleAddItem = () => {
        if (newItemName.trim() !== '' && newItemValue.trim() !== '') {
            setCards([
                ...cards,
                { label: newItemName, value: newItemValue, icon: FileText, iconColor: 'text-purple-500' }
            ]);
            closeAddModal();
        }
    };

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: Presentation, label: 'New Persentation', path: '/presentation' },
        { icon: ListOrdered, label: 'Total presentations' },
        { icon: Settings, label: 'Settings' },
    ];

    // ...existing code...
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

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-x-hidden">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#EDEAE0] shadow-sm sticky top-0 z-20">
                <div className="flex items-center space-x-2">
                    <Home className="w-7 h-7 text-gray-700" />
                    <span className="text-lg font-bold text-gray-800">Dashboard</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </div>
            {/* Sidebar */}
            <div className={`fixed md:sticky md:top-0 top-0 left-0 z-30 md:z-10 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 flex-shrink-0 bg-[#EDEAE0] md:block h-full md:h-screen`}>
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="p-6 border-b border-gray-300 hidden md:block">
                        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            {sidebarItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (item.path) navigate(item.path); setSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${item.active
                                            ? 'bg-white bg-opacity-50 text-gray-900'
                                            : 'text-gray-700 hover:bg-white hover:bg-opacity-30'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                            {/* Sign Out Button */}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => { handleSignOut(); setSidebarOpen(false); }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-300 hidden md:flex">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">JD</span>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">John Doe</p>
                                <p className="text-sm text-gray-600">Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
            {/* Main Content */}
            <div className="flex-1 flex flex-col" style={{ backgroundColor: '#FEFEFA' }}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Welcome to Dashboard</h2>
                        <div className="flex items-center w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50 text-gray-700 text-sm"
                                style={{ minWidth: 0, maxWidth: 320 }}
                            />
                        </div>
                    </div>
                </header>
                {/* Dashboard Content */}
                <main className="flex-1 p-3 sm:p-6">
                    {/* Add Item (Quick Actions) on Top */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8 md:p-12 mb-6 sm:mb-8">
                        <div className="text-center">
                            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-6">Quick Actions</h3>
                            <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8">Get started by adding new content to your dashboard</p>
                            <button
                                onClick={openAddModal}
                                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm text-sm sm:text-base"
                            >
                                <Plus size={20} className="mr-2" />
                                Add New Item
                            </button>
                        </div>
                    </div>
                    {/* Stats Cards (New Items) Below */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {cards.map((card, idx) => (
                            <div key={idx} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600">{card.label}</p>
                                        <p className="text-lg sm:text-2xl font-bold text-gray-800">{card.value}</p>
                                    </div>
                                    <card.icon className={card.iconColor} size={24} />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-2 sm:mx-4 overflow-y-auto max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Add New Item</h3>
                            <button
                                onClick={closeAddModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        {/* Modal Content */}
                        <div className="p-4 sm:p-6">
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs sm:text-sm"
                                        placeholder="Enter item name"
                                        value={newItemName}
                                        onChange={e => setNewItemName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-xs sm:text-sm"
                                        placeholder="Enter description"
                                        value={newItemValue}
                                        onChange={e => setNewItemValue(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs sm:text-sm">
                                        <option value="">Select subject</option>
                                        <option value="project">Project</option>
                                        <option value="task">Task</option>
                                        <option value="note">Note</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-2 sm:space-x-3 p-4 sm:p-6 border-t border-gray-200">
                            <button
                                onClick={closeAddModal}
                                className="px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}