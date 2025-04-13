export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    try {
      const message = "🚨 Fire alarm test at 2 PM.";
      const timestamp = new Date().toISOString();
  
      return new Response(
        JSON.stringify({ message, timestamp }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("Edge function broken:", err);
      return new Response(
        JSON.stringify({ error: "Internal server error", detail: err.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json" },
        }
      );
    }
  }