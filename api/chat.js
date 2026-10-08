const MODEL_ID = "openai/gpt-6-luna";
const SYSTEM_PROMPT = `You are Surf India’s friendly surf guide. Help visitors explore surf spots and surf schools on the southern coasts of India. The site covers Mulki and Panambur in Karnataka; Varkala and Kovalam in Kerala; and Covelong and Mahabalipuram in Tamil Nadu. The listed schools are Surf Brothers, Sassha Surf School, Panambur Surfschool, Elixir Surf School, Moana Surf Club, Copa Cabana Surf School, Mahalo Surf, Mahabs Surf And Stay, Murthy Surf School, and Bay of Life. Keep answers clear, warm, and concise. Help beginners understand break types and suggest questions to ask a local school. Ratings on the site are public review snapshots and can change. Do not invent prices, opening hours, contact details, live surf conditions, tide or forecast information, or specific safety guarantees. Say when you do not know, and recommend checking current conditions and details with local surf schools or lifeguards. Do not claim you checked live data. If a question is unrelated to surfing or the southern India guide, briefly steer the visitor back to the site’s topic.`;

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST for chat messages." });
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Chat is not connected yet. Add the AI Gateway key in the server settings." });
  }

  const input = req.body && Array.isArray(req.body.messages) ? req.body.messages : null;
  if (!input || input.length < 1 || input.length > 12) {
    return res.status(400).json({ error: "Send up to 12 recent chat messages." });
  }

  const messages = [];
  let totalChars = 0;
  for (const item of input) {
    if (!item || !["user", "assistant"].includes(item.role) || typeof item.content !== "string") {
      return res.status(400).json({ error: "Chat messages must contain plain text." });
    }
    const content = item.content.trim();
    if (!content || content.length > 1200) {
      return res.status(400).json({ error: "Each message must be between 1 and 1,200 characters." });
    }
    totalChars += content.length;
    if (totalChars > 6000) {
      return res.status(400).json({ error: "That conversation is too long. Start a fresh chat." });
    }
    messages.push({ role: item.role, content });
  }
  if (messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "The latest chat message must be a question." });
  }

  try {
    const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_completion_tokens: 450,
        stream: false,
      }),
    });

    if (!response.ok) {
      console.error("AI Gateway returned status", response.status);
      return res.status(502).json({ error: "I couldn’t get a reply just now. Please try again." });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(502).json({ error: "I couldn’t get a reply just now. Please try again." });
    }
    return res.status(200).json({ reply: reply.trim(), model: MODEL_ID });
  } catch (error) {
    console.error("AI Gateway request failed", error?.name || "unknown error");
    return res.status(502).json({ error: "Chat is temporarily unavailable. Please try again soon." });
  }
};

