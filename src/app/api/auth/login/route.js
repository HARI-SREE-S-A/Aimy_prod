import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    // In a real app, this should be stored in an environment variable e.g., process.env.ADMIN_PASSWORD
    const correctPassword = process.env.ADMIN_PASSWORD || 'AimyAdmin2026';
    
    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only secure cookie for auth
      response.cookies.set('admin_token', 'authenticated_aimy_admin', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
