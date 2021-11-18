import { render } from './services/render';
import { send } from './services/send';

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
};

const run = () => {
  if (process.env.RENDER) {
    render().catch(onError);
  } else {
    send().catch(onError);
  }
};

run();
