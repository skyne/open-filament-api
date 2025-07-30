import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Container from "typedi";
import { ManufacturerService } from "../services/material.service.interface";
import { ManufacturerServiceImpl } from "../services/manufacturer.service";
import { manufacturerSchema } from "./manufacturer.schema";
import { ApiManufacturer } from "./manufacturer.model";

export async function manufacturerRoutes(fastify: FastifyInstance) {
  const manufacturerService = Container.get<ManufacturerService>(ManufacturerServiceImpl);

  // Manufacturer routes
  fastify.get("/manufacturers", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const manufacturers = await manufacturerService.getAllManufacturers();
      return reply.send(manufacturers);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch manufacturers", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.get("/manufacturers/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const manufacturer = await manufacturerService.getManufacturer(request.params.id);
      return reply.send(manufacturer);
    } catch (error) {
      return reply.status(404).send({ error: "Manufacturer not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.post("/manufacturers", async (request: FastifyRequest<{ Body: ApiManufacturer }>, reply: FastifyReply) => {
    try {
      const validatedData = manufacturerSchema.parse(request.body);
      const manufacturer = await manufacturerService.createManufacturer(validatedData);
      return reply.status(201).send(manufacturer);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid manufacturer data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.put("/manufacturers/:id", async (request: FastifyRequest<{ Params: { id: string }; Body: ApiManufacturer }>, reply: FastifyReply) => {
    try {
      const validatedData = manufacturerSchema.parse(request.body);
      const manufacturer = await manufacturerService.updateManufacturer(request.params.id, validatedData);
      return reply.send(manufacturer);
    } catch (error) {
      return reply.status(400).send({ error: "Invalid manufacturer data", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  fastify.delete("/manufacturers/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await manufacturerService.deleteManufacturer(request.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(404).send({ error: "Manufacturer not found", details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });
}
