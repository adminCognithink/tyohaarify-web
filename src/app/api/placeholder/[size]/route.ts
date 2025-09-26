import { NextRequest, NextResponse } from 'next/server';

// Generate SVG placeholder images
export async function GET(
  request: NextRequest,
  { params }: { params: { size: string } }
) {
  try {
    const size = params.size;
    const [width, height] = size.split('x').map(Number);
    
    // Default to square if height not provided
    const w = width || 64;
    const h = height || width || 64;
    
    // Generate SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${w}" height="${h}" fill="#e5e7eb"/>
        <rect x="${w * 0.2}" y="${h * 0.2}" width="${w * 0.6}" height="${h * 0.6}" fill="#9ca3af" rx="4"/>
        <text x="${w / 2}" y="${h / 2}" text-anchor="middle" dominant-baseline="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="${Math.min(w, h) * 0.1}">${w}×${h}</text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Placeholder error:', error);
    return NextResponse.json(
      { error: 'Failed to generate placeholder' },
      { status: 500 }
    );
  }
}