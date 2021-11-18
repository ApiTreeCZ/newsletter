import path from 'path';

import Email from 'email-templates';
import { Attachment } from 'nodemailer/lib/mailer';

import { DRY_RUN, EMAIL_FROM, SEND } from '../environment';

import { ASSETS, BUILD } from './paths';
import { transporter } from './transporter';

const attachImage = (name: string): Attachment => {
  const cid = `${name}.png`;
  return { path: path.join(ASSETS, 'images', cid), cid };
};

export const createEmail = async (): Promise<Email> =>
  new Email({
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        images: false,
        links: false,
        relativeTo: BUILD,
      },
    },
    message: {
      attachments: ['logo', 'xmas-tree'].map(attachImage),
      from: EMAIL_FROM,
    },
    preview: !SEND,
    send: !DRY_RUN && SEND,
    transport: transporter,
    views: {
      root: ASSETS,
      options: {
        extension: 'hbs',
      },
    },
  });
