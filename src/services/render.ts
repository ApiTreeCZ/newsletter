import path from 'path';
import { writeFile } from 'fs/promises';

import Email from 'email-templates';
import consola from 'consola';

import { BUILD_DIR, TEMPLATE } from './constants';
import { config, locals } from './email';

const FILE = path.join(BUILD_DIR, 'email.html');

export const render = async (): Promise<void> => {
  const email = new Email(config(true));
  const html = await email.render(`${TEMPLATE}/html`, {
    ...locals,
    render: true,
  });
  await writeFile(FILE, html);
  consola.success(`Email successfully rendered to \`${FILE}\``);
};
