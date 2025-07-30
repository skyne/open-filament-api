import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Container from "typedi";
import { IFilamentService } from "../services/filament.service.interface";
import { FilamentService } from "../services/filament.service";
import { filamentSchema } from "./filament.schema";
import { ApiFilament } from "./filament.model";

export async function filamentRoutes(fastify: FastifyInstance) {
  const filamentService = Container.get<IFilamentService>(FilamentService);

  // Filament routes
  fastify.get("/filaments", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const filaments = await filamentService.getAllFilaments();
      return reply.send(filaments);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch filaments", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.get("/filaments/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const filament = await filamentService.getFilament(request.params.id);
      return reply.send(filament);
    } catch (error) {
      return reply.status(404).send({ error: "Filament not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.get("/filaments/type/:type", async (request: FastifyRequest<{ Params: { type: string } }>, reply: FastifyReply) => {
    try {
      const filaments = await filamentService.getAllFilamentsByType(request.params.type);
      return reply.send(filaments);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch filaments by type", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.post("/filaments", async (request: FastifyRequest<{ Body: ApiFilament }>, reply: FastifyReply) => {
    try {
      const validatedData = filamentSchema.parse(request.body);
      const filament = await filamentService.createFilament(validatedData);
      return reply.status(201).send(filament);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid filament data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.put("/filaments/:id", async (request: FastifyRequest<{ Params: { id: string }; Body: ApiFilament }>, reply: FastifyReply) => {
    try {
      const validatedData = filamentSchema.parse(request.body);
      const filament = await filamentService.updateFilament(request.params.id, validatedData);
      return reply.send(filament);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid filament data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.delete("/filaments/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await filamentService.deleteFilament(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(404).send({ error: "Filament not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });
}
