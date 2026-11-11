import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const baseUrl = process.env.NEXTAUTH_URL || 'https://devxiyu.vercel.app';
  const redirectUri = `${baseUrl}/api/auth/github/callback`;

  if (!clientId) {
    return NextResponse.redirect(
      new URL('/login?error=oauth_not_configured', baseUrl)
    );
  }

  // Buat URL otorisasi GitHub OAuth dengan parameter yang benar
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.append('client_id', clientId);
  githubAuthUrl.searchParams.append('redirect_uri', redirectUri);
  githubAuthUrl.searchParams.append('scope', 'repo user');

  return NextResponse.redirect(githubAuthUrl.toString());
}
