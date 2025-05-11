// File: /api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  const options = {
    path: '/',
    maxAge: 0, // Expire immediately
  };

  res.setHeader('Set-Cookie', [
    serialize('session_user', '', options),
    serialize('client_user', '', options),
  ]);

  return res.status(200).json({ message: 'Logged out successfully' });
}
