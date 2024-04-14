import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from "./config.js";

// ----- GET SPECIFIC RESERVATION EVENT BY ID -----
/**
 * @param {string} resEventId 
 * @returns {Promise<ReservationEvent>}
 */
export async function getReservationEventById(resEventId) {
    const resEventRef = doc(db, "reservation-event", resEventId);
    const errorEvent = {
        event_id: 'error',
        title: '',
        start: new Date(),
        end: new Date(),
        color: '',
        branchId: '',
        room_id: 0,
        date: new Date(),
        stuRep: '',
        duration: 0,
        pax: 0,
        stuEmails: [],
        purp: '',
        rcpt: ''
    };

    try {
        const docSnap = await getDoc(resEventRef);
        if (docSnap.exists()) {
            const resEventData = docSnap.data();
            const resEvent = {
                event_id: resEventData.event_id,
                title: resEventData.title,
                start: resEventData.start.toDate(),
                end: resEventData.end.toDate(),

                color: resEventData.color,

                branchId: resEventData.branchId,
                room_id: resEventData.room_id,
                date: resEventData.date.toDate(),
                stuRep: resEventData.stuRep,
                duration: resEventData.duration,
                pax: resEventData.pax,
                stuEmails: resEventData.stuEmails,
                purp: resEventData.purp,
                rcpt: resEventData.rcpt
            }
            console.log(resEvent);
            return resEvent;
        }
    } catch (error) {
        console.error(error);
    }

    // if there's an error it should return an empty event
    return errorEvent;
}

// ----- DELETE RESERVATION EVENT -----
/**
 * @param {string} resEventId 
 * @returns {Promise<string>}
 */
export async function deleteReservationEvent(resEventId) {
    let idDeleted = "";
    const resEventDoc = doc(db, "reservation-event", resEventId);
    try {
        await deleteDoc(resEventDoc);
        idDeleted = resEventId;
    } catch (error) {
        console.error;
    }

    return idDeleted;
}