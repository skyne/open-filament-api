import { FastifyInstance } from "fastify";
import { IFilamentService } from "../services/filament.service.interface";
import { ApiGetFilementParams } from "./filament.model";
import { ROUTESERVICE_TOKEN } from "./constants";
import { Container, Service } from "typedi";
import { FilamentService } from "../services/filament.service";

@Service({ id: ROUTESERVICE_TOKEN, multiple: true, transient: false })
export class FilamentRouterService {

  constructor(private filamentService: IFilamentService = undefined) {
    if (!filamentService) {
      this.filamentService = Container.get(FilamentService);
    }
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
