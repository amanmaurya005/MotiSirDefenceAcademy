import nodemailer from 'nodemailer';

const recipientEmail = process.env.CONTACT_EMAIL_TO || 'rathoremotisingh651@gmail.com';

const getTransportConfig = () => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) return null;

  if (process.env.SMTP_HOST) {
    return {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    };
  }

  return {
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  };
};

const buildText = (enquiry) => [
  'New contact enquiry received:',
  '',
  `Name: ${enquiry.name}`,
  `Phone: ${enquiry.phone}`,
  `Email: ${enquiry.email}`,
  `Course: ${enquiry.course}`,
  '',
  'Message:',
  enquiry.message,
  '',
  `Submitted at: ${enquiry.createdAt.toISOString()}`
].join('\n');

const buildHtml = (enquiry) => `
  <h2>New contact enquiry received</h2>
  <p><strong>Name:</strong> ${enquiry.name}</p>
  <p><strong>Phone:</strong> ${enquiry.phone}</p>
  <p><strong>Email:</strong> ${enquiry.email}</p>
  <p><strong>Course:</strong> ${enquiry.course}</p>
  <p><strong>Message:</strong></p>
  <p>${enquiry.message.replace(/\n/g, '<br>')}</p>
  <p><strong>Submitted at:</strong> ${enquiry.createdAt.toISOString()}</p>
`;

export const sendEnquiryEmail = async (enquiry) => {
  const transportConfig = getTransportConfig();

  if (!transportConfig) {
    return {
      sent: false,
      skipped: true,
      reason: 'SMTP_USER and SMTP_PASS are not configured.'
    };
  }

  const transporter = nodemailer.createTransport(transportConfig);
  const fromEmail = process.env.MAIL_FROM || `"Moti Sir Defence Academy" <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from: fromEmail,
    to: recipientEmail,
    replyTo: enquiry.email,
    subject: `New enquiry from ${enquiry.name}`,
    text: buildText(enquiry),
    html: buildHtml(enquiry)
  });

  return { sent: true, skipped: false };
};
