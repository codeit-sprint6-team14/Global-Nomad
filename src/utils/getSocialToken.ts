import axios from 'axios';

const GOOGLE_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export const getGoogleToken = async (code: string): Promise<string> => {
  const url = 'https://oauth2.googleapis.com/token';
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY || '',
    redirect_uri: GOOGLE_URI || '',
    code,
  });

  const { data } = await axios.post<{ id_token: string }>(url, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  });

  return data.id_token;
};

export const getKakaoToken = async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');

  return code;
};
