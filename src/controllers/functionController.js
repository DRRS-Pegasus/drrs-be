const asyncHandler = require("express-async-handler");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const reservationReminderEmail = asyncHandler(async (req, res) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "DRRS <drrs.pegasus@gmail.com>",
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
    };

    const sendMail = async (transporter, mailOptions, minutesDelay) => {
        try {
            const id = setTimeout(async () => {
                const info = await transporter.sendMail(mailOptions);
                console.log("Message sent: " + info.messageId);
                clearTimeout(id);
            }, minutesDelay * 60000)
        } catch (error) {
            console.error(error);
        }
    };

    await sendMail(transporter, mailOptions, req.body.minutesDelay);
    res.status(200).json({ ...req.body, "message": "success" });
});

module.exports = {
    reservationReminderEmail
}