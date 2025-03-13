
export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-6 px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-full flex justify-center md:justify-start">
                <p className="text-sm text-center">
                    © {new Date().getFullYear()} Page by Emil Vento
                </p>
            </div>
            <div className="flex space-x-6 items-center mt-4 md:mt-0 justify-end">
                <a href="https://github.com/limehedelma" aria-label="GitHub" className="transform hover:scale-110 transition-transform duration-300">
                    <img src="github-icon.svg" alt="GitHub" width="25" />
                </a>
                <a href="mailto:lime.vento@outlook.com" aria-label="Email" className="transform hover:scale-110 transition-transform duration-300">
                    <img src="email-icon.svg" alt="Email" width="25" />
                </a>
                <a href="http://discord.com/users/534676989198729217" aria-label="Discord" className="transform hover:scale-110 transition-transform duration-300">
                    <img src="discord-icon.svg" alt="Discord" width="25" />
                </a>
            </div>
        </footer>










    );
}

