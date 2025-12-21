'use client';

import React from 'react';

export default function ProductForm() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Form Data (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* General Information Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">General Information</h2>
                    <div className="flex flex-col gap-6">
                        {/* Product Name Input */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Product Name</span>
                            <input
                                className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                placeholder="e.g. Industrial Circuit Breaker 50A"
                                type="text"
                            />
                        </label>
                        {/* SKU & Barcode Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">SKU</span>
                                <input
                                    className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                    placeholder="e.g. CB-50A-IND"
                                    type="text"
                                />
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Barcode (ISBN/UPC)</span>
                                <input
                                    className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                    placeholder="e.g. 123456789"
                                    type="text"
                                />
                            </label>
                        </div>
                        {/* Description (Rich Text Simulator) */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Description</span>
                            <div className="flex flex-col rounded-lg border border-white/10 bg-background-dark overflow-hidden">
                                {/* Toolbar */}
                                <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-surface-dark">
                                    <button className="p-1.5 hover:bg-white/5 rounded text-gray-300"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                                    <button className="p-1.5 hover:bg-white/5 rounded text-gray-300"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                                    <button className="p-1.5 hover:bg-white/5 rounded text-gray-300"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
                                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                                    <button className="p-1.5 hover:bg-white/5 rounded text-gray-300"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                                    <button className="p-1.5 hover:bg-white/5 rounded text-gray-300"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></button>
                                </div>
                                <textarea
                                    className="form-textarea w-full border-none bg-transparent focus:ring-0 p-4 min-h-[160px] text-white resize-y placeholder:text-gray-400"
                                    placeholder="Enter detailed product description, features, and technical notes..."
                                ></textarea>
                            </div>
                        </label>
                    </div>
                </div>
                {/* Media Gallery Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-4">Media Gallery</h2>
                    {/* Dropzone */}
                    <div className="border-2 border-dashed border-white/10 hover:border-primary rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer bg-background-dark group">
                        <div className="h-12 w-12 rounded-full bg-surface-dark flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-[24px]">cloud_upload</span>
                        </div>
                        <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-gray-400 text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                    {/* Uploaded Files Preview */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        {/* Existing Image 1 */}
                        <div className="relative group rounded-lg overflow-hidden aspect-square bg-background-dark border border-white/10">
                            <img
                                className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnxxWU_94cq9yu13YtZtNJaytfO5uTGit197Fyz9UKV57ayFy2jqptgVG0NbCMiPX5Jxe58rNmBJpQtbYMMu5TFBch4yX1CK1RBDNG8gxT1rvuIPUaZbMSHfaWIYote_GgDFMCCHLQMgPe5dJdHlVJqFRjuEYrT0FC2rgIrXVmi7ZKipzkcQIUh4MFAKXXglDcEIn0863OEI-m4G48CqFtikm4_YvDmi4T4_jwrbwi6JC6dAdqCEGZX-z40uzUHUxwip9QspQelJ4"
                                alt="Product 1"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white backdrop-blur-sm"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                <button className="bg-red-500/80 hover:bg-red-500 p-1.5 rounded-full text-white backdrop-blur-sm"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full">Main</span>
                            </div>
                        </div>
                        {/* Existing Image 2 */}
                        <div className="relative group rounded-lg overflow-hidden aspect-square bg-background-dark border border-white/10">
                            <img
                                className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7TNv83JFaHnM_kb2c8NnmdATupjtQy5kN1xGcfKIKY8TtIJPWvEzqGjmbOpYyFt3Qw_2wPFmIw59I_Q8E3z8BOIgJv_kLIENLZ0AI5tptHZOy8dVuZJ4ooiYOdsYVm9fHwwyq-rU_k3WjbHErcrOCqgiUR3PjZfymuYK8VHepPklBqO6B9j8bMCiFBNqPUfcoKhp0Uf230oLPmdKTSdUCn0fYGds5g1q6UYdW4iyxct3jYvifpHXyeXKFbt2PjcaDlQdL01tF2Ig"
                                alt="Product 2"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white backdrop-blur-sm"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                                <button className="bg-red-500/80 hover:bg-red-500 p-1.5 rounded-full text-white backdrop-blur-sm"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Specifications Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white">Specifications</h2>
                        <button className="text-primary hover:text-green-400 text-sm font-bold flex items-center">
                            <span className="material-symbols-outlined text-[18px] mr-1">add</span>
                            Add New
                        </button>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/10">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-background-dark text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-4 py-3">Attribute</th>
                                    <th className="px-4 py-3">Value</th>
                                    <th className="px-4 py-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                <tr>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-white font-medium" type="text" defaultValue="Voltage" />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-gray-400" type="text" defaultValue="220V - 240V" />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-white font-medium" type="text" defaultValue="Amperage" />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-gray-400" type="text" defaultValue="50A" />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-white font-medium" type="text" defaultValue="Material" />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input className="bg-transparent border-none focus:ring-0 w-full text-gray-400" type="text" defaultValue="Polycarbonate" />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Right Column: Sidebar (1/3 width) */}
            <div className="flex flex-col gap-8">
                {/* Organization Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Organization</h2>
                    <div className="flex flex-col gap-6">
                        {/* Status */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Status</span>
                            <select className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4">
                                <option value="draft">Draft</option>
                                <option defaultValue="active">Active</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>
                        {/* Category */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Category</span>
                            <select className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4">
                                <option disabled defaultValue="">Select Category</option>
                                <option>Wiring Devices</option>
                                <option>Circuit Protection</option>
                                <option>Lighting Controls</option>
                                <option>Industrial Controls</option>
                            </select>
                        </label>
                        {/* Vendor */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Vendor / Brand</span>
                            <div className="relative">
                                <input
                                    className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                    list="vendors"
                                    placeholder="Search vendor..."
                                    type="text"
                                />
                                <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400">search</span>
                                <datalist id="vendors">
                                    <option value="Siemens"></option>
                                    <option value="Schneider Electric"></option>
                                    <option value="ABB"></option>
                                    <option value="Eaton"></option>
                                </datalist>
                            </div>
                        </label>
                        {/* Tags */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Tags</span>
                            <div className="flex flex-wrap gap-2 p-3 min-h-[50px] rounded-lg border border-white/10 bg-background-dark">
                                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white">
                                    Industrial
                                    <button className="text-gray-300 hover:text-white ml-1"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                </span>
                                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white">
                                    Heavy Duty
                                    <button className="text-gray-300 hover:text-white ml-1"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                </span>
                                <input className="bg-transparent border-none text-sm p-0 focus:ring-0 text-white placeholder:text-gray-400 w-20" placeholder="Add..." type="text" />
                            </div>
                        </label>
                    </div>
                </div>
                {/* Pricing & Inventory Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Pricing & Inventory</h2>
                    <div className="flex flex-col gap-6">
                        {/* Base Price */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Base Price ($)</span>
                            <input
                                className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                placeholder="0.00"
                                step="0.01"
                                type="number"
                            />
                        </label>
                        {/* Discount Price */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Discount Price ($)</span>
                            <input
                                className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                placeholder="0.00"
                                step="0.01"
                                type="number"
                            />
                        </label>
                        <div className="w-full h-px bg-white/10 my-2"></div>
                        {/* Inventory Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Track Inventory</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        {/* Stock Quantity */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Stock Quantity</span>
                            <input
                                className="form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400"
                                placeholder="0"
                                type="number"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
