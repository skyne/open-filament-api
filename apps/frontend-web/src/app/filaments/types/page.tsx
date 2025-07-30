'use client';

import Link from 'next/link';

export default function FilamentTypesPage() {
  // Common filament types with detailed information
  const filamentTypes = [
    { 
      id: 'pla', 
      name: 'PLA (Polylactic Acid)', 
      description: 'Easy to print, biodegradable, low temperature',
      printTemp: '190-220°C',
      bedTemp: '50-60°C',
      properties: ['Biodegradable', 'Low odor', 'Easy to print', 'Good surface finish'],
      applications: ['Prototyping', 'Decorative items', 'Educational models', 'Toys']
    },
    { 
      id: 'abs', 
      name: 'ABS (Acrylonitrile Butadiene Styrene)', 
      description: 'Strong, flexible, higher temperature resistance',
      printTemp: '220-250°C',
      bedTemp: '80-100°C',
      properties: ['High strength', 'Impact resistant', 'Flexible', 'Chemical resistant'],
      applications: ['Automotive parts', 'Electronic housings', 'Tools', 'Functional prototypes']
    },
    { 
      id: 'petg', 
      name: 'PETG (Polyethylene Terephthalate Glycol)', 
      description: 'Chemical resistant, clear, food safe',
      printTemp: '220-250°C',
      bedTemp: '70-80°C',
      properties: ['Crystal clear', 'Chemical resistant', 'Food safe', 'Strong'],
      applications: ['Food containers', 'Medical devices', 'Transparent parts', 'Chemical storage']
    },
    { 
      id: 'tpu', 
      name: 'TPU (Thermoplastic Polyurethane)', 
      description: 'Flexible, rubber-like, elastic',
      printTemp: '210-230°C',
      bedTemp: '40-60°C',
      properties: ['Highly flexible', 'Rubber-like', 'Tear resistant', 'Elastic'],
      applications: ['Phone cases', 'Gaskets', 'Flexible hinges', 'Wearables']
    },
    { 
      id: 'wood', 
      name: 'Wood Filled', 
      description: 'PLA with wood fibers, can be sanded and stained',
      printTemp: '190-220°C',
      bedTemp: '50-60°C',
      properties: ['Wood-like appearance', 'Can be sanded', 'Can be stained', 'Natural smell'],
      applications: ['Decorative objects', 'Artistic models', 'Furniture prototypes', 'Architectural models']
    },
    { 
      id: 'metal', 
      name: 'Metal Filled', 
      description: 'PLA with metal particles, can be polished',
      printTemp: '190-220°C',
      bedTemp: '50-60°C',
      properties: ['Metallic appearance', 'Heavier than regular PLA', 'Can be polished', 'Magnetic (steel filled)'],
      applications: ['Decorative items', 'Jewelry', 'Artistic sculptures', 'Mechanical prototypes']
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Filament Types</h1>
          <p className="text-gray-600 mt-2">Learn about different types of 3D printing filaments and their properties</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filamentTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-500">Print Temperature</span>
                  <p className="text-lg font-semibold text-gray-900">{type.printTemp}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Bed Temperature</span>
                  <p className="text-lg font-semibold text-gray-900">{type.bedTemp}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Properties</h4>
                <div className="flex flex-wrap gap-2">
                  {type.properties.map((property, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {property}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Common Applications</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {type.applications.map((application, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {application}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link 
                  href={`/filaments?type=${type.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
                >
                  View {type.name.split(' ')[0]} filaments
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to add filaments?</h3>
            <p className="text-blue-700 mb-4">Start building your filament inventory by adding your first spool</p>
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
