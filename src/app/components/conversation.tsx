'use client';
import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";

const TIME_LIMIT = 120; // 2 minutes in seconds

export function Conversation() {
    const conversation = useConversation({
        onConnect: () => console.log('Yhdistetty'),
        onDisconnect: () => console.log('Katkaistu yhteys'),
        onMessage: (message) => console.log('Viesti:', message),
        onError: (error) => console.error('Virhe:', error),
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

    const startConversation = useCallback(async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            await conversation.startSession({
                agentId: 'WLuieLxU04tbtp8gbRYU',
            });

            setTimeLeft(TIME_LIMIT);

            // Start the countdown
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        stopConversation();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Set a timeout to stop conversation after 2 minutes
            timeoutRef.current = setTimeout(() => {
                stopConversation();
            }, TIME_LIMIT * 1000);
        } catch (error) {
            console.error('Keskustelun käynnistäminen epäonnistui:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeLeft(0);
    }, [conversation]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className="p-6 max-w-sm mx-auto shadow-lg rounded-2xl bg-white border flex flex-col items-center gap-4">
            <motion.div
                animate={{ scale: conversation.isSpeaking ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: conversation.isSpeaking ? Infinity : 0, duration: 0.5 }}
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
            >
                {conversation.status === 'connected' ? <Mic size={32} /> : <MicOff size={32} />}
            </motion.div>
            <p className="text-lg font-semibold">Tila: {conversation.status === 'connected' ? 'Yhdistetty' : 'Ei yhdistetty'}</p>
            <p className="text-sm text-gray-600">
                OlliAI {conversation.isSpeaking ? 'puhuu...' : 'kuuntelee...'}
            </p>

            {conversation.status === 'connected' && (
                <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-700">
                        Aikaa jäljellä: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                            className="h-2.5 rounded-full bg-blue-500 transition-all"
                            style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="flex gap-3 mt-3">
                <button
                    onClick={startConversation}
                    disabled={conversation.status === 'connected'}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded disabled:bg-gray-300"
                >
                    {conversation.status === 'connecting' ? <Loader2 className="animate-spin" /> : 'Aloita keskustelu'}
                </button>
                <Link href="/olliAI/Homepage">
                    <button
                        onClick={stopConversation}
                        disabled={conversation.status !== 'connected'}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white rounded disabled:bg-gray-300"
                    >
                        Lopeta keskustelu
                    </button>
                </Link>
            </div>
        </div>
    );
}
