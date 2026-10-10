/**
 * Email Enquiry Link Generator for Urban Fresh B2B Catalogue
 * Standard mailto generator ensuring clean URL encoding and dynamic product subjects
 */

export function generateEmailProductEnquiry(productTitle: string, email?: string): string {
  const cleanEmail = email?.trim() || '';
  if (!cleanEmail || !cleanEmail.includes('@')) return '';
  const subject = `Product Enquiry – ${productTitle}`;
  const body = `Hello Urban Fresh Team,

I am interested in the following product:

Product: ${productTitle}

Please share the available product specifications, minimum order quantity, pricing, packaging options, and export availability.

Thank you.`;

  return `mailto:${cleanEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generateEmailGeneralEnquiry(
  subjectTitle = 'Export Trade Consultation',
  email?: string
): string {
  const cleanEmail = email?.trim() || '';
  if (!cleanEmail || !cleanEmail.includes('@')) return '';
  const subject = `Trade Enquiry – ${subjectTitle}`;
  const body = `Hello Urban Fresh Team,

I am interested in sourcing agricultural and food products from Urban Fresh.

Please share details regarding your export product catalogue, minimum order quantities (MOQ), and shipping specifications.

Thank you.`;

  return `mailto:${cleanEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
