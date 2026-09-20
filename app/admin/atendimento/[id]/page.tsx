import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";
import ChatReplyForm from "../../components/ChatReplyForm";
import ChatStatusForm from "../../components/ChatStatusForm";

type AtendimentoDetalhePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AtendimentoDetalhePage({
  params,
}: AtendimentoDetalhePageProps) {
  const cookieStore = await cookies();

  const token = cookieStore.get("opsmind_admin")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const session = await getAdminSession(token);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const conversationId = Number(id);

  if (!Number.isInteger(conversationId)) {
    notFound();
  }

  const conversation = await prisma.chatConversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!conversation) {
    notFound();
  }
  await prisma.chatMessage.updateMany({
    where: {
      conversationId: conversation.id,
      senderType: "VISITOR",
      readByAdmin: false,
    },
    data: {
      readByAdmin: true,
    },
  });

  const statusLabel =
    conversation.status === "NOVA"
      ? "Nova"
      : conversation.status === "EM_ATENDIMENTO"
        ? "Em atendimento"
        : conversation.status === "CONCLUIDA"
          ? "Concluída"
          : conversation.status;

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">
              OPSMIND ADMIN
            </span>

            <h1>Conversa</h1>

            <p>
              Histórico e informações do atendimento.
            </p>
          </div>

          <Link
            href="/admin/atendimento"
            className="admin-secondary-button"
          >
            ← Atendimento
          </Link>
        </div>

        <section className="admin-chat-detail">
          <div className="admin-chat-detail-header">
            <div>
              <span className="admin-section-label">
                VISITANTE
              </span>

              <h2>
                {conversation.name || "Visitante"}
              </h2>

              <div className="admin-chat-meta">
                <span>
                  {conversation.email || "Email não informado"}
                </span>

                <span>
                  {conversation.phone || "Telefone não informado"}
                </span>
              </div>
            </div>

            <span
              className={`admin-atendimento-status status-${conversation.status.toLowerCase()}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="admin-chat-information">
            <div>
              <small>Área</small>

              <strong>
                {conversation.area || "Não definida"}
              </strong>
            </div>

            <div>
              <small>Empresa</small>

              <strong>
                {conversation.company || "Não informada"}
              </strong>
            </div>

            <div>
              <small>Assunto</small>

              <strong>
                {conversation.subject || "Não definido"}
              </strong>
            </div>

            <div>
              <small>Administrador</small>

              <strong>
                {conversation.admin?.name || "Não atribuído"}
              </strong>
            </div>
          </div>

          <div className="admin-chat-messages">
            {conversation.messages.map((message) => {
              const isVisitor =
                message.senderType === "VISITOR";

              return (
                <div
                  key={message.id}
                  className={`admin-chat-message ${
                    isVisitor
                      ? "admin-chat-message-visitor"
                      : "admin-chat-message-admin"
                  }`}
                >
                  <div className="admin-chat-message-header">
                    <strong>
                      {isVisitor
                        ? message.senderName || "Visitante"
                        : message.senderName || "OpsMind Admin"}
                    </strong>

                    <span>
                      {new Date(
                        message.createdAt
                      ).toLocaleString("pt-PT")}
                    </span>
                  </div>

                  <div className="admin-chat-message-content">
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="admin-chat-reply">
  <span className="admin-section-label">
    ATENDIMENTO
  </span>

  <h3>Responder ao visitante</h3>

  <ChatReplyForm
    conversationId={conversation.id}
  />
</div>

<ChatStatusForm
  conversationId={conversation.id}
  currentStatus={conversation.status}
/>
        </section>
      </div>
    </main>
  );
}