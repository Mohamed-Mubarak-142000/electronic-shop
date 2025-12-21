'use client';

export default function OrdersStatusChart() {
    return (
        <div className="bg-card-dark rounded-xl border border-white/5 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-1">Orders by Status</h3>
            <p className="text-sm text-gray-400 mb-6">Last 30 Days</p>
            <div className="flex-1 flex flex-col justify-center gap-6">
                {/* Progress Bar Items */}
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Pending</span>
                        <span className="text-gray-400">24%</span>
                    </div>
                    <div className="w-full bg-background-dark rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                </div>
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Shipped</span>
                        <span className="text-gray-400">56%</span>
                    </div>
                    <div className="w-full bg-background-dark rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                </div>
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Delivered</span>
                        <span className="text-gray-400">15%</span>
                    </div>
                    <div className="w-full bg-background-dark rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                </div>
                <div className="group">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-white font-medium">Returned</span>
                        <span className="text-gray-400">5%</span>
                    </div>
                    <div className="w-full bg-background-dark rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
