'use client';

export default function OrderDetailsDrawer() {
    return (
        <div className="hidden lg:flex flex-col absolute inset-y-0 right-0 w-full md:w-[450px] lg:w-[30%] bg-surface-dark border-l border-white/5 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transform transition-transform translate-x-0 z-30">
            {/* Header */}
            <div className="flex flex-col p-6 border-b border-white/5 bg-[#15261d]">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-white">#ORD-7729</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/20">
                            Processing
                        </span>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="flex gap-2">
                    <select className="bg-surface-dark border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary w-full">
                        <option>Update Status...</option>
                        <option defaultValue="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <button className="bg-primary text-black font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                        Save
                    </button>
                </div>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Customer Info */}
                <div className="bg-[#112117] rounded-xl p-4 border border-white/10">
                    <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-3">Customer Details</h4>
                    <div className="flex items-center gap-4 mb-4">
                        <img className="w-12 h-12 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApo2PeyxizntDPierE5cqouhTF6KmleZ6Pib0KUJLPQ9ieZEp8anl198J6Uc13ydFnEj26axrAU_P8F7yaCXxSrTyoBaEyfufGAprJkxyTOXRz-nDby0pFXRn-m0xF73bhJpuMjW-OObihfO0_2UtVFwPi0UOh8teGZjOzshRQ3nvuRUzBadP4HJzVcDeK_dDc7Me48sFNFsIKaimEOiuaeE8dmZegpGVMoNdyJXiciUYph4fDdY4wFk8dtGgkNXo5Qj6tXeWhCHg" alt="John Electrician" />
                        <div>
                            <p className="text-white font-bold">John Electrician</p>
                            <p className="text-primary text-sm">john.e@spark.com</p>
                            <p className="text-gray-500 text-xs mt-0.5">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-surface-dark border border-white/10 hover:bg-white/5 text-white py-2 rounded-lg text-xs font-bold transition-colors">
                            <span className="material-symbols-outlined text-sm">mail</span> Email
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-surface-dark border border-white/10 hover:bg-white/5 text-white py-2 rounded-lg text-xs font-bold transition-colors">
                            <span className="material-symbols-outlined text-sm">history</span> History
                        </button>
                    </div>
                </div>
                {/* Products */}
                <div>
                    <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-3">Items (2)</h4>
                    <div className="space-y-3">
                        {/* Item 1 */}
                        <div className="flex gap-4 p-3 rounded-xl bg-[#112117] border border-white/10 hover:border-gray-600 transition-colors">
                            <img className="w-16 h-16 rounded-lg object-cover bg-white/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD91LlTH2jJ2ANDXd0TPR4hHKozdwwz5C5yp1CMwXg4q7eCAxH7h2_eDy-ZEUvuWHvwdtzEHQ_4LiBNz1K3LnoJE4HJPgUGiGz862AA_l8mBhwXyQES-eEGKDkkSWUMkkwdvGr9IIiXCiK6tTY2vaqAZnzf2JInUNTHcfbCxApD9v0Rf9NrsxmQWPrsTJ2aLKsRF6FjTh4HfvvLYG60UcLdH3ZN5J4t7ye76DBAVMsLDIr5v9vUMXD5Y5V3GG-UGqNFwNztj69kLS0" alt="Product" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-white text-sm font-bold line-clamp-2">Industrial Circuit Breaker - 20A</p>
                                    <p className="text-white font-mono text-sm font-bold">$120.00</p>
                                </div>
                                <p className="text-gray-500 text-xs mt-1">SKU: CB-20A-IND</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">Qty: 10</span>
                                    <p className="text-primary text-sm font-bold">$1,200.00</p>
                                </div>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="flex gap-4 p-3 rounded-xl bg-[#112117] border border-white/10 hover:border-gray-600 transition-colors">
                            <img className="w-16 h-16 rounded-lg object-cover bg-white/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOX9Az2ZThdbuvCzbCxUbuIjoSjGvi26I1JONptXVRSCaCdJvtXquQQsqoP2EO0JCw9PqpVNeL3nDquD5eXjT5DHhAh3PnJdEPxiTUgvg8iDCU0ED5C8Zkh5OzFzEc-8GIQ9hauped65bI1hHupnkDkU0Bk2D_gidQGEP2JFncPDARl4guK-C5IaKV0ZAkEjHsy074w8YOZ5xavs4o4SBGQcgSeaBE7q6pp1bEFkb8w6gV2MQQ6i9Bq16paB_h_R1hGK-sElXccgk" alt="Product" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <p className="text-white text-sm font-bold line-clamp-2">Insulated Copper Wire (50ft)</p>
                                    <p className="text-white font-mono text-sm font-bold">$40.50</p>
                                </div>
                                <p className="text-gray-500 text-xs mt-1">SKU: WR-CP-50</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">Qty: 1</span>
                                    <p className="text-primary text-sm font-bold">$40.50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shipping Address */}
                <div className="bg-[#112117] rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider">Shipping Address</h4>
                        <button className="text-primary text-xs font-bold">Edit</button>
                    </div>
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-gray-500 mt-0.5">location_on</span>
                        <div>
                            <p className="text-white text-sm">452 High Voltage Lane</p>
                            <p className="text-white text-sm">Reno, NV 89502</p>
                            <p className="text-gray-500 text-xs mt-1">United States</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <label className="text-gray-400 text-xs mb-1 block">Tracking Number</label>
                        <div className="flex gap-2">
                            <input className="flex-1 bg-surface-dark border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary" placeholder="Enter tracking #" type="text" />
                            <button className="bg-surface-dark border border-white/10 hover:bg-white/5 text-white p-2 rounded-lg">
                                <span className="material-symbols-outlined text-sm">save</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Payment Summary */}
                <div className="bg-[#112117] rounded-xl p-4 border border-white/10">
                    <h4 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-3">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-white font-mono">$1,240.50</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span className="text-white font-mono">$25.00</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Tax (8%)</span>
                            <span className="text-white font-mono">$99.24</span>
                        </div>
                        <div className="flex justify-between text-gray-400 pt-2 border-t border-white/10 mt-2">
                            <span>Discount</span>
                            <span className="text-primary font-mono">-$25.00</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-white/10 mt-2 items-end">
                            <span className="text-white font-bold">Total</span>
                            <span className="text-2xl text-primary font-bold font-mono">$1,339.74</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-500">credit_card</span>
                            <span className="text-gray-400 text-xs">Mastercard ending in 4242</span>
                        </div>
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded font-bold">PAID</span>
                    </div>
                </div>
                <div className="h-10"></div> {/* Spacer */}
            </div>
            {/* Sticky Footer Actions */}
            <div className="p-4 border-t border-white/5 bg-[#15261d] flex gap-3">
                <button className="flex-1 py-3 rounded-full bg-surface-dark border border-white/10 text-white font-bold hover:bg-white/5 transition-colors flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-sm">print</span>
                    Invoice
                </button>
                <button className="flex-1 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-colors">
                    Cancel Order
                </button>
            </div>
        </div>
    );
}
