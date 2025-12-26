'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Headset, Loader2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';
import chatService, { ChatMessage } from '@/services/chatService';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

const ChatPopup = () => {
    const { user } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Only show for logged-in users who are NOT admins
    if (!user || user.role === 'admin') return null;

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const connectSocket = () => {
        setIsConnecting(true);
        const socket = io(SOCKET_URL, {
            auth: { token: user.token }
        });

        socket.on('connect', () => {
            console.log('Connected to chat server');
            setIsConnecting(false);
            socket.emit('join_room', user._id);
        });

        socket.on('receive_message', (message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
            scrollToBottom();

            // Mark as read if window is open
            if (isOpen && message.to._id === user._id) {
                chatService.markAsRead(user._id);
            }
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnecting(false);
        });

        socketRef.current = socket;
    };

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const history = await chatService.getMessages(user._id);
            setMessages(history);
            scrollToBottom();
            chatService.markAsRead(user._id);
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && !socketRef.current && user) {
            connectSocket();
            fetchHistory();
        }
        // Cleanup socket on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [isOpen, user]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !socketRef.current) return;

        socketRef.current.emit('send_message', {
            roomId: user._id,
            text: inputText,
            // 'to' field is handled by backend if missing (finding admin)
        });

        setInputText('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 mb-4"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Headset size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Support Chat</h3>
                                    <p className="text-xs text-white/80">We're online to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                </div>
                            ) : (
                                <>
                                    {messages.length === 0 && (
                                        <div className="text-center py-10 opacity-50">
                                            <MessageCircle size={40} className="mx-auto mb-2" />
                                            <p className="text-sm">Start a conversation with our team</p>
                                        </div>
                                    )}
                                    {messages.map((msg, index) => {
                                        const isMe = msg.from._id === user._id;
                                        return (
                                            <div
                                                key={msg._id || index}
                                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isMe
                                                    ? 'bg-primary text-white rounded-tr-none'
                                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm rounded-tl-none border border-slate-100 dark:border-slate-700'
                                                    }`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="bg-primary text-white p-2 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center p-4 rounded-full shadow-lg transition-all ${isOpen
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatPopup;
