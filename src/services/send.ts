import Email from 'email-templates';
import consola from 'consola';

import { DRY_RUN, SEND } from '../environment';

import { createEmail, locals } from './email';
import { getRecipients, saveSent } from './recipients';
import { RecipientSent, SentEmails } from './types';
import { TEMPLATE } from './constants';

const sendToRecipient =
  (email: Email) =>
  async (to: string): Promise<RecipientSent | undefined> => {
    try {
      await email.send({ message: { to }, template: TEMPLATE, locals });
      consola.success(`Successfully sent to \`${to}\``);
      return { email: to, date: new Date() };
    } catch (error) {
      consola.error(`Unable to send to \`${to}\``);
      consola.error(String(error));
    }
  };

const skipRecipient = async (to: string): Promise<void> =>
  consola.warn(`Skipping \`${to}\`, already sent`);

export const send = async (): Promise<void> => {
  const email = await createEmail();
  if (SEND) {
    if (DRY_RUN) consola.info(`Running in dry run mode`);
    const recipients = await getRecipients();
    await Promise.all(recipients.skip.map(skipRecipient));
    const sent = await Promise.all(recipients.send.map(sendToRecipient(email)));
    await saveSent(sent.filter((email) => email !== undefined) as SentEmails);
  } else {
    consola.info('Running in preview mode');
    await email.send({ template: TEMPLATE, locals });
  }
};
