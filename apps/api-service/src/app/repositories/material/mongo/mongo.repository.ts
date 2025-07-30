
import Container, { Service } from "typedi";
import { Material } from "../../../services/filament.service.model";
import { IMapper } from "../../generic/mapper.interface";
import { MaterialRepository } from "../repository.interface";
import { RepositoryMaterial } from "../repository.model";
import { MongoMaterialRepositoryMapper } from "./mongo.repository.mapper";
import { MaterialModel } from "./mongo.repository.schema";

@Service()
export class MongoMaterialRepository implements MaterialRepository {
  private readonly mapper: IMapper<RepositoryMaterial, Material>;

  constructor() {
    this.mapper = Container.get(MongoMaterialRepositoryMapper);
  }

  async createMaterial(material: Material): Promise<Material> {
    const repositoryModel = this.mapper.mapFrom(material);
    const doc = await MaterialModel.create(repositoryModel);
    return this.mapper.mapTo(doc.toObject());
  }

  async getMaterial(id: string): Promise<Material> {
    const material = await MaterialModel.findById(id);
    if (!material) {
      throw new Error("Material not found");
    }
    return this.mapper.mapTo(material.toObject());
  }

  async updateMaterial(id: string, material: Material): Promise<Material> {
    const repositoryModel = this.mapper.mapFrom(material);
    const updated = await MaterialModel.findByIdAndUpdate(
      id,
      repositoryModel,
      { new: true }
    );
    if (!updated) {
      throw new Error("Material not found");
    }
    return this.mapper.mapTo(updated.toObject());
  }

  async deleteMaterial(id: string): Promise<void> {
    await MaterialModel.findByIdAndDelete(id);
  }

  async getAllMaterials(): Promise<Material[]> {
    const docs = await MaterialModel.find();
    return docs.map(doc => this.mapper.mapTo(doc.toObject()));
  }
}
