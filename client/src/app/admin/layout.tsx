import { Inter } from 'next/font/google';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/TopBar';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex h-screen w-full flex-row overflow-hidden ${inter.className} bg-background-light dark:bg-background-dark`}>
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
                <TopBar />
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className=" mx-10 my-4 flex flex-col gap-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
