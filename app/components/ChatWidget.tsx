"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  type: "bot" | "user";
  text: string;
};

const WHATSAPP_NUMBER = "244933830408";

const options = [
  {
    id: "servicos",
    label: "🤖 Serviços de IA",
    response:
      "Podemos ajudar a sua empresa com soluções de Inteligência Artificial, automação inteligente e desenvolvimento de aplicações.",
  },
  {
    id: "dados",
    label: "📊 Dados & Analytics",
    response:
      "Trabalhamos com dados, analytics, dashboards, modelos preditivos e soluções para apoiar decisões empresariais.",
  },
  {
    id: "seguranca",
    label: "🔐 Cibersegurança",
    response:
      "Podemos ajudar na proteção de sistemas, infraestruturas, aplicações e dados através de soluções de cibersegurança.",
  },
  {
    id: "automacao",
    label: "⚙️ Automação",
    response:
      "Desenvolvemos soluções para automatizar processos, reduzir tarefas manuais e tornar as operações mais eficientes.",
  },
  {
    id: "compliance",
    label: "🛡️ Compliance & Risco",
    response:
      "Apoiamos organizações em Compliance, gestão de risco, controlos internos e soluções tecnológicas para conformidade.",
  },
  {
    id: "projeto",
    label: "💡 Desenvolver um projeto",
    response:
      "Excelente. Podemos analisar o seu desafio e estudar consigo uma solução tecnológica personalizada.",
  },
  {
    id: "formacao",
    label: "🎓 Formação & Academy",
    response:
      "A OpsMind Academy disponibiliza formação especializada em Inteligência Artificial, Dados, Cibersegurança e Compliance.",
  },
  {
    id: "equipa",
    label: "💬 Falar com a equipa",
    response:
      "Claro. Pode continuar a conversa aqui ou contactar diretamente a nossa equipa através do WhatsApp.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Olá! 👋 Como podemos ajudar?",
    },
  ]);

  const [input, setInput] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [sending, setSending] = useState(false);

  /*
   * =========================================================
   * CRIAR / RECUPERAR IDENTIFICADOR DO VISITANTE
   * =========================================================
   */
  useEffect(() => {
    const storageKey = "opsmind_chat_visitor_id";

    let id = localStorage.getItem(storageKey);

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(storageKey, id);
    }

    setVisitorId(id);
  }, []);

  /*
   * =========================================================
   * CARREGAR HISTÓRICO + RECEBER NOVAS MENSAGENS
   * =========================================================
   */
  useEffect(() => {
    if (!visitorId) {
      return;
    }

    async function loadMessages() {
      try {
        const response = await fetch(
          `/api/chat?visitorId=${encodeURIComponent(visitorId)}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!data.success || !data.messages) {
          return;
        }

        if (data.messages.length === 0) {
          return;
        }

        const serverMessages: Message[] = data.messages.map(
          (message: {
            id: number;
            senderType: string;
            senderName?: string | null;
            message: string;
          }) => ({
            id: message.id,
            type:
              message.senderType === "VISITOR"
                ? "user"
                : "bot",
            text: message.message,
          })
        );

        setMessages([
          {
            id: 1,
            type: "bot",
            text: "Olá! 👋 Como podemos ajudar?",
          },
          ...serverMessages,
        ]);
      } catch (error) {
        console.error(
          "Erro ao obter histórico da conversa:",
          error
        );
      }
    }

    loadMessages();

    const interval = setInterval(loadMessages, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [visitorId]);

  /*
   * =========================================================
   * ADICIONAR MENSAGEM LOCAL
   * =========================================================
   */
  function addUserMessage(text: string) {
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        type: "user",
        text,
      },
    ]);
  }

  function addBotMessage(text: string) {
    setMessages((current) => [
      ...current,
      {
        id: Date.now() + 1,
        type: "bot",
        text,
      },
    ]);
  }

  /*
   * =========================================================
   * ENVIAR MENSAGEM
   * =========================================================
   */
  async function sendMessage(message: string) {
    const cleanMessage = message.trim();

    if (!cleanMessage || !visitorId || sending) {
      return false;
    }

    addUserMessage(cleanMessage);
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId,
          message: cleanMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao enviar mensagem."
        );
      }

      console.log("Mensagem guardada:", data);

      return true;
    } catch (error) {
      console.error(
        "Erro ao enviar mensagem:",
        error
      );

      addBotMessage(
        "Não foi possível enviar a mensagem neste momento. Pode tentar novamente ou contactar-nos pelo WhatsApp."
      );

      return false;
    } finally {
      setSending(false);
    }
  }

  /*
   * =========================================================
   * OPÇÕES INICIAIS
   * =========================================================
   */
  async function handleOption(
    option: (typeof options)[number]
  ) {
    const success = await sendMessage(option.label);

    if (!success) {
      return;
    }

    setTimeout(() => {
      addBotMessage(option.response);
    }, 350);
  }

  /*
   * =========================================================
   * ENVIAR PELO INPUT
   * =========================================================
   */
  async function handleSend() {
    const message = input.trim();

    if (!message || sending) {
      return;
    }

    setInput("");

    await sendMessage(message);
  }

  /*
   * =========================================================
   * WHATSAPP
   * =========================================================
   */
  function handleWhatsApp() {
    const message = encodeURIComponent(
      "Olá, gostaria de falar com a equipa da OpsMind AI."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          className="chat-widget-button"
          onClick={() => setOpen(true)}
          aria-label="Abrir conversa com a OpsMind AI"
        >
          <span className="chat-widget-button-icon">
            💬
          </span>

          <span className="chat-widget-button-text">
            Fale connosco
          </span>
        </button>
      )}

      {open && (
        <div className="chat-widget">
          <div className="chat-widget-header">
            <div className="chat-widget-profile">
              <div className="chat-widget-avatar">
                AI
              </div>

              <div>
                <strong>OpsMind AI</strong>

                <span>
                  <i></i>
                  Online
                </span>
              </div>
            </div>

            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar conversa"
            >
              ×
            </button>
          </div>

          <div className="chat-widget-body">
            <div className="chat-widget-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${
                    message.type === "user"
                      ? "chat-message-user"
                      : "chat-message-bot"
                  }`}
                >
                  {message.text}
                </div>
              ))}

              {sending && (
                <div className="chat-message chat-message-bot">
                  A enviar...
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="chat-widget-options">
                <span>O que procura?</span>

                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      handleOption(option)
                    }
                    disabled={sending}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              className="chat-whatsapp-button"
              onClick={handleWhatsApp}
            >
              <span>💚</span>
              Falar pelo WhatsApp
            </button>
          </div>

          <div className="chat-widget-input">
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Escreva a sua mensagem..."
              disabled={sending}
            />

            <button
              type="button"
              onClick={handleSend}
              aria-label="Enviar mensagem"
              disabled={sending}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}