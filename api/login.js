import { kv } from '@vercel/kv';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const userKey = `user:${username}`;

  try {
    const rawUser = await kv.get(userKey);
    const user = typeof rawUser === 'string' ? JSON.parse(rawUser) : rawUser;

    if (!user || typeof user !== 'object') {
      return res.status(401).json({ error: 'User not found or invalid data format' });
    }

    if (user.email !== email) {
      return res.status(401).json({ error: 'Invalid credentials (email)' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials (password)' });
    }

    // ✅ Create server-only session cookie
    const sessionCookie = serialize('session_user', username, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });

    // ✅ Create merged client_user cookie (username + bgColor preference)
    const clientPayload = JSON.stringify({
      username,
      ...(user.preference?.bgColor && { bgColor: user.preference.bgColor }),
    });

    const clientCookie = serialize('client_user', clientPayload, {
      httpOnly: false,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'strict',
    });

    // ✅ Send both cookies
    res.setHeader('Set-Cookie', [sessionCookie, clientCookie]);

    return res.status(200).json({ reply: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
}
