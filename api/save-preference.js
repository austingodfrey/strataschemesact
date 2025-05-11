import { kv } from '@vercel/kv';

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

    // Ensure the base structure
    if (typeof user !== 'object' || user === null) {
      user = {};
    }

    // Merge preference
    user.preference = {
      ...(user.preference || {}),
      ...preference
    };

    await kv.set(key, user);
    return res.status(200).json({ message: 'Preference saved successfully' });

  } catch (err) {
    console.error('Error saving preference:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
