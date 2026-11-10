"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getChat,
  listChats,
  sendChat,
  type ChatConversationSummary,
  type ChatMessage,
  type TrackCompany,
} from "@/lib/api";
import { useLanguage } from "@/i18n/LanguageProvider";

export function OfferChat({
  token,
  companies,
}: {
  token: string;
  companies: TrackCompany[];
}) {
  const { locale, t } = useLanguage();
  const [conversations, setConversations] = useState<ChatConversationSummary[]>(
    []
  );
  const [activeCompanyId, setActiveCompanyId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const lastIdRef = useRef(0);

  const loadList = useCallback(async () => {
    if (companies.length === 0) return;
    try {
      const data = await listChats(token, locale);
      setConversations(data.conversations || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.error);
    }
  }, [companies.length, locale, t.error, token]);

  const loadThread = useCallback(
    async (companyId: number, silent = false) => {
      try {
        const afterId = silent ? lastIdRef.current : 0;
        const data = await getChat(token, companyId, afterId, locale);
        if (silent && afterId > 0) {
          if (data.messages.length) {
            setMessages((prev) => {
              const ids = new Set(prev.map((m) => m.id));
              const merged = [
                ...prev,
                ...data.messages.filter((m) => !ids.has(m.id)),
              ];
              lastIdRef.current = merged[merged.length - 1]?.id || lastIdRef.current;
              return merged;
            });
          }
        } else {
          setMessages(data.messages || []);
          lastIdRef.current =
            data.messages[data.messages.length - 1]?.id || 0;
        }
      } catch (e) {
        if (!silent) setError(e instanceof Error ? e.message : t.error);
      }
    },
    [locale, t.error, token]
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    if (!activeCompanyId) return;
    loadThread(activeCompanyId);
    const timer = setInterval(() => loadThread(activeCompanyId, true), 8000);
    return () => clearInterval(timer);
  }, [activeCompanyId, loadThread]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeCompanyId]);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!activeCompanyId || !draft.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const msg = await sendChat(token, activeCompanyId, draft.trim(), locale);
      setMessages((prev) => [...prev, msg]);
      lastIdRef.current = msg.id;
      setDraft("");
      await loadList();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
    } finally {
      setBusy(false);
    }
  }

  if (companies.length === 0) {
    return (
      <section className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-[var(--ak-navy)]">{t.chatTitle}</h2>
        <p className="mt-2 text-sm text-[var(--ak-muted)]">{t.chatNoCompanies}</p>
      </section>
    );
  }

  const activeCompany =
    companies.find((c) => c.id === activeCompanyId) ||
    conversations.find((c) => c.company.id === activeCompanyId)?.company;

  return (
    <section className="rounded-3xl border border-[var(--ak-border)] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--ak-navy)]">{t.chatTitle}</h2>
        <p className="text-sm text-[var(--ak-muted)]">{t.chatHint}</p>
      </div>

      {error && (
        <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {!activeCompanyId ? (
        <ul className="space-y-3">
          {companies.map((company) => {
            const summary = conversations.find(
              (c) => c.company.id === company.id
            );
            return (
              <li
                key={company.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--ak-border)] px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-[var(--ak-navy)]">
                    {company.name}
                  </p>
                  <p className="truncate text-xs text-[var(--ak-muted)]">
                    {summary?.last_message?.body || t.chatEmpty}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(summary?.unread_count || 0) > 0 && (
                    <span className="rounded-full bg-[var(--ak-orange)] px-2 py-0.5 text-[10px] font-semibold text-white">
                      {summary?.unread_count} {t.chatUnread}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveCompanyId(company.id)}
                    className="rounded-full bg-[var(--ak-blue)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--ak-blue-dark)]"
                  >
                    {t.chatOpen}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[var(--ak-border)]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--ak-border)] bg-[var(--ak-bg)] px-4 py-3">
            <div>
              <p className="font-semibold text-[var(--ak-navy)]">
                {activeCompany && "name" in activeCompany
                  ? activeCompany.name
                  : t.chatCompany}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveCompanyId(null);
                setMessages([]);
                lastIdRef.current = 0;
                loadList();
              }}
              className="text-xs font-medium text-[var(--ak-blue)]"
            >
              {t.chatBack}
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-white px-4 py-4">
            {messages.length === 0 ? (
              <p className="text-center text-sm text-[var(--ak-muted)]">
                {t.chatEmpty}
              </p>
            ) : (
              messages.map((msg) => {
                const mine = msg.sender_type === "customer";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        mine
                          ? "bg-[var(--ak-blue)] text-white"
                          : "bg-[var(--ak-bg)] text-[var(--ak-navy)]"
                      }`}
                    >
                      <p className="mb-1 text-[10px] opacity-70">
                        {mine ? t.chatYou : t.chatCompany}
                      </p>
                      <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSend}
            className="flex gap-2 border-t border-[var(--ak-border)] bg-white p-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 rounded-xl border border-[var(--ak-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--ak-blue)]"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="rounded-xl bg-[var(--ak-navy)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? t.sending : t.chatSend}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
