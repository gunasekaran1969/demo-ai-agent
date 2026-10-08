# Demo AI Agent

A Vercel-ready AI agent powered by OpenAI.

## Features
- Real AI answers using OpenAI
- Chat-style interface
- No hardcoded replies for general questions
- Ready for deployment on Vercel

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

3. Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_real_key_here
```

4. Run locally:

```bash
npm run dev
```

Then open: http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the environment variable:
   - `OPENAI_API_KEY`
4. Deploy.

Your app will usually be live at a URL like:

https://demo-ai-agent.vercel.app
