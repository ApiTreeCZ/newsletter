import path from 'path';

import Email from 'email-templates';
import { Attachment } from 'nodemailer/lib/mailer';

import { DRY_RUN, EMAIL_FROM, SEND } from '../environment';

import { ASSETS_DIR, BUILD, IMAGES, ROOT_DIR } from './constants';
import { transporter } from './transporter';

const attachImage = (name: string): Attachment => {
  const cid = `${name}.png`;
  return { path: path.join(ASSETS_DIR, 'images', cid), cid };
};

export const config = (render = false) => ({
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      images: render,
      relativeTo: ROOT_DIR,
    },
  },
  views: {
    root: ASSETS_DIR,
    options: {
      extension: 'hbs',
    },
  },
});

export const locals = {
  images: `./${IMAGES}/`,
  styles: `./${BUILD}/styles.css`,
};

export const createEmail = async (): Promise<Email> =>
  new Email({
    ...config(),
    message: {
      attachments: ['logo', 'xmas-tree'].map(attachImage),
      from: EMAIL_FROM,
    },
    preview: !SEND,
    send: !DRY_RUN && SEND,
    transport: transporter,
  });
