'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useTranslation();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    return (
        <aside className="hidden md:flex flex-col w-72 h-full border-r border-white/10 bg-background-dark flex-shrink-0">
            <div className="flex flex-col h-full p-4">
                {/* Brand */}
                <div className="flex items-center gap-3 px-2 mb-8 mt-2">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-3xl">bolt</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-lg font-bold leading-none tracking-tight">{t('admin.sidebar.brand.title')}</h1>
                        <p className="text-gray-400 text-xs font-medium mt-1">{t('admin.sidebar.brand.subtitle')}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 flex-1">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin') && pathname === '/admin' // Exact match for dashboard root
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin') && pathname === '/admin' ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            dashboard
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin') && pathname === '/admin' ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.dashboard')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/products"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/products')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/products') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            inventory_2
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/products') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.products')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/categories"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/categories')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/categories') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            grid_view
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/categories') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.categories')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/brands"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/brands')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/brands') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            verified
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/brands') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.brands')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/orders"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/orders')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/orders') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            shopping_cart
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/orders') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.orders')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/customers"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/customers')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/customers') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            group
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/customers') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.customers')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/messages"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/messages')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/messages') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            chat
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/messages') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.messages')}
                        </span>
                    </Link>



                    <Link
                        href="/admin/jobs"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/jobs')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/jobs') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            schedule
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/jobs') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.jobs')}
                        </span>
                    </Link>

                    <Link
                        href="/admin/portfolio"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/portfolio')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/portfolio') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            work
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/portfolio') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.portfolio')}
                        </span>
                    </Link>

                    <div className="my-4 border-t border-white/10"></div>

                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors border-l-4 ${isActive('/admin/settings')
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-white/5 border-transparent'
                            } group`}
                    >
                        <span
                            className={`material-symbols-outlined group-hover:text-white ${isActive('/admin/settings') ? 'text-primary' : 'text-gray-400'
                                }`}
                        >
                            settings
                        </span>
                        <span
                            className={`font-medium text-sm group-hover:text-white ${isActive('/admin/settings') ? 'text-white' : 'text-gray-300'
                                }`}
                        >
                            {t('admin.sidebar.settings')}
                        </span>
                    </Link>
                </nav>

                {/* User Profile (Bottom Sidebar) */}
                <div className="mt-auto flex items-center gap-3 p-3 rounded-xl bg-card-dark border border-white/5">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-white/10"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBq_-oxROBy13n0pLHoWq1xwK-7c2YkJRgYuwAC9Z300gidVXH7ZCHKGGobSqiK_Otd3NgWblaLK63ntecUbXgQQYYz7rrDWwXSRl4dU6cpTZu7SLpJ9KcTNp4vXtusImJDT1MWTDHg8Ba6ddREbqfyVpRuAZJ4XPnkQGC3GiCpcNK_UkMsVxxYWdIK7SR61rOHIbiI6n5mIyBIaSMrC_qd283j2aXwQo40pJmm-6qqOANLyaeo17k8NfF20QbvOpqmLkaLx2j59lI")',
                        }}
                    ></div>
                    <div className="flex flex-col flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">Alex Morgan</p>
                        <p className="text-primary text-xs truncate">Super Admin</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined text-xl">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
