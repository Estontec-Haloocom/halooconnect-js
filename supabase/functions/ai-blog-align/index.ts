import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { html } = await req.json();
    if (!html || typeof html !== "string") {
      return new Response(JSON.stringify({ error: "HTML content is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert HTML content formatter for blog posts. Your ONLY job is to improve the visual structure, alignment, and layout of the given HTML content.

CRITICAL RULES:
1. DO NOT change, rewrite, add, or remove ANY text content whatsoever.
2. DO NOT change the meaning or wording of any sentence.
3. DO NOT add new content or remove existing content.
4. DO NOT change any image URLs or link URLs.

WHAT YOU SHOULD DO:
- Add proper paragraph (<p>) wrapping around loose text
- Ensure proper spacing between sections using appropriate HTML tags
- Wrap related content in proper semantic HTML (headings, paragraphs, lists)
- Fix broken or inconsistent list formatting (ensure <ul>/<ol> with <li> items)
- Ensure headings use proper hierarchy (H1 > H2 > H3)
- Add line breaks where content feels cramped
- Ensure blockquotes are properly formatted
- Clean up redundant or nested tags
- Ensure tables are properly structured
- Add proper spacing between different content blocks
- Make sure images have proper paragraph wrapping for spacing
- Ensure consistent alignment throughout the content

Return ONLY the improved HTML. No explanations, no markdown, no code blocks - just the raw HTML.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Format and align this blog HTML content. Remember: DO NOT change any text, only improve structure and layout:\n\n${html}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let formattedHtml = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if model wraps output
    formattedHtml = formattedHtml.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();

    return new Response(JSON.stringify({ html: formattedHtml }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-blog-align error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
