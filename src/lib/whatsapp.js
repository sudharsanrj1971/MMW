// WhatsApp automated enquiry helper for Manish Metal Works

/**
 * Normalizes an Indian phone number to +91XXXXXXXXXX format.
 * Examples:
 * 9898989898 -> +919898989898
 * +919898989898 -> +919898989898
 * 919898989898 -> +919898989898
 * +91 98989 89898 -> +919898989898
 */
export const normalizeIndianPhone = (phone) => {
  if (!phone) return '';
  
  // 1. Strip spaces, hyphens, parentheses, and dots
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  
  // 2. Normalize leading zeros if present
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  
  // 3. Extract digits
  const hasPlus = cleaned.startsWith('+');
  const digits = cleaned.replace(/\D/g, '');
  
  if (hasPlus) {
    if (digits.startsWith('91')) {
      return '+' + digits;
    } else {
      return '+91' + digits;
    }
  } else {
    if (digits.startsWith('91') && digits.length > 10) {
      return '+' + digits;
    } else {
      return '+91' + digits;
    }
  }
};

/**
 * Builds a professional showroom enquiry message for WhatsApp.
 */
export const buildEnquiryMessage = (options = {}) => {
  const isCustom = options.type === 'custom' || !!(options.size || options.finish || options.crown || options.isCustomOrder);
  const isContact = options.type === 'contact' || (!!options.message && !options.size && !options.finish);

  let text = '🕉️ *VANAKKAM MANISH METAL WORKS*\n\n';
  text += '------------------------------------------\n\n';

  if (isCustom) {
    text += '*NEW CUSTOM LAMP ENQUIRY*\n\n';
    text += 'Dear Manish Metal Works Team,\n\n';
    text += 'I would like to enquire about a custom Kuthu Vilakku order.\n\n';
    text += '*Enquiry Details:*\n\n';

    if (options.size && options.size.trim() !== '') {
      text += `📏 *Desired Height / Scale:* ${options.size.trim()}\n\n`;
    }
    if (options.finish && options.finish.trim() !== '') {
      text += `✨ *Finish:* ${options.finish.trim()}\n\n`;
    }
    
    // Support crown passed separately or embedded in quantity
    let crownVal = options.crown;
    let qtyVal = options.quantity;
    if (qtyVal && typeof qtyVal === 'string' && qtyVal.includes('(Crown:')) {
      const match = qtyVal.match(/\(Crown:\s*(.*?)\)/);
      if (match && match[1]) {
        crownVal = match[1];
      }
      qtyVal = qtyVal.replace(/\s*\(Crown:.*?\)/, '');
    }

    if (crownVal && crownVal.trim() !== '') {
      text += `👑 *Crown / Design:* ${crownVal.trim()}\n\n`;
    }
    if (qtyVal && String(qtyVal).trim() !== '') {
      text += `🔢 *Quantity:* ${String(qtyVal).trim()}\n\n`;
    }
    if (options.requirements && options.requirements.trim() !== '') {
      text += `📝 *Custom Requirements:* ${options.requirements.trim()}\n\n`;
    }

    text += '------------------------------------------\n\n';
    text += 'Kindly provide the availability, estimated craftsmanship timeline, quotation, and delivery details for this requirement.\n\n';
  } else if (isContact) {
    text += '*NEW SHOWROOM ENQUIRY*\n\n';
    text += 'Dear Manish Metal Works Team,\n\n';
    text += 'I would like to enquire about your Kuthu Vilakku / custom light lamp products.\n\n';
    text += `📝 *Enquiry Details:*\n${options.message.trim()}\n\n`;
    text += '------------------------------------------\n\n';
    text += 'Kindly share the relevant product details, availability, quotation, craftsmanship timeline, and delivery information.\n\n';
  } else {
    // Default showroom enquiry
    text += '*NEW SHOWROOM ENQUIRY*\n\n';
    text += 'Dear Manish Metal Works Team,\n\n';
    text += 'I would like to enquire about your traditional Kuthu Vilakku / custom light lamp collection.\n\n';
    
    // Check if any loose specifications were passed (e.g. from general list or single item selection)
    const hasAnyField = options.model || options.size || options.finish || options.crown || options.quantity || options.requirements;
    if (hasAnyField) {
      text += '*Enquiry Details:*\n\n';
      if (options.model && options.model.trim() !== '') {
        text += `🪔 *Lamp Model:* ${options.model.trim()}\n\n`;
      }
      if (options.size && options.size.trim() !== '') {
        text += `📏 *Desired Height / Scale:* ${options.size.trim()}\n\n`;
      }
      if (options.finish && options.finish.trim() !== '') {
        text += `✨ *Finish:* ${options.finish.trim()}\n\n`;
      }
      if (options.crown && options.crown.trim() !== '') {
        text += `👑 *Crown / Design:* ${options.crown.trim()}\n\n`;
      }
      if (options.quantity && String(options.quantity).trim() !== '') {
        text += `🔢 *Quantity:* ${String(options.quantity).trim()}\n\n`;
      }
      if (options.requirements && options.requirements.trim() !== '') {
        text += `📝 *Custom Requirements:* ${options.requirements.trim()}\n\n`;
      }
      text += '------------------------------------------\n\n';
      text += 'Kindly provide the available options, quotation, estimated craftsmanship timeline, and delivery details.\n\n';
    } else {
      text += 'Kindly share the available models, specifications, pricing, craftsmanship timeline, and delivery details.\n\n';
    }
  }

  text += 'Thank you.\n\n';
  text += 'Regards,\n';
  text += isCustom ? 'Custom Order Enquiry' : 'Showroom Enquiry';

  return text;
};

export const openWhatsApp = (options = {}) => {
  const phone = '919585123459'; // Preserved official recipient business number
  
  let messageText = '';
  if (typeof options === 'string') {
    // String message triggers default showroom enquiry
    messageText = buildEnquiryMessage();
  } else if (options && typeof options === 'object') {
    messageText = buildEnquiryMessage(options);
  } else {
    messageText = buildEnquiryMessage();
  }

  const encoded = encodeURIComponent(messageText);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  
  window.open(url, '_blank', 'noopener,noreferrer');
};
