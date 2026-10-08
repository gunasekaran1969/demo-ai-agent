import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: 'Missing OPENAI_API_KEY environment variable.',
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI assistant. Answer clearly and use plain language. Be accurate and brief unless the user asks for more detail.',
        },
        ...messages.map((message: any) => ({
          role: message.role,
          content: message.content,
        })),
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'No response generated.';

    return Response.json({ reply });
  } catch (error: any) {
    console.error('OpenAI request failed:', error);
    return Response.json(
      {
        error: error.message || 'Failed to generate response.',
      },
      { status: 500 }
    );
  }
}
