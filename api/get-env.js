export default async function handler(req, res) {
    if (req.method === 'GET') {
      const msg = process.env.NEXT_PUBLIC_SUBMITTED || "No message set";
  
      console.log("Loaded environmental variable through serverless function", msg);
  
      return res.status(200).json({ message: msg });
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }