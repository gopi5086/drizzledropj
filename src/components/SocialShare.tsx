import { Facebook, Twitter, Linkedin, Share2, MessageCircle } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877F2"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "#1DA1F2"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25D366"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "#0A66C2"
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-8 border-t border-b border-border/50 my-12">
      <div className="flex items-center gap-3">
        <Share2 className="w-5 h-5 text-[#C5A861]" />
        <span className="text-sm font-bold uppercase tracking-widest text-foreground">Share this Article</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {shares.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            title={`Share on ${s.name}`}
          >
            <s.icon className="w-4 h-4 transition-colors" style={{ color: s.color }} />
            <span className="text-xs font-medium group-hover:text-primary transition-colors">{s.name}</span>
          </a>
        ))}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 hover:border-primary/50 transition-all duration-300 bg-primary/5 group"
          >
            <Share2 className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">More Options</span>
          </button>
        )}
      </div>
    </div>
  );
}
