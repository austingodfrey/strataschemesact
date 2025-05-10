import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

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
    const existing = await redis.get(`user:${username}`);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store as a JSON string
    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    await redis.set(`user:${username}`, JSON.stringify(userData));

    return res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}