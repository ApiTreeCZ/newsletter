import path from 'path';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { EMAIL_TO } from '../environment';

import { ROOT } from './paths';
import { Recipients, SentEmails } from './types';

const SENT = path.join(ROOT, 'sent.json');

const parseRecipients = (): string[] => EMAIL_TO.split(',');

const readSent = async (): Promise<string | undefined> => {
  if (existsSync(SENT)) {
    const buffer = await readFile(SENT);
    return buffer.toString();
  }
};

const parseSent = async (): Promise<SentEmails> => {
  const sent = await readSent();
  return JSON.parse(sent ?? '[]');
};

export const getRecipients = async (): Promise<Recipients> => {
  const sent = await parseSent();
  const recipients = parseRecipients();
  const send = [];
  const skip = [];
  for (const recipient of recipients) {
    if (sent.some(({ email }) => email === recipient)) {
      skip.push(recipient);
    } else {
      send.push(recipient);
    }
  }
  return { send, skip };
};

export const saveSent = async (emails: SentEmails): Promise<void> => {
  const sent = await parseSent();
  await writeFile(SENT, JSON.stringify([...sent, ...emails], undefined, 2));
};
