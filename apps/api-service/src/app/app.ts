import Fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';
import { IDbHandler, MongooseHandler, TestDbHandler } from '../mongo';
import { app as appConfig } from '../config';
import { Service } from 'typedi';
import { filamentRoutes } from './routes/filament.router';
import { materialRoutes } from './routes/material.router';
import { manufacturerRoutes } from './routes/manufacturer.router';
import cors from '@fastify/cors';

@Service()
export class App {
  public app: FastifyInstance;

  constructor(
    private readonly dbHandler: IDbHandler = undefined,

   ) {

      if(appConfig.env === 'test') {
        this.dbHandler = Container.get(TestDbHandler);
      }
      else {
        this.dbHandler = Container.get(MongooseHandler);
      }

      this.app = Fastify({
        logger: true,
      });

      this.configure();
      this.routes();

      this.app.printRoutes();
    }

    configure() {
      // Register CORS plugin
      this.app.register(cors, {
        origin: appConfig.corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      });

      this.dbHandler.connect();
    }

    routes() {
      const basePath = '/api';
      this.app.register(filamentRoutes, { prefix: basePath });
      this.app.register(materialRoutes, { prefix: basePath });
      this.app.register(manufacturerRoutes, { prefix: basePath });
    }
}
