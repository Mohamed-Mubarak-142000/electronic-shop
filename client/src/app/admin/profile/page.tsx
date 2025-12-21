import Link from 'next/link';
import ProfileForm from '@/components/admin/ProfileForm';

export default function ProfilePage() {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="flex justify-center py-8 px-4 md:px-10 lg:px-40">
                <div className="flex flex-col max-w-[1024px] flex-1 gap-6 w-full">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 px-4">
                        <Link href="/admin" className="text-gray-400 text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                        <span className="text-gray-400 text-sm font-medium">/</span>
                        <span className="text-gray-400 text-sm font-medium hover:text-primary transition-colors cursor-pointer">Portfolio</span>
                        <span className="text-gray-400 text-sm font-medium">/</span>
                        <span className="text-white text-sm font-medium">Edit Profile</span>
                    </div>

                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between gap-3 px-4">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Edit Profile</h1>
                            <p className="text-gray-400 text-base font-normal">Manage your public persona, expertise, and contact details seen by customers.</p>
                        </div>
                        <div className="flex gap-3 items-end">
                            <button className="flex items-center justify-center rounded-lg h-10 px-6 border border-white/10 bg-transparent text-white hover:bg-white/10 transition-colors font-bold text-sm">
                                Cancel
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-black hover:bg-green-400 transition-colors font-bold text-sm shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <ProfileForm />

                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
}
