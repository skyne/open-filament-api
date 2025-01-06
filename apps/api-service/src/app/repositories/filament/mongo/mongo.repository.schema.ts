import mongoose, { Schema } from 'mongoose';
import { RepositoryFilament } from '../repository.model';

const FilamentSchema = new Schema<RepositoryFilament>({
  //id: { type: String, required: true },
},
{
  collection: 'filaments',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});


export const FilamentModel = mongoose.model<RepositoryFilament>('Filament', FilamentSchema);
