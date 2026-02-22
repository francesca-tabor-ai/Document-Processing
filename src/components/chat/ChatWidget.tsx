"use client";

import * as React from "react";
import { getReply, PROMPT_PROBES } from "@/lib/chat/knowledge";

type Message = { id: string; role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi! I’m your OptiFlowAI guide. Ask me how to upload documents, use the review workflow, check the audit log, or anything else about the platform.";

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const listEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = React.useCallback(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    if (messages.length) scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = React.useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      // Simulate a short delay, then reply from knowledge base
      const reply = getReply(trimmed);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: reply,
          },
        ]);
        setLoading(false);
      }, 400);
    },
    [loading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleProbe = (probe: string) => {
    sendMessage(probe);
  };

  const showProbes = messages.length === 0;

  return (
    <>
      {/* Floating chat button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-medium transition-smooth hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
        aria-label={open ? "Close chat" : "Open help chat"}
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <ChatIcon className="h-6 w-6" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 flex w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-xl border border-grey-200 bg-white shadow-medium transition-smooth"
          role="dialog"
          aria-label="Help chat"
        >
          <div className="border-b border-grey-200 bg-grey-50 px-4 py-3">
            <h2 className="text-sm font-semibold text-primary">
              OptiFlowAI guide
            </h2>
            <p className="text-xs text-grey-600">
              Ask about documents, review, workflows, and more
            </p>
          </div>

          <div className="flex max-h-[360px] min-h-[280px] flex-1 flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {showProbes ? (
                <>
                  <div className="mb-4 rounded-lg bg-grey-100 px-3 py-2.5 text-sm text-primary">
                    {WELCOME}
                  </div>
                  <p className="mb-2 text-xs font-medium text-grey-500">
                    Try asking:
                  </p>
                  <ul className="space-y-1.5">
                    {PROMPT_PROBES.map((probe) => (
                      <li key={probe}>
                        <button
                          type="button"
                          onClick={() => handleProbe(probe)}
                          className="w-full rounded-lg border border-grey-200 bg-white px-3 py-2 text-left text-sm text-primary transition-smooth hover:border-primary/30 hover:bg-grey-50"
                        >
                          {probe}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul className="space-y-4">
                  {messages.map((m) => (
                    <li
                      key={m.id}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                          m.role === "user"
                            ? "bg-primary text-white"
                            : "bg-grey-100 text-primary"
                        }`}
                      >
                        {m.role === "assistant" ? (
                          <span
                            className="whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                              __html: m.content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                            }}
                          />
                        ) : (
                          <span className="whitespace-pre-wrap">{m.content}</span>
                        )}
                      </div>
                    </li>
                  ))}
                  {loading && (
                    <li className="flex justify-start">
                      <div className="rounded-xl bg-grey-100 px-3 py-2 text-sm text-grey-600">
                        …
                      </div>
                    </li>
                  )}
                  <div ref={listEndRef} />
                </ul>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-grey-200 p-3"
            >
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Ask about the platform..."
                  rows={1}
                  className="min-h-[40px] flex-1 resize-none rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm text-primary placeholder:text-grey-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-smooth hover:opacity-90 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
              {!showProbes && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PROMPT_PROBES.slice(0, 3).map((probe) => (
                    <button
                      key={probe}
                      type="button"
                      onClick={() => handleProbe(probe)}
                      className="rounded-full border border-grey-200 bg-white px-2.5 py-1 text-xs text-grey-600 transition-smooth hover:border-primary/30 hover:bg-grey-50 hover:text-primary"
                    >
                      {probe}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
