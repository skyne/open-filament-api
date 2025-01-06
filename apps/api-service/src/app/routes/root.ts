import { FastifyInstance } from 'fastify';
import { Service } from 'typedi';
import { IRouterService } from './routerService.interface';

@Service()
export class RootRouterService implements IRouterService {
  registerRoutes(app: FastifyInstance, basePath: string) {
    app.get(basePath, async function () {
      return { message: 'Hello API' };
    });
  }
}

