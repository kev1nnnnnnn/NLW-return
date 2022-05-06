import { MailAdapter, SendMailData } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "92c3780d08d532",
        pass: "a774ba15caed3f"
    }
});


export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({subject, body}: SendMailData)  {

        await transport.sendMail({
            from: 'Equipe NBN Apps <kevinbfv@gmail.com>',
            to: 'John Kevin <kevinbfv@gmail.com>',
            subject: subject,
            html: body
        });
    }
}