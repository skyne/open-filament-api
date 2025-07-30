'use client';

import { useState, useEffect } from 'react';
import { materialApi, ApiMaterial } from '../../lib/api-client';

export default function MaterialsTab() {
  const [materials, setMaterials] = useState<ApiMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<ApiMaterial | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    diameter: 1.75,
    densityGcm3: 1.0,
    youngModulusGpa: 0,
    tensileStrengthMpa: 0,
    creep: false,
    bio: false,
    fdaCompliant: false,
    hasAdditives: false,
    glass_transition_c: 0,
    melting_point_c: 0,
    polymer: '',
  });

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialApi.getAllMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMaterial) {
        await materialApi.updateMaterial(editingMaterial.id!, formData);
      } else {
        await materialApi.createMaterial(formData);
      }
      await loadMaterials();
      setShowForm(false);
      setEditingMaterial(null);
      resetForm();
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      description: '',
      diameter: 1.75,
      densityGcm3: 1.0,
      youngModulusGpa: 0,
      tensileStrengthMpa: 0,
      creep: false,
      bio: false,
      fdaCompliant: false,
      hasAdditives: false,
      glass_transition_c: 0,
      melting_point_c: 0,
      polymer: '',
    });
  };

  const handleEdit = (material: ApiMaterial) => {
    setEditingMaterial(material);
    setFormData({
      type: material.type,
      description: material.description || '',
      diameter: material.diameter,
      densityGcm3: material.densityGcm3 || 1.0,
      youngModulusGpa: material.youngModulusGpa || 0,
      tensileStrengthMpa: material.tensileStrengthMpa || 0,
      creep: material.creep || false,
      bio: material.bio || false,
      fdaCompliant: material.fdaCompliant || false,
      hasAdditives: material.hasAdditives || false,
      glass_transition_c: material.glass_transition_c || 0,
      melting_point_c: material.melting_point_c || 0,
      polymer: material.polymer || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      try {
        await materialApi.deleteMaterial(id);
        await loadMaterials();
      } catch (error) {
        console.error('Error deleting material:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span className="text-2xl">🧪</span>
            <span>Materials</span>
          </h2>
          <p className="text-gray-600 mt-1">Define material properties and specifications</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Material</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Total Materials</p>
              <p className="text-2xl font-semibold text-green-900">{materials.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">Bio</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Bio-compatible</p>
              <p className="text-2xl font-semibold text-blue-900">{materials.filter(m => m.bio).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xs font-semibold">FDA</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">FDA Compliant</p>
              <p className="text-2xl font-semibold text-purple-900">{materials.filter(m => m.fdaCompliant).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">With Additives</p>
              <p className="text-2xl font-semibold text-orange-900">{materials.filter(m => m.hasAdditives).length}</p>
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
                  {editingMaterial ? 'Edit Material' : 'Add New Material'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMaterial(null);
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
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Material Type *</label>
                      <input
                        type="text"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="e.g., PLA, ABS, PETG"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        rows={3}
                        placeholder="Material description and characteristics"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Polymer Base</label>
                      <input
                        type="text"
                        value={formData.polymer}
                        onChange={(e) => setFormData({ ...formData, polymer: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="e.g., Polylactic Acid, Acrylonitrile Butadiene Styrene"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Diameter (mm) *</label>
                      <select
                        value={formData.diameter}
                        onChange={(e) => setFormData({ ...formData, diameter: parseFloat(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        required
                      >
                        <option value={1.75}>1.75mm</option>
                        <option value={2.85}>2.85mm</option>
                        <option value={3.0}>3.00mm</option>
                      </select>
                    </div>
                  </div>

                  {/* Physical Properties */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Physical Properties</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Density (g/cm³)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.densityGcm3}
                          onChange={(e) => setFormData({ ...formData, densityGcm3: parseFloat(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Young Modulus (GPa)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.youngModulusGpa}
                          onChange={(e) => setFormData({ ...formData, youngModulusGpa: parseFloat(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tensile Strength (MPa)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.tensileStrengthMpa}
                          onChange={(e) => setFormData({ ...formData, tensileStrengthMpa: parseFloat(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Glass Transition (°C)</label>
                        <input
                          type="number"
                          value={formData.glass_transition_c}
                          onChange={(e) => setFormData({ ...formData, glass_transition_c: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Melting Point (°C)</label>
                      <input
                        type="number"
                        value={formData.melting_point_c}
                        onChange={(e) => setFormData({ ...formData, melting_point_c: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      />
                    </div>

                    {/* Properties Checkboxes */}
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-gray-700">Material Properties</h5>
                      <div className="space-y-2">
                        {[
                          { key: 'bio', label: 'Bio-compatible', description: 'Safe for biological applications' },
                          { key: 'fdaCompliant', label: 'FDA Compliant', description: 'Approved for food contact' },
                          { key: 'hasAdditives', label: 'Contains Additives', description: 'Has reinforcement or fillers' },
                          { key: 'creep', label: 'Creep Resistant', description: 'Resists deformation under load' },
                        ].map((prop) => (
                          <label key={prop.key} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData[prop.key as keyof typeof formData] as boolean}
                              onChange={(e) => setFormData({
                                ...formData,
                                [prop.key]: e.target.checked
                              })}
                              className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900">{prop.label}</span>
                              <p className="text-xs text-gray-500">{prop.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMaterial(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {editingMaterial ? 'Update Material' : 'Create Material'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Materials Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{material.type}</div>
                      <div className="text-sm text-gray-500">{material.diameter}mm</div>
                      {material.polymer && (
                        <div className="text-xs text-gray-400">{material.polymer}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      {material.densityGcm3 && <div>Density: {material.densityGcm3} g/cm³</div>}
                      {material.youngModulusGpa && <div>Young: {material.youngModulusGpa} GPa</div>}
                      {material.tensileStrengthMpa && <div>Tensile: {material.tensileStrengthMpa} MPa</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      {material.glass_transition_c ? <div>Tg: {material.glass_transition_c}°C</div> : null}
                      {material.melting_point_c ? <div>Tm: {material.melting_point_c}°C</div> : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      {material.glass_transition_c ? <div>Glass: {material.glass_transition_c}°C</div> : null}
                      {material.melting_point_c ? <div>Melt: {material.melting_point_c}°C</div> : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {material.bio && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Bio
                        </span>
                      )}
                      {material.fdaCompliant && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          FDA
                        </span>
                      )}
                      {material.hasAdditives && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Additives
                        </span>
                      )}
                      {material.creep && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Creep Resistant
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(material.id!)}
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
        {materials.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6l-2 2h-4l-2-2H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No materials</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new material.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add your first material
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
