import { motion } from "framer-motion";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function SocialFloatingIcons() {
    const socialIcons = [
        {
            name: "WhatsApp",
            icon: <MessageCircle className="w-6 h-6" />,
            color: "bg-[#25D366]",
            href: "https://wa.me/918667825086",
            label: "Chat with us",
        },
        {
            name: "Facebook",
            icon: <Facebook className="w-6 h-6" />,
            color: "bg-[#1877F2]",
            href: "https://facebook.com/drizzledrop", // Placeholder
            label: "Follow on Facebook",
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-6 h-6" />,
            color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
            href: "https://instagram.com/drizzledrop", // Placeholder
            label: "Follow on Instagram",
        },
    ];

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3">
            {socialIcons.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.5 + socialIcons.indexOf(social) * 0.1
                    }}
                    whileHover={{ scale: 1.15, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-12 ${social.color} text-white rounded-full shadow-lg flex items-center justify-center group`}
                    aria-label={social.label}
                >
                    {social.icon}

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-widest rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-border/50 scale-90 group-hover:scale-100 origin-right">
                        {social.label}
                    </div>
                </motion.a>
            ))}
        </div>
    );
}
