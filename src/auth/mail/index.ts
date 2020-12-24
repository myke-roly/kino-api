import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

interface MailI {
  to: string;
  subject: string;
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: 'kinoapp.20',
    pass: '555111444',
    accessToken: 'token',
    expires: Date.now(),
  },
});

export async function sendRequestCreateAccount(mail: MailI): Promise<boolean> {
  const filePath = path.join(__dirname, './template.hbs');
  const src = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(src);
  const replacements = {
    link: 'google.com',
  };
  const htmlToSend = template(replacements);

  const from = 'kinoapp.20@gmail.com';
  const { to, subject } = mail;

  const options = {
    from,
    to,
    subject,
    html: htmlToSend,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log(info.messageId);
  } catch (error) {
    console.error('Failed send email ', error);
    return false;
  }

  return true;
}
