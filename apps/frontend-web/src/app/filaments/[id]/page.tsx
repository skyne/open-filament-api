'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { filamentApi, ApiFilament } from '../../../lib/api-client';

export default function FilamentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [filament, setFilament] = useState<ApiFilament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filamentId = params?.id as string;

  useEffect(() => {
    if (!filamentId) return;

    const fetchFilament = async () => {
      try {
        setLoading(true);
        const data = await filamentApi.getFilament(filamentId);
        setFilament(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch filament details. Make sure the API server is running.');
        console.error('Error fetching filament:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilament();
  }, [filamentId]);

  const handleDelete = async () => {
    if (!filament || !filament.id || !confirm(`Are you sure you want to delete "${filament.name}"?`)) {
      return;
    }

    try {
      await filamentApi.deleteFilament(filament.id);
      router.push('/filaments');
    } catch (err) {
      setError('Failed to delete filament');
      console.error('Error deleting filament:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !filament) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error || 'Filament not found'}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/filaments"
              className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Filaments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>›</span>
            <Link href="/filaments" className="hover:text-gray-700">Filaments</Link>
            <span>›</span>
            <span className="text-gray-900">{filament.name}</span>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{filament.name}</h1>
              <p className="text-gray-600 mt-2">Detailed filament information</p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href={`/filaments/${filament.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Filament Name</span>
                  <p className="text-lg text-gray-900 mt-1">{filament.name}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Material</span>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {filament.material}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Brand</span>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {filament.brand}
                    </span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Filament ID</span>
                  <p className="text-gray-600 mt-1 font-mono text-sm">{filament.id}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href={`/filaments/${filament.id}/edit`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Edit Filament</h3>
                      <p className="text-sm text-gray-500">Update filament details</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  href={`/filaments/types`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Learn About Types</h3>
                      <p className="text-sm text-gray-500">Explore filament types</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href="/filaments"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-medium text-gray-900">View All Filaments</span>
                  </div>
                </Link>
                
                <Link
                  href="/filaments/create"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium text-gray-900">Add New Filament</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Tip</h3>
              <p className="text-sm text-blue-800">
                Keep track of your filament usage and storage conditions to ensure the best 3D printing results.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/filaments"
            className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-2"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Filaments
          </Link>
        </div>
      </div>
    </div>
  );
}
