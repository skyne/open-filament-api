// API Client for Filament Management System
import axios from 'axios';

// Types matching the API service
export type ApiMaterial = {
  id?: string;
  type: string;
  description?: string;
  diameter: number;
  densityGcm3?: number;
  youngModulusGpa?: number;
  tensileStrengthMpa?: number;
  creep?: boolean;
  bio?: boolean;
  fdaCompliant?: boolean;
  hasAdditives?: boolean;
  glass_transition_c?: number;
  melting_point_c?: number;
  polymer?: string;
}

export type ApiManufacturer = {
  id?: string;
  vendor: string;
  website?: string;
  logo?: string;
}

export type ApiFilament = {
  id?: string;
  name: string;
  material: string;
  brand: string;
  hex: string;
  ral?: string;
  hotend_min: number;
  hotend_max: number;
  bed_min: number;
  bed_max: number;
}

// Create/Update types for API operations
export type CreateFilamentParams = Omit<ApiFilament, 'id'>;
export type CreateMaterialParams = Omit<ApiMaterial, 'id'>;
export type CreateManufacturerParams = Omit<ApiManufacturer, 'id'>;

// API Configuration - dynamically determine API URL based on environment
const getApiBaseUrl = () => {
  // For production, use environment variable if set
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // For production on Vercel (when no env var is set), use relative path
  if (process.env.NODE_ENV === 'production') {
    // In production, assume API is on same domain
    return typeof window !== 'undefined' ? window.location.origin : '';
  }
  
  // Development fallback
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();
const API_BASE_PATH = '/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service for filament operations
export const filamentApi = {
  // Get all filaments
  getAllFilaments: async (): Promise<ApiFilament[]> => {
    const response = await apiClient.get('/filaments');
    return response.data;
  },

  // Get filament by ID
  getFilament: async (id: string): Promise<ApiFilament> => {
    const response = await apiClient.get(`/filaments/${id}`);
    return response.data;
  },

  // Get filaments by type
  getFilamentsByType: async (type: string): Promise<ApiFilament[]> => {
    const response = await apiClient.get(`/filaments/type/${type}`);
    return response.data;
  },

  // Create new filament
  createFilament: async (filament: Omit<ApiFilament, 'id'>): Promise<ApiFilament> => {
    const response = await apiClient.post('/filaments', filament);
    return response.data;
  },

  // Update filament
  updateFilament: async (id: string, filament: Omit<ApiFilament, 'id'>): Promise<ApiFilament> => {
    const response = await apiClient.put(`/filaments/${id}`, filament);
    return response.data;
  },

  // Delete filament
  deleteFilament: async (id: string): Promise<void> => {
    await apiClient.delete(`/filaments/${id}`);
  },
};

// API service for material operations
export const materialApi = {
  getAllMaterials: async (): Promise<ApiMaterial[]> => {
    const response = await apiClient.get('/materials');
    return response.data;
  },

  getMaterial: async (id: string): Promise<ApiMaterial> => {
    const response = await apiClient.get(`/materials/${id}`);
    return response.data;
  },

  createMaterial: async (material: Omit<ApiMaterial, 'id'>): Promise<ApiMaterial> => {
    const response = await apiClient.post('/materials', material);
    return response.data;
  },

  updateMaterial: async (id: string, material: Omit<ApiMaterial, 'id'>): Promise<ApiMaterial> => {
    const response = await apiClient.put(`/materials/${id}`, material);
    return response.data;
  },

  deleteMaterial: async (id: string): Promise<void> => {
    await apiClient.delete(`/materials/${id}`);
  },
};

// API service for manufacturer operations
export const manufacturerApi = {
  getAllManufacturers: async (): Promise<ApiManufacturer[]> => {
    const response = await apiClient.get('/manufacturers');
    return response.data;
  },

  getManufacturer: async (id: string): Promise<ApiManufacturer> => {
    const response = await apiClient.get(`/manufacturers/${id}`);
    return response.data;
  },

  createManufacturer: async (manufacturer: Omit<ApiManufacturer, 'id'>): Promise<ApiManufacturer> => {
    const response = await apiClient.post('/manufacturers', manufacturer);
    return response.data;
  },

  updateManufacturer: async (id: string, manufacturer: Omit<ApiManufacturer, 'id'>): Promise<ApiManufacturer> => {
    const response = await apiClient.put(`/manufacturers/${id}`, manufacturer);
    return response.data;
  },

  deleteManufacturer: async (id: string): Promise<void> => {
    await apiClient.delete(`/manufacturers/${id}`);
  },
};

export default apiClient;
