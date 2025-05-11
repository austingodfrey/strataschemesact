import { kv } from '@vercel/kv';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, preference } = req.body;

  if (!username || typeof preference !== 'object' || Array.isArray(preference)) {
    return res.status(400).json({ error: 'Missing or invalid data' });
  }

  try {
    const key = `user:${username}`;
    const existing = await kv.get(key);

    let user;
    try {
      user = typeof existing === 'string' ? JSON.parse(existing) : existing || {};
    } catch (parseErr) {
      console.error('User JSON parse error:', parseErr);
      return res.status(500).json({ error: 'Corrupted user data in store' });
    }

    // Ensure valid user object
    if (typeof user !== 'object' || user === null) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Merge and update preference
    user.preference = {
      ...(user.preference || {}),
      ...preference
    };

    // Save updated user back to KV
    await kv.set(key, user);

    // Rebuild client_user cookie with updated preference
    const clientPayload = JSON.stringify({
      username,
      ...(user.preference?.bgColor && { bgColor: user.preference.bgColor }),
    });

    const clientCookie = serialize('client_user', clientPayload, {
      httpOnly: false,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'strict',
    });

    res.setHeader('Set-Cookie', clientCookie);

    return res.status(200).json({ message: 'Preference saved successfully' });

  } catch (err) {
    console.error('Error saving preference:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
