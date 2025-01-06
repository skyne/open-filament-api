import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import Container from 'typedi';
import { ROUTESERVICE_TOKEN } from './routes/constants';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {

  // This loads all classes that have been decorated with @Service('route')
  Container.getMany(ROUTESERVICE_TOKEN).forEach((route: any) => {
    route.registerRoutes(fastify, '/api');
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });
}
