import { FastifyInstance } from "fastify";
import { IFilamentService } from "../services/filament.service.interface";
import { ApiGetFilementParams } from "./filament.model";

export class FilamentRouter {
    constructor(readonly filamentService: IFilamentService) {
    }

    registerRoutes(app: FastifyInstance, basePath: string): void {
        app.get('/filament/:id', async (request, reply) => {

            const params = request.params as ApiGetFilementParams;
            const id = params.id;
            const filament = this.filamentService.getFilament(id);
            return filament;
        });
    }
}
