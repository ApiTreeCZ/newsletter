import path from 'path';

export const ASSETS = 'assets';
export const BUILD = 'lib';
export const IMAGES = `${ASSETS}/images`;
export const TEMPLATE = 'template';

export const ROOT_DIR = path.resolve(__dirname, '..', '..');
export const ASSETS_DIR = path.join(ROOT_DIR, ASSETS);
export const BUILD_DIR = path.join(ROOT_DIR, BUILD);
