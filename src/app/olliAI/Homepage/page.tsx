import React from "react";
import Link from "next/link";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-white text-gray-900 p-4">
            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-5xl font-bold mb-6 tracking-wide text-gray-800">OLLIAI</h1>
                <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
                    Sinun oma koodiopettaja. OLLIAI auttaa sinua pulmassa kuin pulmassa. Oli se sitten Unity taikka PHP.
                </p>
                <p className="text-md text-gray-500 mb-8 text-center max-w-3xl">
                    Olli AI luotiin helpottamaan koodausta kaikentasoisille kehittäjille. Olitpa sitten aloittelija, joka yrittää ymmärtää perusteita, tai ammattilainen, joka etsii nopeita ratkaisuja, Olli AI tarjoaa välitöntä ja älykästä apua. Kehittyneen tekoälyteknologian avulla se tehostaa koodausta, virheiden korjausta ja oppimista.
                </p>
                <p className="text-md text-gray-500 mb-8 text-center max-w-3xl">
                    OLLIAI on tällä hetkellä suljetussa Betassa. Jos haluat päästä kokeilemaan uuden sukupolven koodausapua ota yhteyttä meihin.
                </p>
                <Link href="/olliAI/chat" target="_blank">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-lg">
                        Open App
                    </button>
                </Link>
            </div>
            <footer className="w-full text-center py-6 border-t border-gray-300 text-gray-500 bg-gray-50 shadow-inner">
                <p className="text-sm uppercase tracking-wider text-gray-600">SINUN KOODIOPETTAJASI</p>
                <p className="mt-2 text-gray-500">© {new Date().getFullYear()} Olli AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

