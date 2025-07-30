import { NextResponse } from 'next/server';

const mockManufacturers = [
  {
    id: '1',
    vendor: 'ACME Filaments',
    website: 'https://acmefilaments.com',
    logo: 'https://via.placeholder.com/100x50/0066cc/ffffff?text=ACME'
  },
  {
    id: '2',
    vendor: 'Premium Plastics Co.',
    website: 'https://premiumplastics.co',
    logo: 'https://via.placeholder.com/100x50/cc6600/ffffff?text=PPC'
  },
  {
    id: '3',
    vendor: 'EcoFilament',
    website: 'https://ecofilament.com',
    logo: 'https://via.placeholder.com/100x50/009900/ffffff?text=ECO'
  }
];

export async function GET() {
  return NextResponse.json(mockManufacturers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newManufacturer = {
      id: String(mockManufacturers.length + 1),
      ...body
    };
    mockManufacturers.push(newManufacturer);
    return NextResponse.json(newManufacturer, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
