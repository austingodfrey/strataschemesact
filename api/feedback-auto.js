export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    try {
      const { name = 'Resident', feedback } = await req.json();
  
      const timestamp = new Date().toLocaleString("en-AU", {
        timeZone: "Australia/Sydney",
        timeStyle: "short",
        dateStyle: "full",
      });
  
      const reply = `Thanks ${name}, we received your feedback at ${timestamp}.`;
  
      return new Response(JSON.stringify({ reply }), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid request', detail: err.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  