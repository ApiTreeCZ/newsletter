import { createTransport, Transporter } from 'nodemailer';

import { SMTP_PASSWORD, SMTP_SERVER, SMTP_USER } from '../environment';

const create = (): Transporter =>
  createTransport({
    host: SMTP_SERVER,
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: true,
    },
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

export const transporter = create();
