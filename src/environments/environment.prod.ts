export const environment = {
  production: true,
  emailjs: {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    serviceId: process.env.EMAILJS_SERVICE_ID,
  },
};
