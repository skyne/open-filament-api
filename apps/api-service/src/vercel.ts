// Vercel serverless function handler for the API
import { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from './app/app';

// Export the Fastify app as a Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await app.ready();
  app.server.emit('request', req, res);
}
