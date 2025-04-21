import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { type BreadcrumbItem } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cypher',
        href: '/chat',
    },
];

export default function Chat() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const userMsg = input;
        setMessages((prev) => [...prev, { sender: 'User', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/chat/response', { message: userMsg });
            setMessages((prev) => [
                ...prev,
                { sender: 'Bot', text: response.data.response },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: 'Bot', text: '😔 Oops! Something went wrong. Try again later.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cypher" />
            <div className="flex flex-col h-screen bg-[#121212] text-[#EDEDEC]">
                <div className="px-4 py-3 bg-[#1E1E1E] border-b border-[#333] text-lg font-semibold">
                    🤖 Chat with Cypher
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex items-end space-x-2 max-w-md">
                                {message.sender === 'Bot' && (
                                    <div className="w-8 h-8 bg-[#00BFFF] text-white flex items-center justify-center rounded-full text-sm">
                                        🤖
                                    </div>
                                )}

                                <div
                                    className={`px-4 py-3 rounded-xl shadow-md transition-all duration-300 text-sm ${
                                        message.sender === 'User'
                                            ? 'bg-[#00BFFF] text-white rounded-br-none'
                                            : 'bg-[#2A2A2A] text-[#EDEDEC] rounded-bl-none'
                                    }`}
                                >
                                    {message.sender === 'Bot' ? (
                                        <div className="prose prose-invert max-w-none text-sm">
                                            <ReactMarkdown
                                                children={message.text}
                                                remarkPlugins={[remarkGfm]}
                                            />
                                        </div>
                                    ) : (
                                        message.text
                                    )}
                                </div>

                                {message.sender === 'User' && (
                                    <div className="w-8 h-8 bg-[#00BFFF] text-white flex items-center justify-center rounded-full text-sm">
                                        🧑
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#00BFFF] text-white flex items-center justify-center rounded-full text-sm">
                                    🤖
                                </div>
                                <div className="px-4 py-3 rounded-xl bg-[#2A2A2A] text-[#EDEDEC] text-sm">
                                    Typing...
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="sticky bottom-0 flex items-center gap-3 px-4 py-3 bg-[#1E1E1E] border-t border-[#333]">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Say something friendly..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                        }}
                        className="flex-1 px-4 py-2 text-sm text-[#121212] bg-white rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-[#00BFFF] text-white rounded-lg hover:bg-[#0099cc] transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
