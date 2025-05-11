import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Check if user already exists
    const existing = await kv.get(`user:${username}`);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user object
    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    await kv.set(`user:${username}`, userData);

    return res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('KV error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
