import 'reflect-metadata';
import { App } from './app/app';
import { app as appConfig } from './config';
import Container from 'typedi';

const app = Container.get(App).app;

// Start listening.
app.listen({ port: appConfig.port, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://0.0.0.0:${appConfig.port}`);
  }
});
