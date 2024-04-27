import asyncHandler from "express-async-handler";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";

import { deleteReservationEvent, getReservationEventById } from "../firesbase/dbHandler.js";
dotenv.config();

/**
 * @param {string} reqBodyTo
 * @param {string} reqBodySubject
 * @param {string} reqBodyHtml
 * @param {number} reqBodyMinutesDelay
 * @returns {void}
 */
export const reservationReminderEmail = asyncHandler(async (req, res) => {
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
            setTimeout(async () => {
                const info = await transporter.sendMail(mailOptions);
                console.log("Message sent: " + info.messageId);
            }, minutesDelay * 60000)
        } catch (error) {
            console.error(error);
        }
    };

    await sendMail(transporter, mailOptions, req.body.minutesDelay);
    res.status(200).json({ ...req.body, "message": "success email scheduled" });
});

/**
 * @param {string} reqBodytoken
 * @param {string} reqBodyEventId
 * @param {string} reqBodyTo
 * @param {string} reqBodySubject
 * @param {string} reqBodyHtml
 * @param {number} reqBodyMinutesDelay
 * @returns {void}
 */
export const autoCancellation = asyncHandler(async (req, res) => {
    // const token = req.headers.get("Authorization");
    // console.log("TOKEN");
    // console.log(token);
    // console.log("HEADERS");
    // console.log(req.headers.authorization);
    // return res.status(200);
    // console.log("BODY");
    // console.log(req.body);

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

    const sendMail = async (transporter, mailOptions) => {
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Cancelled reservation message sent: " + info.messageId);
        } catch (error) {
            console.error(error);
        }
    };

    const url = `https://firestore.googleapis.com/v1/projects/drr-system/databases/(default)/documents/reservation-event/${req.body.eventId}`;
    const token = req.headers.authorization;

    // test for errors if res event is present in firestore
    // console.log("CHECK URL");
    // console.log(url);
    // console.log("CHECK TOKEN");
    // console.log(token);

    // const axi = await axios.get(url, { headers: { Authorization: token } });
    // console.log("AXII START");
    // console.log(axi.data.fields);
    // const resEvent = axi.data.fields;
    // console.log("RES EVENT TITLE");
    // console.log(resEvent.title.stringValue);
    // console.log(resEvent);
    // const resEventId = resEvent.event_id.stringValue;

    setTimeout(async () => {
        try {
            const axi = await axios.get(url, { headers: { Authorization: token } });
            const resEvent = axi.data.fields;
            const resEventTitle = resEvent.title.stringValue;

            if (resEventTitle === "Reserved") {
                console.log("Auto cancelled reservation");
                await axios.delete(url, { headers: { Authorization: token } });
                await sendMail(transporter, mailOptions);
            }

            return res.status(200).json({ "message": "success auto cancel scheduled" });

        } catch (error) {
            console.error("ERROR IN RETRIEVING EVENT FROM FIRESTORE");
            console.error("Event may have already be deleated or you lack authorization");
            return res.status(200).json({ "message": "auto cancel scheduled has been stopped" });
        }
    }, req.body.minutesDelay * 60000);

});