'use client';

import { useState, useEffect } from 'react';
import { manufacturerApi, ApiManufacturer } from '../../lib/api-client';

export default function ManufacturersTab() {
  const [manufacturers, setManufacturers] = useState<ApiManufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<ApiManufacturer | null>(null);
  const [formData, setFormData] = useState({
    vendor: '',
    website: '',
    logo: '',
  });

  useEffect(() => {
    loadManufacturers();
  }, []);

  const loadManufacturers = async () => {
    try {
      setLoading(true);
      const data = await manufacturerApi.getAllManufacturers();
      setManufacturers(data);
    } catch (error) {
      console.error('Error loading manufacturers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingManufacturer) {
        await manufacturerApi.updateManufacturer(editingManufacturer.id || '', formData);
      } else {
        await manufacturerApi.createManufacturer(formData);
      }
      await loadManufacturers();
      setShowForm(false);
      setEditingManufacturer(null);
      resetForm();
    } catch (error) {
      console.error('Error saving manufacturer:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      vendor: '',
      website: '',
      logo: '',
    });
  };

  const handleEdit = (manufacturer: ApiManufacturer) => {
    setEditingManufacturer(manufacturer);
    setFormData({
      vendor: manufacturer.vendor,
      website: manufacturer.website || '',
      logo: manufacturer.logo || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      try {
        await manufacturerApi.deleteManufacturer(id);
        await loadManufacturers();
      } catch (error) {
        console.error('Error deleting manufacturer:', error);
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
            <span className="text-2xl">🏭</span>
            <span>Manufacturers</span>
          </h2>
          <p className="text-gray-600 mt-1">Manage filament brands and manufacturers</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Manufacturer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <p className="text-sm font-medium text-purple-600">Total Manufacturers</p>
              <p className="text-2xl font-semibold text-purple-900">{manufacturers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">With Websites</p>
              <p className="text-2xl font-semibold text-blue-900">{manufacturers.filter(m => m.website).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">With Logos</p>
              <p className="text-2xl font-semibold text-green-900">{manufacturers.filter(m => m.logo).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingManufacturer ? 'Edit Manufacturer' : 'Add New Manufacturer'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingManufacturer(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor Name *
                  </label>
                  <input
                    type="text"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="e.g., Prusa Research, Polymaker, eSUN"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="https://example.com/logo.png"
                  />
                  {formData.logo && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-2">Logo Preview:</p>
                      <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.logo}
                          alt="Logo preview"
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const sibling = target.nextElementSibling as HTMLElement;
                            if (sibling) sibling.textContent = 'Invalid URL';
                          }}
                        />
                        <span className="text-xs text-gray-400 hidden">Invalid URL</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingManufacturer(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {editingManufacturer ? 'Update Manufacturer' : 'Create Manufacturer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Manufacturers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manufacturers.map((manufacturer) => (
          <div key={manufacturer.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {manufacturer.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={manufacturer.logo}
                      alt={`${manufacturer.vendor} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{manufacturer.vendor}</h3>
                  {manufacturer.website && (
                    <a
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate block"
                    >
                      {manufacturer.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={() => handleEdit(manufacturer)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit manufacturer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(manufacturer.id || '')}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete manufacturer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                {manufacturer.website && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Website
                  </span>
                )}
                {manufacturer.logo && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Logo
                  </span>
                )}
              </div>
              {manufacturer.website && (
                <a
                  href={manufacturer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
                >
                  <span>Visit</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {manufacturers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No manufacturers</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a manufacturer.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add your first manufacturer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
