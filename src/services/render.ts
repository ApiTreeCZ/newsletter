import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

import consola from 'consola';
import Email from 'email-templates';
import open from 'open';

import { BUILD_DIR, TEMPLATE } from './constants';
import { config, locals } from './email';

const FILE = path.join(BUILD_DIR, 'preview', 'index.html');

export const render = async (): Promise<void> => {
  const email = new Email(config(true));
  const html = await email.render(`${TEMPLATE}/html`, {
    ...locals,
    render: true,
  });
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, html);
  await open(FILE);
  consola.success(`Email successfully rendered to \`${FILE}\``);
};
