import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  // Deteksi domain Vercel sacara otomatis
  const url = new URL(request.url);
  const baseUrl = process.env.NEXTAUTH_URL || `${url.protocol}//${url.host}`;
  const redirectUri = `${baseUrl}/api/auth/github/callback`;

  // Cek naha GITHUB_CLIENT_ID aya
  if (!clientId || clientId.trim() === '') {
    return NextResponse.redirect(
      new URL('/login?error=missing_client_id', baseUrl)
    );
  }

  // Gunakeun URLSearchParams sangkan parameter di-encode ku sistem standar GitHub
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.set('scope', 'repo user');

  return NextResponse.redirect(githubAuthUrl.toString());
}
