import { Service, Container } from "typedi";
import { MaterialService } from "./material.service.interface";
import { MaterialRepository } from "../repositories/material/repository.interface";
import { MongoMaterialRepository } from "../repositories/material/mongo/mongo.repository";
import { Material } from "./filament.service.model";

@Service()
export class MaterialServiceImpl implements MaterialService {
  private readonly materialRepository: MaterialRepository;

  constructor() {
    this.materialRepository = Container.get(MongoMaterialRepository);
  }

  async createMaterial(material: Material): Promise<Material> {
    return this.materialRepository.createMaterial(material);
  }

  async getMaterial(id: string): Promise<Material> {
    return this.materialRepository.getMaterial(id);
  }

  async updateMaterial(id: string, material: Material): Promise<Material> {
    return this.materialRepository.updateMaterial(id, material);
  }

  async deleteMaterial(id: string): Promise<void> {
    return this.materialRepository.deleteMaterial(id);
  }

  async getAllMaterials(): Promise<Material[]> {
    return this.materialRepository.getAllMaterials();
  }
}
