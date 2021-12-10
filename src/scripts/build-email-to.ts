import path from 'path';
import { writeFileSync } from 'fs';

import dotenv from 'dotenv';

import { EMAIL_TO } from '../environment';
import { ROOT_DIR } from '../services/constants';

dotenv.config();
const run = () => {
  writeFileSync(path.join(ROOT_DIR, '.email-to'), EMAIL_TO);
};

run();
