import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Ambil Client ID dari environment variable
  const clientId = process.env.GITHUB_CLIENT_ID;

  // Deteksi domain aktif secara otomatis jika NEXTAUTH_URL belum terbaca
  const url = new URL(request.url);
  const baseUrl = process.env.NEXTAUTH_URL || `${url.protocol}//${url.host}`;
  const redirectUri = `${baseUrl}/api/auth/github/callback`;

  // Jika Client ID tidak ada / kosong, lempar balik ke login dengan pesan khusus
  if (!clientId || clientId.trim() === '') {
    console.error('ERROR: GITHUB_CLIENT_ID is missing in process.env');
    return NextResponse.redirect(
      new URL('/login?error=missing_client_id', baseUrl)
    );
  }

  // Susun URL otorisasi GitHub OAuth dengan encoding aman
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo%20user`;

  return NextResponse.redirect(githubAuthUrl);
}
