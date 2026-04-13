import { useEffect } from "react";

export default function NoupeChatbot() {
  useEffect(() => {
    // Check if the script is already added
    const existingScript = document.querySelector('script[src*="noupe.com"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://www.noupe.com/embed/019d81f0c0b7746a98004b209ff038ea3ccc.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount if needed
      // document.body.removeChild(script);
    };
  }, []);

  return null; // This component only manages the script injection
}
