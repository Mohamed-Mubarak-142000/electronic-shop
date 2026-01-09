'use client';

import Link from 'next/link';

export default function RegisterPage() {

    return (
        <main className="relative flex min-h-screen w-full flex-col lg:flex-row">
            {/* Header - Sticky */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-surface-highlight px-6 lg:px-10 py-4 absolute top-0 w-full z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </Link>
                    <h2 className="text-xl font-bold leading-tight tracking-tight dark:text-white">VoltSupply</h2>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex gap-6">
                        <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Products</Link>
                        <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Brands</Link>
                        <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Deals</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold dark:text-white hover:text-primary transition-colors hidden sm:block">Log In</Link>
                    <button className="flex items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-primary/90 transition-colors text-background-dark text-sm font-bold">
                        <span className="truncate">Support</span>
                    </button>
                </div>
            </header>

            {/* Left Column: Visual/Hero */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-auto overflow-hidden order-1 lg:order-1 pt-[72px] lg:pt-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBynRGmpDd3oHIHavedcV-Fr0oi4izavNdNr5mcjyRyJeAXbqWkLoMF7xQsFGEcPct7WQqNK2KYSW1lw1E9mzUYzWj2tIQvw4K9PBXJROiV6kSEdahXHT-Ak2ITCIxprQ24aCM3WpgjFN9voffbh07QiAOalM0HsvupfWb1xUw403MdDK7PtAJaxTB11vHWsCxEjBV2kMLpXPopJDInSkewX26zel5zWIQq0Fc_dj8nIn24YprIpqRrnZYG8GTr949KjPSSzTBlyRQ')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background-dark"></div>
                <div className="absolute bottom-0 left-0 p-8 lg:p-16 z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-4">
                        <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Trusted by 50k+ Pros</span>
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-4">
                        Power up your workflow.
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Access wholesale pricing, manage project lists, and get same-day shipping on over 10,000 electrical components.
                    </p>
                </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:p-20 order-2 lg:order-2 bg-background-light dark:bg-background-dark pt-[40px] lg:pt-[80px]">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold dark:text-white mb-2">Join the Circuit</h2>
                        <p className="text-gray-600 dark:text-gray-400">Create an account to start your project today.</p>
                    </div>
                    <form className="flex flex-col gap-5">
                        {/* Segmented Control */}
                        <div className="p-1 bg-gray-200 dark:bg-surface-dark rounded-full flex relative">
                            <label className="flex-1 text-center cursor-pointer relative z-10">
                                <input name="account_type" type="radio" value="homeowner" defaultChecked className="peer sr-only" />
                                <div className="w-full py-2.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:bg-white dark:peer-checked:bg-surface-highlight peer-checked:text-black dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Homeowner
                                </div>
                            </label>
                            <label className="flex-1 text-center cursor-pointer relative z-10">
                                <input name="account_type" type="radio" value="professional" className="peer sr-only" />
                                <div className="w-full py-2.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:bg-white dark:peer-checked:bg-surface-highlight peer-checked:text-black dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Electrician / Business
                                </div>
                            </label>
                        </div>

                        {/* Name Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</span>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="e.g. Thomas Edison" type="text" />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            </div>
                        </label>

                        {/* Email Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</span>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="name@example.com" type="email" />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                            </div>
                        </label>

                        {/* Password Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</span>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Create a strong password" type="password" />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                            </div>
                            {/* Password Strength Indicator */}
                            <div className="flex items-center gap-2 mt-1 px-1">
                                <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-yellow-500 rounded-full"></div>
                                </div>
                                <span className="text-xs font-medium text-yellow-600 dark:text-yellow-500">Medium</span>
                            </div>
                        </label>

                        {/* Terms Checkbox */}
                        <label className="flex items-start gap-3 mt-2 cursor-pointer">
                            <input className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-white dark:bg-surface-dark" type="checkbox" />
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-normal">
                                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button className="mt-4 w-full h-14 bg-primary hover:bg-[#2fd16f] active:scale-[0.98] transition-all text-background-dark text-base font-bold rounded-full shadow-[0_0_20px_rgba(54,226,123,0.3)] flex items-center justify-center gap-2" type="button">
                            <span>Create Account</span>
                            <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300 dark:border-border-dark"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or register with</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-border-dark"></div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-full border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight transition-colors text-sm font-bold text-gray-700 dark:text-white">
                                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9j_Wjaz2jSWsk7bEcOd5-CkmDWug9kvNf0gGzJHbNUGNdqAeTme8dgdL4hmUBkcUPk5lLpgrQfloKepUviw-prSju6CGCkSlVbZAup_x_8_wGhq3BCK53m-hEwN6L7LatwiHYzqxFU4k8Z4nw15RCzI0eAUnvVLDkTUaf1igsJK6QHvLhAJlvFhQjTTDfSzLN7VQPTMeGp4YHi38w5ccYFRAocnyvGxf2_MqPtWnnW-XGg42_WJfnHSp9IriNiOYH3auw-WPMUs" />
                                <span>Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-full border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight transition-colors text-sm font-bold text-gray-700 dark:text-white">
                                <span className="material-symbols-outlined text-xl">ios</span>
                                <span>Apple</span>
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
