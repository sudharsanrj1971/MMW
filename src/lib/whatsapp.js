// WhatsApp automated enquiry helper for Manish Metal Works
export const openWhatsApp = (options = {}) => {
  const phone = '919585123459';
  
  let text = '🕉️ *VANAKKAM MANISH METAL WORKS*\n';
  text += '------------------------------------------\n';
  text += '*NEW SHOWROOM ENQUIRY*\n\n';
  
  if (typeof options === 'string') {
    text += `*Requirement:* ${options}\n`;
  } else if (options && typeof options === 'object') {
    if (options.name) {
      text += `👤 *Client Name:* ${options.name}\n`;
    }
    if (options.phone) {
      text += `📞 *Contact Number:* ${options.phone}\n`;
    }
    if (options.model) {
      text += `🪔 *Lamp Model:* ${options.model}\n`;
    }
    if (options.size) {
      text += `📏 *Desired Height / Scale:* ${options.size}\n`;
    }
    if (options.finish) {
      text += `✨ *Metallurgical Finish:* ${options.finish}\n`;
    }
    if (options.crown) {
      text += `👑 *Crown / Mukha:* ${options.crown}\n`;
    }
    if (options.quantity) {
      text += `🔢 *Quantity:* ${options.quantity}\n`;
    }
    if (options.requirements || options.message) {
      text += `📝 *Custom Notes / Requirements:* ${options.requirements || options.message}\n`;
    }
  }

  text += '\n------------------------------------------\n';
  text += '📍 *Foundry Address:* \nMr Vinoth, Manish metalworks,\nNadukammala theru, Natchiyarkovil, Kumbakonam, Thanjavur ( dt).\n';
  text += '\nPlease share details regarding availability, craft timeline, and delivery.';

  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  
  // Open in new tab / WhatsApp application
  window.open(url, '_blank', 'noopener,noreferrer');
};
