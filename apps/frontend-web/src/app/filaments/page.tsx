'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { filamentApi, ApiFilament } from '../../lib/api-client';

export default function FilamentsPage() {
  const [filaments, setFilaments] = useState<ApiFilament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilaments = async () => {
      try {
        setLoading(true);
        const data = await filamentApi.getAllFilaments();
        setFilaments(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch filaments. Make sure the API server is running.');
        console.error('Error fetching filaments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilaments();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await filamentApi.deleteFilament(id);
      setFilaments(filaments.filter(f => f.id !== id));
    } catch (err) {
      setError('Failed to delete filament');
      console.error('Error deleting filament:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Filament Inventory</h1>
            <p className="text-gray-600 mt-2">Manage your 3D printing filament collection</p>
          </div>
          <Link 
            href="/filaments/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Filament
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {filaments.length === 0 && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No filaments found</h3>
            <p className="mt-2 text-gray-500">Get started by adding your first filament to the inventory.</p>
            <Link 
              href="/filaments/create"
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add First Filament
            </Link>
          </div>
        )}

        {filaments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filaments.map((filament) => (
              <div key={filament.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{filament.name}</h3>
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: filament.hex }}
                        title={`Color: ${filament.hex}`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/filaments/${filament.id}/edit`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit filament"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => filament.id && handleDelete(filament.id, filament.name)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete filament"
                      disabled={!filament.id}
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Material:</span>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {filament.material}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Brand:</span>
                    <p className="mt-1 text-sm text-gray-700">{filament.brand}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500">Temperature Range:</span>
                    <p className="mt-1 text-sm text-gray-700">
                      Hotend: {filament.hotend_min}°C - {filament.hotend_max}°C<br />
                      Bed: {filament.bed_min}°C - {filament.bed_max}°C
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <Link 
                      href={`/filaments/${filament.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
                    >
                      View details
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
