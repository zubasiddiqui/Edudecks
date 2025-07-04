import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Home, Users, Settings, BarChart3, FileText, Bell, Presentation, ListOrdered, LogOut } from 'lucide-react';
import { signout } from '../api/auth';

export default function Dashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemValue, setNewItemValue] = useState('');
    const navigate = useNavigate();

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
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 flex flex-col" style={{ backgroundColor: '#EDEAE0' }}>
                {/* Logo/Brand */}
                <div className="p-6 border-b border-gray-300">
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
                                        if (item.path) navigate(item.path);
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
                                onClick={handleSignOut}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-300">
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col" style={{ backgroundColor: '#FEFEFA' }}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800">Welcome to Dashboard</h2>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50 text-gray-700"
                                style={{ minWidth: 320 }}
                            />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6">
                    {/* Add Item (Quick Actions) on Top */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 mb-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
                            <p className="text-lg text-gray-600 mb-8">Get started by adding new content to your dashboard</p>
                            <button
                                onClick={openAddModal}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                            >
                                <Plus size={20} className="mr-2" />
                                Add New Item
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards (New Items) Below */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{card.label}</p>
                                        <p className="text-2xl font-bold text-gray-800">{card.value}</p>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Add New Item</h3>
                            <button
                                onClick={closeAddModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="Enter item name"
                                        value={newItemName}
                                        onChange={e => setNewItemName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                        placeholder="Enter description"
                                        value={newItemValue}
                                        onChange={e => setNewItemValue(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                        <option value="">Select subject</option>
                                        <option value="project">Project</option>
                                        <option value="task">Task</option>
                                        <option value="note">Note</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                            <button
                                onClick={closeAddModal}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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