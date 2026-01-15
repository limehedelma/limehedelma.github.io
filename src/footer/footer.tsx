import React from 'react';

interface FooterLink {
    href: string;
    label: string;
}

const links: FooterLink[] = [
    { href: 'https://limehedelma.itch.io/', label: 'Itch.io' },
    { href: 'mailto:limehedelma@gmail.com', label: 'Email' },
    { href: 'https://discord.com/users/534676989198729217', label: 'Discord' },
    { href: 'https://github.com/limehedelma', label: 'Github' },
];

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black p-4 flex justify-center mt-auto shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="-bordered label button -blink no-underline text-inherit"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;