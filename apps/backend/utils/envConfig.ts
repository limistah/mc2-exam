import * as dotenv from 'dotenv';
import { cleanEnv, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test'],
  }),
  PORT: port({ devDefault: testOnly(3000) }),
  MOBULA_API_KEY: str({ devDefault: 'b34aaec6-abf3-4600-8f75-58805e63fa95' }),
});
