import whatsappIcon from "../assets/icons8-whatsapp-48.png";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/918667825086"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <img src={whatsappIcon} alt="WhatsApp" className="w-8 h-8 object-contain" />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-background text-foreground text-sm rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-border">
                Chat with us
            </div>
        </a>
    );
}
