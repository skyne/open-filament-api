import { FastifyInstance } from 'fastify';
import { Service } from 'typedi';
import { ROUTESERVICE_TOKEN } from './constants';

@Service({ id: ROUTESERVICE_TOKEN, multiple: true, transient: false })
export class RootRouterService {
  registerRoutes(fastify: FastifyInstance, basePath: string) {
    fastify.get(basePath, async function () {
      return { message: 'Hello API' };
    });
  }
}

