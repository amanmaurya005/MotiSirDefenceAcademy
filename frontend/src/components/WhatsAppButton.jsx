import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { academyConfig } from '../data/config';

const WhatsAppButton = () => (
  <a
    className="whatsapp-float"
    href={`https://wa.me/${academyConfig.whatsappNumber}?text=Hello%20Moti%20sir%20defence%20academy%2C%20I%20want%20to%20join.`}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
    <FaWhatsapp />
    <span>Chat with us on WhatsApp</span>
  </a>
);

export default WhatsAppButton;
