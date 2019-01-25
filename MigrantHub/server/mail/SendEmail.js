"use strict";
const nodemailer = require("nodemailer");
const { emailConfig } = require('../config');

module.exports = {
    async sendEmail(receiverEmail, subject, message) {
        let transporter = nodemailer.createTransport({
            service: 'Hotmail',
            auth: {
                user: emailConfig.email,
                pass: emailConfig.password
            }
        });

        let mailOptions = {
            from: emailConfig.email,
            to: receiverEmail,
            subject: subject,
            text: message,
            html: `<b>${message}</b>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    },
};
