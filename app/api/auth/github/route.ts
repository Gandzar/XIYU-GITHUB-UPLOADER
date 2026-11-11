import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;

  // Memastikan fallback URL mengarah ke domain Vercel, bukan localhost:3000
  const baseUrl = process.env.NEXTAUTH_URL || 'https://devxiyu.vercel.app';
  const redirectUri = `${baseUrl}/api/auth/github/callback`;

  // Validasi jika Client ID belum terpasang di Environment Variables
  if (!clientId) {
    return NextResponse.redirect(
      new URL('/login?error=oauth_not_configured', baseUrl)
    );
  }

  // Parameter scope untuk izin akses repositori GitHub
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo user',
  });

  // Redirect pengguna ke halaman otorisasi OAuth GitHub
  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}
