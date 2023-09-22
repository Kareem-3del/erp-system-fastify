import { FastifyInstance } from 'fastify';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import configHelper from '../../utils/helpers/config.helper';
declare module 'fastify' {
  interface FastifyInstance {
    sendMail: (
      to: string,
      subject: string,
      text: string,
    ) => Promise<import('nodemailer').SentMessageInfo>;
  }
}
export default async function (fastify: FastifyInstance) {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      accessToken: configHelper.get('GMAIL_ACCESS_TOKEN'),
    },
  });

  fastify.decorate(
    'sendMail',
    async (to: string, subject: string, text: string) => {
      try {
        const mailOptions: SendMailOptions = {
          from: 'your-email@gmail.com',
          to,
          subject,
          text,
        };

        return await transporter.sendMail(mailOptions);
      } catch (error: any) {
        throw new Error(`Error sending email: ${error.message}`);
      }
    },
  );
}
