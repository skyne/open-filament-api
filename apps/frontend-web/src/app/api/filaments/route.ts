import { NextResponse } from 'next/server';

// Mock data for development
const mockFilaments = [
  {
    id: '1',
    name: 'Premium PLA Black',
    material: 'PLA',
    brand: 'ACME Filaments',
    hex: '#000000',
    hotend_min: 190,
    hotend_max: 220,
    bed_min: 50,
    bed_max: 70
  },
  {
    id: '2',
    name: 'Tough PETG Clear',
    material: 'PETG',
    brand: 'ACME Filaments',
    hex: '#FFFFFF',
    hotend_min: 220,
    hotend_max: 250,
    bed_min: 70,
    bed_max: 90
  }
];

export async function GET() {
  return NextResponse.json(mockFilaments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newFilament = {
      id: String(mockFilaments.length + 1),
      ...body
    };
    mockFilaments.push(newFilament);
    return NextResponse.json(newFilament, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
