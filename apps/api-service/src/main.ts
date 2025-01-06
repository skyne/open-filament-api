import Fastify from 'fastify';
import { app } from './app/app';
import 'reflect-metadata';
import { app as appConfig } from './config';

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port: appConfig.port, host: '0.0.0.0' }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://0.0.0.0:${appConfig.port}`);
  }
});
