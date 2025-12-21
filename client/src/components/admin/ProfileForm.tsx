'use client';

export default function ProfileForm() {
    return (
        <>
            {/* Tabs */}
            <div className="px-4">
                <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
                    <a href="#" className="flex flex-col items-center justify-center border-b-[3px] border-primary text-white pb-3 pt-2 min-w-max px-2">
                        <p className="text-sm font-bold tracking-[0.015em]">General Info</p>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-gray-400 hover:text-white pb-3 pt-2 min-w-max px-2 transition-colors">
                        <p className="text-sm font-bold tracking-[0.015em]">Expertise & Skills</p>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-gray-400 hover:text-white pb-3 pt-2 min-w-max px-2 transition-colors">
                        <p className="text-sm font-bold tracking-[0.015em]">Projects</p>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-gray-400 hover:text-white pb-3 pt-2 min-w-max px-2 transition-colors">
                        <p className="text-sm font-bold tracking-[0.015em]">Social Links</p>
                    </a>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 pt-6">
                {/* Left Column: Avatar & Quick Status */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10 flex flex-col items-center text-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 border-4 border-white/10 group-hover:opacity-75 transition-opacity"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6Zlu2-4pLAUk_AjGaIqvcrn5kp2F0CNlwZ639jwYUQk1HJpyjM-XMkHKnsi5TmbwYbTiIxCw-_0eCY_qpMjJdOWGeES1HCzMB_a4LmrAr7lZFcyCOCLrAosuznXarnRvoU-zGeDNvSMDwl1ybqsNUoKkKwbJdUnuWo5Ydxs5QaAYJLwYriJ7RPt3ZIUvm3ud65Quar0UdSHJByPmgBUlfC0HPdimTQF8-jsBxMAt96HdcFYbzVDX7azHDpu4Y9Be7yp5wz_vVq5Q")' }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">photo_camera</span>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-primary h-6 w-6 rounded-full border-4 border-surface-dark"></div>
                        </div>
                        <div>
                            <h3 className="text-white text-xl font-bold">Alex Watts</h3>
                            <p className="text-gray-400 text-sm">Master Electrician</p>
                        </div>
                        <button className="w-full flex items-center justify-center rounded-lg h-10 bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors gap-2">
                            <span className="material-symbols-outlined text-[18px]">upload</span>
                            Change Photo
                        </button>
                        <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>

                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold text-sm">Profile Visibility</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <p className="text-xs text-gray-400">Your profile is currently visible to all visitors in the directory.</p>
                    </div>
                </div>

                {/* Right Column: Form Fields */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Personal Details Section */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">First Name</label>
                                <input className="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Alex" type="text" defaultValue="Alex" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Last Name</label>
                                <input className="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Watts" type="text" defaultValue="Watts" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Job Title</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">badge</span>
                                    <input className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Senior Technician" type="text" defaultValue="Master Electrician" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Experience (Years)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">history</span>
                                    <input className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. 5" type="number" defaultValue="12" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Email Address</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">mail</span>
                                    <input className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" type="email" defaultValue="alex.watts@voltmarket.com" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Phone Number</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">call</span>
                                    <input className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" type="tel" defaultValue="+1 (555) 012-3456" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Location</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">location_on</span>
                                <input className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="City, State" type="text" defaultValue="Seattle, WA" />
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2">About The Expert</h3>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Bio</label>
                            <div className="bg-surface-dark border border-white/10 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                                {/* Simple Toolbar */}
                                <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-[#1e3326]">
                                    <button className="p-1.5 rounded hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">format_bold</span>
                                    </button>
                                    <button className="p-1.5 rounded hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">format_italic</span>
                                    </button>
                                    <button className="p-1.5 rounded hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                                    </button>
                                    <div className="w-px h-4 bg-white/10 mx-1"></div>
                                    <button className="p-1.5 rounded hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">link</span>
                                    </button>
                                </div>
                                <textarea
                                    className="w-full bg-surface-dark border-none p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-0 resize-y min-h-[140px]"
                                    placeholder="Tell customers about your background and expertise..."
                                    defaultValue="Specializing in industrial electrical systems for over a decade. I bring precision and safety to every high-voltage project. Certified in smart home integrations and renewable energy setups."
                                ></textarea>
                            </div>
                            <p className="text-xs text-gray-400 text-right">240/500 characters</p>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-2">Top Skills</h3>
                        <div className="flex flex-col gap-3">
                            <label className="text-white text-sm font-medium">Add Skills</label>
                            <div className="flex gap-2">
                                <input className="flex-1 bg-surface-dark border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Solar Installation" type="text" />
                                <button className="bg-white/5 hover:bg-primary hover:text-black text-white px-4 rounded-lg font-bold text-sm transition-colors border border-white/10">Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div className="flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                                    Industrial Wiring
                                    <button className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                </div>
                                <div className="flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                                    Circuit Breaker Repair
                                    <button className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                </div>
                                <div className="flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                                    Smart Home Systems
                                    <button className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
