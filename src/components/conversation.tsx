'use client';
import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";



export function Conversation() {
    const conversation = useConversation({
        onConnect: () => console.log('Yhdistetty'),
        onDisconnect: () => console.log('Katkaistu yhteys'),
        onMessage: (message) => console.log('Viesti:', message),
        onError: (error) => console.error('Virhe:', error),
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    const startConversation = useCallback(async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            await conversation.startSession({
                agentId: 'WLuieLxU04tbtp8gbRYU',
            });

        } catch (error) {
            console.error('Keskustelun käynnistäminen epäonnistui:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();

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
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                            className="h-2.5 rounded-full bg-blue-500 transition-all"

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
