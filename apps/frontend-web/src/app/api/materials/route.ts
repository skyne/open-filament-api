import { NextResponse } from 'next/server';

const mockMaterials = [
  {
    id: '1',
    type: 'PLA',
    description: 'Polylactic Acid - Easy to print biodegradable plastic',
    diameter: 1.75,
    densityGcm3: 1.24,
    youngModulusGpa: 3.5,
    tensileStrengthMpa: 65,
    creep: false,
    bio: true,
    fdaCompliant: false,
    hasAdditives: false,
    glass_transition_c: 60,
    melting_point_c: 180,
    polymer: 'PLA'
  },
  {
    id: '2',
    type: 'PETG',
    description: 'Polyethylene Terephthalate Glycol - Strong and clear',
    diameter: 1.75,
    densityGcm3: 1.27,
    youngModulusGpa: 2.1,
    tensileStrengthMpa: 50,
    creep: false,
    bio: false,
    fdaCompliant: true,
    hasAdditives: false,
    glass_transition_c: 80,
    melting_point_c: 245,
    polymer: 'PETG'
  }
];

export async function GET() {
  return NextResponse.json(mockMaterials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newMaterial = {
      id: String(mockMaterials.length + 1),
      ...body
    };
    mockMaterials.push(newMaterial);
    return NextResponse.json(newMaterial, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
