import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(3000),
  MOBULA_API_KEY: Joi.string().default('b34aaec6-abf3-4600-8f75-58805e63fa95'),
});
