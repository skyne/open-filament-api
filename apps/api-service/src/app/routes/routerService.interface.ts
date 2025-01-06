import { FastifyInstance } from "fastify";

export interface IRouterService {
  registerRoutes(app: FastifyInstance, basePath: string): void;
}
