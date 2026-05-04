import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export const BUSINESS_PHONE = "+40769129126";
export const BUSINESS_PHONE_DISPLAY = "+40 769 129 126";
export const WHATSAPP_NUMBER = "40769129126";

export const telHref = `tel:${BUSINESS_PHONE}`;
export const whatsappHref = (msg = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

export function CallIcon(props) { return <Phone {...props} />; }
export function WhatsAppIcon(props) { return <MessageCircle {...props} />; }
