'use client';

import Link from 'next/link';

export default function RecentOrders() {
    return (
        <div className="xl:col-span-2 bg-card-dark rounded-xl border border-white/5 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                <Link href="#" className="text-primary text-sm font-semibold hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-background-dark text-xs uppercase font-semibold text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-white">#ORD-0092</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-8 rounded bg-background-dark bg-center bg-cover border border-white/10"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA91ACENJ5eP06cVPRwLUgRMVbbkAq-TdGdd8JPLDxDetLQ0Lx64pg_MUj6hk_D4IkJ-UURda0YehJsH_eZo9M_A-2US2sG4LIJTh-D3ypGD3T8olBwDDUMI4AB5WOoUN9vm-42xU0i9sO-8W1143k2NwU1ocORV56cG9m6HuEhK11OwyxJTz8K2JIQOMnOYWREjMEZXgOSmwVm4gG9X4EGOlTsSfRHbIV5PLqFWaXMqmRt86xmwFNVEOab2EKEqgYghyDXakU0s6Y")' }}
                                    ></div>
                                    <span className="font-medium text-white">Copper Wire Spool</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">Sarah Connor</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-400">
                                    <span className="size-1.5 rounded-full bg-yellow-400"></span>
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-white font-medium">$450.00</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-white">#ORD-0091</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-8 rounded bg-background-dark bg-center bg-cover border border-white/10"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdel2_RIineyTHZmt9uMCxdB4xMvSuSClQz46IAa2nwkBFP7nJlfKU7TH1wU70awpr1s43A4lAkYTWrMdU320KnW8pOg89XAiE3UYRvnO4H6MhIdXa2HzagvSLlz7EcoNytqqw-27xtGbIUjb_ZJEpMH3h6Ee5H1h7jD5cXADLscm3jbbm7BzErhDNMcz3i1ZeEiba-hOm_-94Y59M71KfuYc4io0U7ViZT8BfLH2kJS6ozsIJSyE72rDoefDYAitP4sFOyqz_5hI")' }}
                                    ></div>
                                    <span className="font-medium text-white">Circuit Breaker 20A</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    <span className="size-1.5 rounded-full bg-primary"></span>
                                    Shipped
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-white font-medium">$85.50</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-white">#ORD-0090</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-8 rounded bg-background-dark bg-center bg-cover border border-white/10"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBkEj6zc-yln8F7zFeMU5YVACnI23Ug4P7THC7_oRc_JVf5_XRBtYdXXBfKl5ABGpYgmGYVXLlRP07KqULendy6eFaunG1mKBrZb9ECiJK115l-3H9rfaxbEb-mfTODShLj7BFrij2Egc00JoE8HRUl8J5bHNMvuERcaGPU4c6MLhWtVBuCjDRC0A62xmM7qQC-NbThHaEDANDofttut5DrZ0dWGeFvUsHWgIhYRZ17q9BEfD43kxO5OSXuQmHaOfCi2b9td_brrQ")' }}
                                    ></div>
                                    <span className="font-medium text-white">LED Smart Bulb 4pk</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">Emily Blunt</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400">
                                    <span className="size-1.5 rounded-full bg-blue-400"></span>
                                    Delivered
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-white font-medium">$129.99</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-white">#ORD-0089</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-8 rounded bg-background-dark bg-center bg-cover border border-white/10"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmaNVapODLyUyKEY98sY_FX75aGIU0jHAaQefZ4PmFIwpjjkIEsgjSaivp3lFHvAvMToB-zM8oU9zMCRD1FcQnw1xznzUddGQugdCoIywiBbKCfS6ppI6diH66Hd3YfDtIbV3nZdNZ-60w68ZoHDa6fyd5SesXI2crqGIPdkvFKnt2mAozVRIOH1g5bz2UCEN34yEuyxlqgsAJxiDTcOBz8dxqpC8oxwPaprmCWRvUaR2cYpB7OsEHBLyVs8LpMr0k-QDXhn0uVfM")' }}
                                    ></div>
                                    <span className="font-medium text-white">Power Drill 18V</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">Mark Wahlberg</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-400/10 text-red-400">
                                    <span className="size-1.5 rounded-full bg-red-400"></span>
                                    Cancelled
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right text-white font-medium">$199.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
