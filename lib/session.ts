import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type UserSession = {
  accessToken?: string;
  login?: string;
  avatarUrl?: string;
  name?: string | null;
};

const password = process.env.SESSION_PASSWORD;

export const sessionOptions: SessionOptions = {
  cookieName: "xiyu_github_session",
  // Gunakan password bawaan 32 karakter jika SESSION_PASSWORD di Vercel belum diisi
  password: password && password.length >= 32 
    ? password 
    : "bagja_uploader_secret_session_key_32char_min",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  }
};

export async function getSession() {
  return getIronSession<UserSession>(await cookies(), sessionOptions);
}
