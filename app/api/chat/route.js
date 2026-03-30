export async function POST(req) {
  try {
    const { messages, systemPrompt } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 300,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `API Error: ${response.status}`;
      
      if (errorMessage.includes("quota") || errorMessage.includes("rate_limit") || response.status === 429) {
        return Response.json(
          { 
            success: false, 
            error: "AI service is busy. Please try again in a moment.",
            details: errorMessage
          },
          { status: 503 }
        );
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    
    // Generate follow-up suggestions
    const lastUserMsg = messages[messages.length - 1]?.content || "";
    const suggestionPrompt = `Based on the question: "${lastUserMsg}", suggest 3 short follow-up questions a visitor might ask Venkatesh. 
Return ONLY a JSON array, no other text:
["question 1?", "question 2?", "question 3?"]`;
    
    let suggestions = [];
    try {
      const suggestionRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 80,
          messages: [{ role: "user", content: suggestionPrompt }],
        }),
      });
      
      if (suggestionRes.ok) {
        const suggestionData = await suggestionRes.json();
        const suggestionText = suggestionData?.choices?.[0]?.message?.content || "";
        const parsed = JSON.parse(suggestionText);
        suggestions = Array.isArray(parsed) ? parsed.slice(0, 3) : [];
      }
    } catch (e) {
      // Silently fail, suggestions are optional
    }
    
    return Response.json({
      success: true,
      reply,
      suggestions,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { 
        success: false, 
        error: "Unable to connect to AI service. Please try again later.",
        details: error.message
      },
      { status: 500 }
    );
  }
}
