'use client';

import { useState, useEffect } from 'react';
import { filamentApi, ApiFilament, materialApi, manufacturerApi, ApiMaterial, ApiManufacturer } from '../../lib/api-client';

export default function FilamentsTab() {
  const [filaments, setFilaments] = useState<ApiFilament[]>([]);
  const [materials, setMaterials] = useState<ApiMaterial[]>([]);
  const [manufacturers, setManufacturers] = useState<ApiManufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFilament, setEditingFilament] = useState<ApiFilament | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    material: '',
    brand: '',
    hex: '#000000',
    ral: '',
    hotend_min: 200,
    hotend_max: 220,
    bed_min: 0,
    bed_max: 60,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [filamentsData, materialsData, manufacturersData] = await Promise.all([
        filamentApi.getAllFilaments(),
        materialApi.getAllMaterials(),
        manufacturerApi.getAllManufacturers(),
      ]);
      setFilaments(filamentsData);
      setMaterials(materialsData);
      setManufacturers(manufacturersData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFilament) {
        await filamentApi.updateFilament(editingFilament.id!, formData);
      } else {
        await filamentApi.createFilament(formData);
      }
      await loadData();
      setShowForm(false);
      setEditingFilament(null);
      setFormData({
        name: '',
        material: '',
        brand: '',
        hex: '#000000',
        ral: '',
        hotend_min: 200,
        hotend_max: 220,
        bed_min: 0,
        bed_max: 60,
      });
    } catch (error) {
      console.error('Error saving filament:', error);
    }
  };

  const handleEdit = (filament: ApiFilament) => {
    setEditingFilament(filament);
    setFormData({
      name: filament.name,
      material: filament.material,
      brand: filament.brand,
      hex: filament.hex,
      ral: filament.ral || '',
      hotend_min: filament.hotend_min,
      hotend_max: filament.hotend_max,
      bed_min: filament.bed_min,
      bed_max: filament.bed_max,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this filament?')) {
      try {
        await filamentApi.deleteFilament(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting filament:', error);
      }
    }
  };

  const getMaterialName = (materialId: string) => {
    const material = materials.find(m => m.id === materialId);
    return material ? material.type : materialId;
  };

  const getManufacturerName = (manufacturerId: string) => {
    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    return manufacturer ? manufacturer.vendor : manufacturerId;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span className="text-2xl">🧵</span>
            <span>Filaments</span>
          </h2>
          <p className="text-gray-600 mt-1">Manage your 3D printing filament inventory</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Filament</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Filaments</p>
              <p className="text-2xl font-semibold text-blue-900">{filaments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Materials</p>
              <p className="text-2xl font-semibold text-green-900">{materials.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Manufacturers</p>
              <p className="text-2xl font-semibold text-purple-900">{manufacturers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-6V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m0 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V7" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Colors</p>
              <p className="text-2xl font-semibold text-orange-900">{new Set(filaments.map(f => f.hex)).size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingFilament ? 'Edit Filament' : 'Add New Filament'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingFilament(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filament Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Galaxy Black PLA+"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material *
                      </label>
                      <select
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Material</option>
                        {materials.map((material) => (
                          <option key={material.id} value={material.id}>
                            {material.type} ({material.diameter}mm)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand *
                      </label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select Brand</option>
                        {manufacturers.map((manufacturer) => (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.vendor}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Color & Appearance</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color *
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.hex}
                          onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                          className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.hex}
                          onChange={(e) => setFormData({ ...formData, hex: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RAL Color Code (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.ral}
                        onChange={(e) => setFormData({ ...formData, ral: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., RAL 9005"
                      />
                    </div>

                    <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 pt-4">Temperature Settings</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hotend Min (°C) *
                        </label>
                        <input
                          type="number"
                          value={formData.hotend_min}
                          onChange={(e) => setFormData({ ...formData, hotend_min: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hotend Max (°C) *
                        </label>
                        <input
                          type="number"
                          value={formData.hotend_max}
                          onChange={(e) => setFormData({ ...formData, hotend_max: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bed Min (°C) *
                        </label>
                        <input
                          type="number"
                          value={formData.bed_min}
                          onChange={(e) => setFormData({ ...formData, bed_min: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bed Max (°C) *
                        </label>
                        <input
                          type="number"
                          value={formData.bed_max}
                          onChange={(e) => setFormData({ ...formData, bed_max: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingFilament(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {editingFilament ? 'Update Filament' : 'Create Filament'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Filaments Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Filament
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material & Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature Settings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filaments.map((filament) => (
                <tr key={filament.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{filament.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getMaterialName(filament.material)}</div>
                    <div className="text-sm text-gray-500">{getManufacturerName(filament.brand)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: filament.hex }}
                        title={filament.hex}
                      ></div>
                      <div>
                        <div className="text-sm font-mono text-gray-900">{filament.hex}</div>
                        {filament.ral && <div className="text-xs text-gray-500">RAL {filament.ral}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-xs text-gray-500">Hotend:</span>
                          <div className="font-medium">{filament.hotend_min}°-{filament.hotend_max}°C</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Bed:</span>
                          <div className="font-medium">{filament.bed_min}°-{filament.bed_max}°C</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(filament)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(filament.id || '')}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filaments.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No filaments</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first filament.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add your first filament
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
