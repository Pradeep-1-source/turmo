export const DEFAULT_WHATSAPP_NUMBER = '919884449843';

/**
 * Generates a direct WhatsApp URL with pre-filled enquiry message for a specific product
 */
export function generateWhatsAppProductEnquiry(
  productTitle: string,
  whatsappNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Clean phone number (remove non-digits, ensure country code)
  const cleanNumber = whatsappNumber.replace(/\D/g, '');

  const message = `Hello Urban Fresh,

I am interested in:
${productTitle}

Please share the following details:
• Product specifications
• MOQ
• Pricing
• Packaging options
• Export availability

Thank you.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp export enquiry URL
 */
export function generateWhatsAppGeneralEnquiry(
  subject?: string,
  whatsappNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');

  const message = subject
    ? `Hello Urban Fresh,

I would like to enquire regarding:
${subject}

Please share your export catalogue, pricing, and availability details.

Thank you.`
    : `Hello Urban Fresh,

I am interested in sourcing premium Indian agricultural products for global export.

Please share your latest product catalogue, available specifications, and minimum order quantities (MOQ).

Thank you.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
