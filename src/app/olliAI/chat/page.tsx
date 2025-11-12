'use client';
import * as CryptoJS from "crypto-js";
import { useState, useEffect } from "react";
import { Conversation } from "@/components/conversation";
import { motion } from "framer-motion";
import { Lock, LogOut } from "lucide-react";

const correctPasswordHash = CryptoJS.SHA256("GambiinaJaMonster").toString();

const Home = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        const enteredPasswordHash = CryptoJS.SHA256(password).toString();
        if (enteredPasswordHash === correctPasswordHash) {
            setMessage("Access granted to ElevenLabs AI!");
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        } else {
            setMessage("Incorrect password. Access denied.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
            {!isLoggedIn ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 p-8 rounded-2xl shadow-lg text-center max-w-md w-full"
                >
                    <Lock size={48} className="text-blue-600 mx-auto mb-4" />
                    <h1 className="text-xl font-semibold mb-2">Anna Beta Avain</h1>
                    <p className="text-gray-500 mb-4">Jotta voit käyttää OLLIAI:ta, tarvitset avaimen. Jos sinulla ei ole avainta, ota yhteyttä</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Anna Beta Avain"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-lg transition"
                    >
                        Kirjaudu
                    </button>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-6 bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md w-full"
                >
                    <Conversation />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Home;
