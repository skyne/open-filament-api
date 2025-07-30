import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Container from "typedi";
import { MaterialService } from "../services/material.service.interface";
import { MaterialServiceImpl } from "../services/material.service";
import { materialSchema } from "./material.schema";
import { ApiMaterial } from "./material.model";

export async function materialRoutes(fastify: FastifyInstance) {
  const materialService = Container.get<MaterialService>(MaterialServiceImpl);

  // Material routes
  fastify.get("/materials", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const materials = await materialService.getAllMaterials();
      return reply.send(materials);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch materials", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.get("/materials/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const material = await materialService.getMaterial(request.params.id);
      return reply.send(material);
    } catch (error) {
      return reply.status(404).send({ error: "Material not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.post("/materials", async (request: FastifyRequest<{ Body: ApiMaterial }>, reply: FastifyReply) => {
    try {
      const validatedData = materialSchema.parse(request.body);
      const material = await materialService.createMaterial(validatedData);
      return reply.status(201).send(material);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid material data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.put("/materials/:id", async (request: FastifyRequest<{ Params: { id: string }; Body: ApiMaterial }>, reply: FastifyReply) => {
    try {
      const validatedData = materialSchema.parse(request.body);
      const material = await materialService.updateMaterial(request.params.id, validatedData);
      return reply.send(material);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid material data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.delete("/materials/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await materialService.deleteMaterial(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(404).send({ error: "Material not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });
}
