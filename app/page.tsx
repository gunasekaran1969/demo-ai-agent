'use client';

import { FormEvent, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || 'No reply generated.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.badge}>DEMO</p>
            <h1 style={styles.title}>AI Agent</h1>
          </div>
          <span style={styles.status}>No API key required</span>
        </header>

        <div style={styles.chatBox}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              <strong>Hello!</strong>
              <p>Ask me anything — I can answer general questions, explain concepts, and help with ideas.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                style={{
                  ...styles.message,
                  ...(message.role === 'user' ? styles.userMessage : styles.assistantMessage),
                }}
              >
                <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong>
                <div style={styles.messageText}>{message.content}</div>
              </div>
            ))
          )}

          {isLoading && (
            <div style={{ ...styles.message, ...styles.assistantMessage }}>
              <strong>AI:</strong>
              <div style={styles.messageText}>Thinking...</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            style={styles.input}
            aria-label="Ask the AI agent"
          />
          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #eef2ff 100%)',
  },
  shell: {
    width: '100%',
    maxWidth: '900px',
    background: '#ffffff',
    border: '1px solid #dbeafe',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.10)',
    padding: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '18px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '16px',
  },
  badge: {
    margin: 0,
    fontSize: '11px',
    letterSpacing: '0.12em',
    color: '#2563eb',
    fontWeight: 700,
  },
  title: {
    margin: '4px 0 0',
    fontSize: '2rem',
  },
  status: {
    background: '#ecfeff',
    color: '#0f766e',
    border: '1px solid #a7f3d0',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: 700,
  },
  chatBox: {
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    background: '#f8fafc',
    minHeight: '420px',
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '16px',
    marginBottom: '18px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '360px',
    textAlign: 'center',
    color: '#475569',
    lineHeight: 1.6,
  },
  message: {
    borderRadius: '14px',
    padding: '12px 14px',
    marginBottom: '12px',
    lineHeight: 1.6,
    border: '1px solid #e2e8f0',
  },
  userMessage: {
    background: '#dbeafe',
  },
  assistantMessage: {
    background: '#ffffff',
  },
  messageText: {
    marginTop: '6px',
    whiteSpace: 'pre-wrap',
  },
  form: {
    display: 'flex',
    gap: '12px',
  },
  input: {
    flex: 1,
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    border: 'none',
    borderRadius: '12px',
    background: '#111827',
    color: '#fff',
    padding: '14px 22px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
};
