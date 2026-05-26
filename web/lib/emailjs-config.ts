import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// Replace with your actual EmailJS public key
export const initEmailJS = () => {
  emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Get from https://dashboard.emailjs.com/
};

export const sendEmail = async (
  email: string,
  name?: string
) => {
  try {
    const templateParams = {
      to_email: email,
      user_email: email,
      user_name: name || 'Cliente',
      message: 'Gracias por descargar nuestra guía sobre semanas cotizadas. Pronto recibirás más información en tu correo.',
    };

    // Replace with your actual service ID and template ID
    await emailjs.send(
      'YOUR_SERVICE_ID_HERE', // Get from EmailJS dashboard
      'YOUR_TEMPLATE_ID_HERE', // Get from EmailJS dashboard
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
