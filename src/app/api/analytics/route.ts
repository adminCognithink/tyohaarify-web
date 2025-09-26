import { NextRequest, NextResponse } from 'next/server';

// Simple analytics endpoint to track user interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log analytics data (in production, you'd send this to your analytics service)
    console.log('Analytics Event:', {
      timestamp: new Date().toISOString(),
      ...body
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Analytics event recorded' 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record analytics event' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Analytics API is running',
    endpoints: {
      POST: '/api/analytics - Record analytics events'
    }
  });
}