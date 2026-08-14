// Vercel Serverless API Route: /api/store
// Direct same-domain database API for AGNI-V2

let globalStore = null;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (body && typeof body === "object") {
        globalStore = body;

        try {
          await fetch("https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_v2_live", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } catch (e) {
          console.warn("Cloud persistence fallback error:", e);
        }

        return res.status(200).json({ success: true, store: globalStore });
      }
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  // GET Request
  if (!globalStore) {
    try {
      const fetchRes = await fetch("https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_v2_live?t=" + Date.now());
      if (fetchRes.ok) {
        const cloudData = await fetchRes.json();
        if (cloudData && typeof cloudData === "object" && (cloudData.products || cloudData.customerOrders)) {
          globalStore = cloudData;
        }
      }
    } catch (e) {
      console.warn("Cloud fetch fallback error:", e);
    }
  }

  return res.status(200).json(globalStore || {});
}
