/**
 * mailer.js — Nodemailer transport for confirmation emails
 */

import nodemailer from 'nodemailer';

// Use real SMTP if configured, otherwise use Ethereal (dev catch-all)
let transport;

async function getTransport() {
  if (transport) return transport;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('📧 Using real SMTP transport');
  } else {
    // Dev/test: Ethereal fake inbox — no credentials needed
    const testAccount = await nodemailer.createTestAccount();
    transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Using Ethereal test transport — preview emails at https://ethereal.email');
  }

  return transport;
}

export async function sendReservationConfirmation({ to, name, ref, date, time, guests }) {
  try {
    const t = await getTransport();
    const info = await t.sendMail({
      from: process.env.EMAIL_FROM || '"La Bella Cucina" <no-reply@labellacucina.com>',
      to,
      subject: `Reservation Confirmed – ${ref} | La Bella Cucina`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
          <div style="background:linear-gradient(135deg,#1a1a2e,#2d7a4f);padding:40px 32px;text-align:center;">
            <h1 style="color:#f9a825;margin:0;font-size:28px;">La Bella Cucina</h1>
            <p style="color:rgba(255,255,255,.75);margin:8px 0 0;font-size:14px;">Fine Italian Dining</p>
          </div>
          <div style="padding:36px 32px;">
            <h2 style="color:#1a1a2e;margin-top:0;">Your Reservation is Confirmed! 🎉</h2>
            <p style="color:#555;line-height:1.7;">Dear <strong>${name}</strong>,</p>
            <p style="color:#555;line-height:1.7;">Thank you for choosing La Bella Cucina. We're delighted to welcome you!</p>
            <div style="background:#f8fdf9;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #e0f0e5;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#777;font-size:14px;">Reference</td><td style="padding:8px 0;font-weight:700;color:#2d7a4f;">${ref}</td></tr>
                <tr><td style="padding:8px 0;color:#777;font-size:14px;">Date</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;">${date}</td></tr>
                <tr><td style="padding:8px 0;color:#777;font-size:14px;">Time</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;">${time}</td></tr>
                <tr><td style="padding:8px 0;color:#777;font-size:14px;">Guests</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;">${guests}</td></tr>
              </table>
            </div>
            <p style="color:#555;line-height:1.7;">If you need to modify or cancel your reservation, please call us at <strong>+1 (555) 123-4567</strong> or email <a href="mailto:reservations@labellacucina.com" style="color:#2d7a4f;">reservations@labellacucina.com</a>.</p>
            <p style="color:#555;line-height:1.7;">We look forward to seeing you!</p>
            <p style="color:#555;">— The La Bella Cucina Team</p>
          </div>
          <div style="background:#f0f0f0;padding:20px 32px;text-align:center;">
            <p style="color:#aaa;font-size:12px;margin:0;">124 Olive Garden Lane, San Francisco, CA 94102 | +1 (555) 123-4567</p>
          </div>
        </div>
      `,
    });
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('📬 Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.error('Email send failed (non-fatal):', err.message);
  }
}

export async function sendOrderConfirmation({ to, name, ref, items, total }) {
  try {
    const t = await getTransport();
    const itemsHtml = items.map(i =>
      `<tr><td style="padding:6px 0;color:#555;">${i.name} ×${i.qty}</td><td style="padding:6px 0;text-align:right;font-weight:600;">₹${Number(i.price * i.qty).toLocaleString('en-IN')}</td></tr>`
    ).join('');

    await t.sendMail({
      from: process.env.EMAIL_FROM || '"La Bella Cucina" <no-reply@labellacucina.com>',
      to,
      subject: `Order Received – ${ref} | La Bella Cucina`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
          <div style="background:linear-gradient(135deg,#1a1a2e,#2d7a4f);padding:40px 32px;text-align:center;">
            <h1 style="color:#f9a825;margin:0;font-size:28px;">La Bella Cucina</h1>
          </div>
          <div style="padding:36px 32px;">
            <h2 style="color:#1a1a2e;margin-top:0;">Order Confirmed! 🍽️</h2>
            <p style="color:#555;">Hi <strong>${name}</strong>, your order <strong>${ref}</strong> is confirmed and being prepared.</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">${itemsHtml}</table>
            <div style="border-top:2px solid #eee;padding-top:12px;text-align:right;">
              <strong style="font-size:18px;color:#2d7a4f;">Total: ₹${Number(total).toLocaleString('en-IN')}</strong>
            </div>
            <p style="color:#555;margin-top:20px;">Estimated delivery: <strong>35–45 minutes</strong></p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Order email send failed (non-fatal):', err.message);
  }
}

export async function sendContactNotification({ name, email, subject, message }) {
  try {
    const t = await getTransport();
    await t.sendMail({
      from: process.env.EMAIL_FROM || '"La Bella Cucina" <no-reply@labellacucina.com>',
      to: process.env.EMAIL_TO || 'hello@labellacucina.com',
      replyTo: email,
      subject: `New Contact Message: ${subject || 'General Enquiry'}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Subject:</strong> ${subject || 'N/A'}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });
  } catch (err) {
    console.error('Contact email send failed (non-fatal):', err.message);
  }
}
