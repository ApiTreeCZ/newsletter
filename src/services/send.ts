import Email from 'email-templates';
import consola from 'consola';

import { DRY_RUN, SEND } from '../environment';

import { createEmail } from './email';
import { getRecipients, saveSent } from './recipients';
import { RecipientSent, SentEmails } from './types';

const TEMPLATE = 'template';

const sendToRecipient =
  (email: Email) =>
  async (to: string): Promise<RecipientSent | undefined> => {
    try {
      await email.send({ message: { to }, template: TEMPLATE });
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
    if (DRY_RUN) consola.info(`Running in DRY_RUN mode`);
    const recipients = await getRecipients();
    await Promise.all(recipients.skip.map(skipRecipient));
    const sent = await Promise.all(recipients.send.map(sendToRecipient(email)));
    await saveSent(sent.filter((email) => email !== undefined) as SentEmails);
  } else {
    await email.send({ template: TEMPLATE });
  }
};
