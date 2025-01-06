import { FastifyInstance } from "fastify";
import { IFilamentService } from "../services/filament.service.interface";
import { ApiGetFilementParams } from "./filament.model";
import { Container, Service } from "typedi";
import { FilamentService } from "../services/filament.service";
import { IRouterService } from "./routerService.interface";

@Service()
export class FilamentRouterService implements IRouterService {

  constructor(private readonly filamentService: IFilamentService) {
    this.filamentService = Container.get(FilamentService);

  }

  registerRoutes(app: FastifyInstance, basePath: string) {
        app.get(`${basePath}/v1/filament/:id`, async (request, reply) => {

            const params = request.params as ApiGetFilementParams;
            const id = params.id;

            const filament = this.filamentService.getFilament(id);
            return filament;
        });
    }
}
