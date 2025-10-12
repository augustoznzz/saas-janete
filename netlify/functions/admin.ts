import type { Handler } from '@netlify/functions';
import { handler as seedHandler } from './seed-admin';

export const handler: Handler = async (event, context) => {
  return seedHandler(event, context);
};

export default {};


