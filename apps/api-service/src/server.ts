import 'reflect-metadata';
import { App } from './app/app';
import { app as appConfig } from './config';
import Container from 'typedi';

const app = Container.get(App).app;

// For deployment, use environment port or default
const port = process.env.PORT || appConfig.port || 3000;
const host = process.env.HOST || '0.0.0.0';

// Start listening.
app.listen({ port: Number(port), host }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});

// Export for deployment platforms that expect it
export { app };
