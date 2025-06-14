const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
  try {
    const data = await resend.emails.send({
      from: 'Dormify <onboarding@resend.dev>',
      to,
      subject,
      html
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Email failed:', error);
  }
}

module.exports = sendEmail;
