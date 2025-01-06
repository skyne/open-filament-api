import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import Container from 'typedi';
import { ROUTESERVICE_TOKEN } from './routes/constants';
import { MongooseHandler, TestDbHandler } from '../mongo';
import { app as appConfig } from '../config';
import fs from 'fs';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {

  console.log('Starting app', appConfig.env);
  const dbHandler = appConfig.env === 'test' ? Container.get(TestDbHandler) : Container.get(MongooseHandler);
  dbHandler.connect();


  const routeFiles = path.join(__dirname, 'routes');
  for(const file of fs.readdirSync(routeFiles)) {
    console.log('Loading route', file);
    if(file.endsWith('.ts') || file.endsWith('.js')) {
      require(path.join(routeFiles, file));
    }
  }

  // This loads all classes that have been decorated with @Service(ROUTESERVICE_TOKEN)
  Container.getMany(ROUTESERVICE_TOKEN).forEach((route: any) => {
    console.log('Registering route', route.constructor.name);
    route.registerRoutes(fastify, '/api');
  });


  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  if(appConfig.env === 'test') {
    fastify.printRoutes({
      commonPrefix: true,
      includeMeta: true,
    })
  }
}
