'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { filamentApi, CreateFilamentParams } from '../../../lib/api-client';

export default function CreateFilamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateFilamentParams>({
    name: '',
    material: '',
    brand: '',
    hex: '#000000',
    ral: '',
    hotend_min: 190,
    hotend_max: 220,
    bed_min: 60,
    bed_max: 80
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Filament name is required');
      return;
    }
    
    if (!formData.material.trim()) {
      setError('Material is required');
      return;
    }

    if (!formData.brand.trim()) {
      setError('Brand is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await filamentApi.createFilament(formData);
      router.push('/filaments');
    } catch (err) {
      setError('Failed to create filament. Make sure the API server is running.');
      console.error('Error creating filament:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Filament</h1>
          <p className="text-gray-600 mt-2">Register a new filament spool to your inventory</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Filament Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g., Hatchbox PLA Red, SUNLU ABS White..."
                required
              />
            </div>

            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
                Material *
              </label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g., PLA, ABS, PETG, TPU..."
                required
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g., Hatchbox, SUNLU, eSUN..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hex" className="block text-sm font-medium text-gray-700 mb-2">
                  Color (Hex) *
                </label>
                <input
                  type="color"
                  id="hex"
                  name="hex"
                  value={formData.hex}
                  onChange={handleInputChange}
                  className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="ral" className="block text-sm font-medium text-gray-700 mb-2">
                  RAL Color Code
                </label>
                <input
                  type="text"
                  id="ral"
                  name="ral"
                  value={formData.ral}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="e.g., RAL 3020"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hotend_min" className="block text-sm font-medium text-gray-700 mb-2">
                  Hotend Min (°C) *
                </label>
                <input
                  type="number"
                  id="hotend_min"
                  name="hotend_min"
                  value={formData.hotend_min}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  min="0"
                  max="400"
                  required
                />
              </div>

              <div>
                <label htmlFor="hotend_max" className="block text-sm font-medium text-gray-700 mb-2">
                  Hotend Max (°C) *
                </label>
                <input
                  type="number"
                  id="hotend_max"
                  name="hotend_max"
                  value={formData.hotend_max}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  min="0"
                  max="400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bed_min" className="block text-sm font-medium text-gray-700 mb-2">
                  Bed Min (°C) *
                </label>
                <input
                  type="number"
                  id="bed_min"
                  name="bed_min"
                  value={formData.bed_min}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  min="0"
                  max="200"
                  required
                />
              </div>

              <div>
                <label htmlFor="bed_max" className="block text-sm font-medium text-gray-700 mb-2">
                  Bed Max (°C) *
                </label>
                <input
                  type="number"
                  id="bed_max"
                  name="bed_max"
                  value={formData.bed_max}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  min="0"
                  max="200"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Filament
                  </>
                )}
              </button>
              
              <Link
                href="/filaments"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-2"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
