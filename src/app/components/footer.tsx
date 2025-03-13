
export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-6 px-4 md:px-8 w-full flex flex-col items-center">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">© {new Date().getFullYear()} Your Website. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    );
}

