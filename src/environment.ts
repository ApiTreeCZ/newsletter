import dotenv from 'dotenv';

dotenv.config();

export const DRY_RUN = process.env.DRY_RUN === '1';
export const EMAIL_FROM =
  process.env.EMAIL_FROM || 'ApiTree s.r.o. <info@apitree.cz>';
export const EMAIL_TO = process.env.EMAIL_TO || '';
export const SEND = process.env.SEND === '1';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
export const SMTP_SERVER = process.env.SMTP_SERVER || '';
export const SMTP_USER = process.env.SMTP_USER || '';
