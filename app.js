const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// GUIDE
const html = `
    <h1>Kamusta mundo!</h1>
    <p>Nodemailer enjoyer</p>
`;

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
    to: "ADD YOUR EMAIL HERE",
    subject: "testing drrs",
    html: html,
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

sendMail(transporter, mailOptions, 1);