

const nodemailer = require('nodemailer');
const { emailConfig } = require('../config');

module.exports = {
  async sendEmail(receiverEmail, subject, message) {
    const transporter = nodemailer.createTransport({
      service: 'Hotmail',
      auth: {
        user: emailConfig.email,
        pass: emailConfig.password,
      },
    });

    const mailOptions = {
      from: emailConfig.email,
      to: receiverEmail,
      subject,
      text: message,
      html: `<b>${message}</b>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  },
};
