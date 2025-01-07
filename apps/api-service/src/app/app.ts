import Fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';
import { IDbHandler, MongooseHandler, TestDbHandler } from '../mongo';
import { app as appConfig } from '../config';
import { Service } from 'typedi';
import { RootRouterService } from './routes/root';
import { FilamentRouterService } from './routes/filamen.router';

@Service()
export class App {
  public app: FastifyInstance;

  constructor(
    private readonly dbHandler: IDbHandler = undefined,
    private readonly rootRouterService: RootRouterService = Container.get(RootRouterService),
    private readonly filamentRouterService: FilamentRouterService = Container.get(FilamentRouterService),

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
      this.dbHandler.connect();
    }

    routes() {
      const basePath = '/api';
      this.rootRouterService.registerRoutes(this.app, basePath);
      this.filamentRouterService.registerRoutes(this.app, basePath);
    }
}
