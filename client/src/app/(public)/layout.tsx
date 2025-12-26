import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatPopup from '@/components/chat/ChatPopup';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatPopup />
        </div>
    );
}
