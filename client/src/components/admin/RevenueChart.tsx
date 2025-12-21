'use client';

export default function RevenueChart() {
    return (
        <div className="lg:col-span-2 bg-card-dark rounded-xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Revenue Analytics</h3>
                    <p className="text-sm text-gray-400">Year to Date Performance</p>
                </div>
                <select className="bg-background-dark border border-white/10 text-white text-sm rounded-lg p-2 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>
            {/* Line Chart Simulation */}
            <div className="relative h-64 w-full">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#36e27b" stopOpacity="0.2"></stop>
                            <stop offset="100%" stopColor="#36e27b" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="800" y1="0" y2="0"></line>
                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>
                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
                    <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="800" y1="200" y2="200"></line>
                    {/* The Chart Line */}
                    <path d="M0,150 Q100,100 200,130 T400,80 T600,100 T800,20" fill="url(#gradient)" stroke="#36e27b" strokeWidth="3"></path>
                    {/* Data Points */}
                    <circle cx="200" cy="130" fill="#112117" r="4" stroke="#36e27b" strokeWidth="2"></circle>
                    <circle cx="400" cy="80" fill="#112117" r="4" stroke="#36e27b" strokeWidth="2"></circle>
                    <circle cx="600" cy="100" fill="#112117" r="4" stroke="#36e27b" strokeWidth="2"></circle>
                    <circle cx="800" cy="20" fill="#112117" r="4" stroke="#36e27b" strokeWidth="2"></circle>
                </svg>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
        </div>
    );
}
