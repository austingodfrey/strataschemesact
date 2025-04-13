export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { fname, organisation, email, reportType, description } = req.body;
  
        console.log("✅ Received feedback:");
        console.log({ fname, organisation, email, reportType, description });
  
        // You can now send to a DB, email service, etc.
  
        return res.status(200).json({ message: "Feedback received successfully!" });
      } catch (error) {
        console.error("❌ Error processing feedback:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    } else {
      // Not a POST request
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }