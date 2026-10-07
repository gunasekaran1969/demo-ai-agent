export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.messages?.[0]?.content || '';

    const reply = generateDemoResponse(prompt);

    return Response.json({ reply });
  } catch (error) {
    console.error('Chat route error:', error);
    return Response.json(
      { reply: 'Sorry, I could not process that request.' },
      { status: 500 }
    );
  }
}

function generateDemoResponse(input: string) {
  const text = (input || '').trim();

  if (!text) {
    return 'Please enter a question so I can help.';
  }

  const lower = text.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! I am a demo AI agent. Ask me about technology, science, business, or general knowledge.';
  }

  if (lower.includes('who are you') || lower.includes('what are you')) {
    return 'I am a demo AI agent built for a simple Vercel demo. I can answer general questions and help with quick explanations.';
  }

  if (lower.includes('time') || lower.includes('date')) {
    return `The current date and time is: ${new Date().toString()}`;
  }

  if (lower.includes('weather')) {
    return 'I cannot check live weather right now in this demo, but I can help you plan based on a city if you tell me where you are.';
  }

  if (lower.includes('capital of france')) {
    return 'The capital of France is Paris.';
  }

  if (lower.includes('capital of japan')) {
    return 'The capital of Japan is Tokyo.';
  }

  if (lower.includes('what is ai') || lower.includes('ai')) {
    return 'AI, or artificial intelligence, is the simulation of human-like reasoning in machines. It helps systems recognize patterns, make predictions, and automate tasks.';
  }

  if (lower.includes('what is next.js') || lower.includes('next.js')) {
    return 'Next.js is a React framework for building fast web apps with features like routing, server-side rendering, and static site generation.';
  }

  if (lower.includes('what is javascript') || lower.includes('javascript')) {
    return 'JavaScript is a scripting language used to build interactive web pages and web applications.';
  }

  if (lower.includes('how to learn coding')) {
    return 'Start by learning one language, practice small projects, build a portfolio, and review code regularly. A good beginner path is HTML/CSS, then JavaScript, then a framework like React or Next.js.';
  }

  const mathMatch = text.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)/);
  if (mathMatch) {
    const [, a, operator, b] = mathMatch;
    const numA = Number(a);
    const numB = Number(b);
    let result = 0;

    if (operator === '+') result = numA + numB;
    if (operator === '-') result = numA - numB;
    if (operator === '*') result = numA * numB;
    if (operator === '/') result = numB === 0 ? 'undefined (division by zero)' : numA / numB;

    return `The result of ${a} ${operator} ${b} is ${result}.`;
  }

  if (lower.includes('explain') || lower.includes('tell me about')) {
    return `Here is a simple overview: ${text.replace(/^(explain|tell me about)\s+/i, '')}. In plain words, this means using a clear idea, a few examples, and easy-to-follow reasoning to help someone understand it quickly.`;
  }

  if (lower.includes('generate') || lower.includes('write')) {
    return `Here is a quick sample based on your request: "${text}". I can help turn this into a short paragraph, a polished message, or a project idea.`;
  }

  if (lower.includes('idea') || lower.includes('project')) {
    return 'A good simple project idea is a personal productivity app, a daily habit tracker, or a small AI chatbot demo built with Next.js.';
  }

  return `That is a good question. In this demo, I can respond to general topics like technology, programming, science, business, and everyday knowledge. A short answer: ${text.substring(0, 120)}${text.length > 120 ? '...' : ''}`;
}
