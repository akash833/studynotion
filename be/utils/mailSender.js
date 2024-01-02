const nodemailer = require("nodemailer");

// subject is string and body is html doc

const mailSender = async (email,subject,body) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Study Notion",
      to: email,
      subject: subject,
      html: body,
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = mailSender;