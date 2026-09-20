"use client";

import { useState } from "react";

type ChatStatusFormProps = {
  conversationId: number;
  currentStatus: string;
};

const statuses = [
  {
    value: "NOVA",
    label: "Nova",
  },
  {
    value: "EM_ATENDIMENTO",
    label: "Em atendimento",
  },
  {
    value: "CONCLUIDA",
    label: "Concluída",
  },
];

export default function ChatStatusForm({
  conversationId,
  currentStatus,
}: ChatStatusFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(newStatus: string) {
    if (newStatus === status || saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/atendimento/${conversationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Não foi possível alterar o estado."
        );
      }

      setStatus(newStatus);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o estado."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-chat-status-form">
      <span className="admin-section-label">
        ESTADO DA CONVERSA
      </span>

      <div className="admin-chat-status-options">
        {statuses.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`admin-chat-status-option status-${item.value.toLowerCase()} ${
              status === item.value ? "active" : ""
            }`}
            onClick={() => handleChange(item.value)}
            disabled={saving}
          >
            <span className="admin-chat-status-dot"></span>

            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {saving && (
        <span className="admin-chat-status-saving">
          A atualizar...
        </span>
      )}

      {error && (
        <div className="admin-chat-status-error">
          {error}
        </div>
      )}
    </div>
  );
}