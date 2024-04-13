// guide
interface ReservationReminderEmailInput {
    to: "string"; // receiver
    subject: "string"; // email subject
    html: "string"; // email body, must be in html format
    minutesDelay: number; // minutes before email is sent
}