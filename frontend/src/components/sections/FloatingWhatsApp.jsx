import React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/translations";

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noreferrer"
    data-testid="whatsapp-float-btn"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 end-5 z-50 w-14 h-14 rounded-full grid place-items-center text-[#04111F] aa-pulse"
    style={{
      background: "linear-gradient(135deg, #2EE177 0%, #25D366 100%)",
      boxShadow:
        "0 12px 30px -8px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
    }}
  >
    <MessageCircle size={24} strokeWidth={2.2} />
  </a>
);

export default FloatingWhatsApp;
