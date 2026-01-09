"use client";

import { useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface NotificationPayload {
    body: string;
    [key: string]: unknown;
}

export default function SocketListener() {
    const socket = useSocket();
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Socket connected');
            if (user) {
                // Join user specific room
                socket.emit('join_room', user._id);
                // If admin, join admin room? Usually handled by backend logic (server autojoins based on token)
                // But if explicit join needed:
                if (user.role === 'admin') {
                     // backend usually handles this via token or explicit join
                }
            }
        });

        socket.on('new_notification', (notification: NotificationPayload) => {
            toast(notification.body, {
                icon: '🔔',
                duration: 5000,
            });
        });

        socket.on('new_product', (product: { name: string }) => {
             toast(`New product available: ${product.name}`, {
                 icon: '🆕',
                 duration: 6000,
             });
        });

        socket.on('order_status_updated', () => {
             // This might be redundant if covered by 'new_notification'
             // But if specific UI update needed:
             // invalidate queries?
        });

        return () => {
            socket.off('connect');
            socket.off('new_notification');
            socket.off('new_product');
            socket.off('order_status_updated');
        };
    }, [socket, user, router]);

    return null;
}
