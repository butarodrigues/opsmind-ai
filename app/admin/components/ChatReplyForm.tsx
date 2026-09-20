"use client";

import { FormEvent, useState } from "react";

type ChatReplyFormProps = {
  conversationId: number;
};

export default function ChatReplyForm({
  conversationId,
}: ChatReplyFormProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = message.trim();

    if (!text || sending) {
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/atendimento/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data: {
        error?: string;
        message?: unknown;
      } = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();

        console.error(
          "Resposta inesperada da API:",
          textResponse
        );

        throw new Error(
          "O servidor devolveu uma resposta inesperada."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Não foi possível enviar a resposta."
        );
      }

      setMessage("");

      window.location.reload();
    } catch (error) {
      console.error(
        "Erro ao enviar resposta:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a resposta."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="admin-chat-reply-form"
      onSubmit={handleSubmit}
    >
      <textarea
        value={message}
        onChange={(event) =>
          setMessage(event.target.value)
        }
        placeholder="Escreva a sua resposta ao visitante..."
        rows={5}
        disabled={sending}
      />

      {error && (
        <div className="admin-chat-reply-error">
          {error}
        </div>
      )}

      <div className="admin-chat-reply-footer">
        <span>
          A resposta será registada no histórico da
          conversa.
        </span>

        <button
          type="submit"
          disabled={sending || !message.trim()}
        >
          {sending
            ? "A enviar..."
            : "Enviar resposta →"}
        </button>
      </div>
    </form>
  );
}