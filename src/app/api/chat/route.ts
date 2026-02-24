import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json();

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { response: "OpenRouter API key not configured. Please add OPENROUTER_API_KEY to .env.local" },
        { status: 200 }
      );
    }

    const messages = [
      {
        role: "system",
        content: context,
      },
      ...(history || []),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/ARtoRiAs10",
        "X-Title": "Gaurav Kumar Portfolio",
      },
      body: JSON.stringify({
        model: "stepfun/step-3.5-flash:free",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter error:", errorData);
      return NextResponse.json(
        { response: "Failed to get response from AI. Please try again." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: "An error occurred. Please try again." },
      { status: 200 }
    );
  }
}
