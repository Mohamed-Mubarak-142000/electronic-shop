'use client';

export default function LowStockAlert() {
    return (
        <div className="bg-card-dark rounded-xl border border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    Low Stock Alert
                </h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-background-dark border border-white/5">
                    <div
                        className="bg-center bg-cover size-12 rounded-lg"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKuOX1WuXGuZXqobm1-YAhauhd-JqZzO-cHcmHF3EwkUD6rZBnNLdA5qLe0plnyKPTNSxLR1ImDwMYb7R_nYFNjWWO_1FOsfCyX9H8oYZE2tyrG9khej5RvhRrzQe-a4rz1wHW_TJ56BaOkH___3K0CRD-sMsTZ6WXBSTQ4JtJPPYaNuiT3i2MkSWEsjQ_C5bqkDKLgwv9xxIGzybgUr2UX1lgUjs7Gi2pM9tq-_9_Sc2JayQOjax10VHWE0_VCY_tkU9TPCMSi6s")' }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-medium">Smart Wall Switch</p>
                        <p className="text-gray-500 text-xs">ID: PRD-221</p>
                    </div>
                    <div className="text-right">
                        <p className="text-red-500 font-bold text-sm">3 left</p>
                        <button className="text-primary text-xs hover:underline mt-1">Restock</button>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-background-dark border border-white/5">
                    <div
                        className="bg-center bg-cover size-12 rounded-lg"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUxGX0ntPosXrBE7YWp5MFHAwgHYBwx_U1rlgjS-XaMVcmBFqJPSjjM-j63Lqu7U8rjcWZ5JRusCgC53vNCFkExzAqNfmrUCjwBC7xfG-dk3ai_oWa0PnmslyQNCzXw-oHWnxg5IQgFlAxT7bQ_gzDqdB3pCLv_eFP5JwelK2YTU8GEfiNTb7piVuDgWWy_YouBBQCfQtws6DNAmkbnO12K5pQ3nWHXTFcs64DJP0HrTAMicg9Z0HaYhnNs7UrAyZs2H9YZphIP4w")' }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-medium">Extension Cord 25ft</p>
                        <p className="text-gray-500 text-xs">ID: PRD-098</p>
                    </div>
                    <div className="text-right">
                        <p className="text-red-500 font-bold text-sm">5 left</p>
                        <button className="text-primary text-xs hover:underline mt-1">Restock</button>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-background-dark border border-white/5">
                    <div
                        className="bg-center bg-cover size-12 rounded-lg"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSz9mkaHJPzXS5cTmre3lDjnNbhXh0KJ1-K7qITm5W51CargOzZFvjRvh4DLDXziL-px2o_oF0gk7FYY5xr6qDrYkTEZqNs0_AWVjRz9hTVUvEx0YsQ5ZDhLCFnJ9hXNX2a9A-XW0Xb8OMvP5-iScKmjOAu1aRH-fLSJ32tJFkxZpa1ulk0FbO-uzF9khHQdQqH0Y_ERqk_fkhuagmyfy3kT685meaOMJS257cQGjw3E2cCKEW1cAuXtbtOnSUx-WCBoo35csktVs")' }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-medium">Digital Multimeter</p>
                        <p className="text-gray-500 text-xs">ID: PRD-554</p>
                    </div>
                    <div className="text-right">
                        <p className="text-red-500 font-bold text-sm">1 left</p>
                        <button className="text-primary text-xs hover:underline mt-1">Restock</button>
                    </div>
                </div>
            </div>
            <div className="mt-auto p-4 border-t border-white/5">
                <button className="w-full py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                    View All Low Stock
                </button>
            </div>
        </div>
    );
}
