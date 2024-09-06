

export const generateEmailContent = (userName, platformName, senderName) => `
            <p>Hi <strong>${userName}</strong>,</p>
            <p>Thanks for signing up with <strong>${platformName}</strong>! We’re excited to have you on board.</p>
            <p>To get started, log in to your account and explore all the features available to you. If you need any help, feel free to reach out to us at <a href="mailto:contactus@recqarz.com">contactus@recqarz.com</a>.</p>
            <p>We’re here to help you every step of the way!</p>
            <br/>
            <p>Cheers,</p>
            <p><strong>${senderName}</strong></p>
            <p><strong>${platformName}</strong></p>
            `;
export const generateTicketEmailContent = (userName, ticketNumber, senderName) => `
    <p>Hi <strong>${userName}</strong>,</p>
    <p>Thank you for submitting your ticket on the ODR platform. Your request has been received, and our team will review it shortly.</p>
    <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
    <p>We’ll keep you updated on the progress. If you have any questions, feel free to reply to this email.</p>
    <br/>
    <p>Thank you,</p>
    <p><strong>${senderName}</strong></p>
    <p>ODR Support Team</p>
    `;
export default {generateEmailContent,generateTicketEmailContent }