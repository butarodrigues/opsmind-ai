import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "../../../lib/prisma";
import { getAdminSession } from "../../lib/admin-session";

export default async function AtendimentoPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("opsmind_admin")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const session = await getAdminSession(token);

  if (!session) {
    redirect("/admin/login");
  }

  const conversations = await prisma.chatConversation.findMany({
    orderBy: {
      updatedAt: "desc",
    },

    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },

      _count: {
        select: {
          messages: {
            where: {
              senderType: "VISITOR",
              readByAdmin: false,
            },
          },
        },
      },

      admin: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalConversas = conversations.length;

  const novas = conversations.filter(
    (conversation) => conversation.status === "NOVA"
  ).length;

  const emAtendimento = conversations.filter(
    (conversation) => conversation.status === "EM_ATENDIMENTO"
  ).length;

  const concluidas = conversations.filter(
    (conversation) => conversation.status === "CONCLUIDA"
  ).length;

  return (
    <main className="admin-page">
      <div className="admin-container">

        <div className="admin-page-header">
          <div>
            <span className="admin-eyebrow">
              OPSMIND ADMIN
            </span>

            <h1>Atendimento</h1>

            <p>
              Gerencie as conversas recebidas através do chat da
              OpsMind AI.
            </p>
          </div>

          <Link
            href="/admin"
            className="admin-secondary-button"
          >
            ← Dashboard
          </Link>
        </div>

        <section className="admin-atendimento-stats">

          <div className="admin-atendimento-stat">
            <span>Total de conversas</span>
            <strong>{totalConversas}</strong>
          </div>

          <div className="admin-atendimento-stat">
            <span>Novas</span>
            <strong>{novas}</strong>
          </div>

          <div className="admin-atendimento-stat">
            <span>Em atendimento</span>
            <strong>{emAtendimento}</strong>
          </div>

          <div className="admin-atendimento-stat">
            <span>Concluídas</span>
            <strong>{concluidas}</strong>
          </div>

        </section>

        <section className="admin-atendimento-card">

          <div className="admin-atendimento-card-header">
            <div>
              <span className="admin-section-label">
                CONVERSAS
              </span>

              <h2>Conversas recentes</h2>
            </div>
          </div>

          {conversations.length === 0 ? (

            <div className="admin-atendimento-empty">
              <strong>
                Ainda não existem conversas.
              </strong>

              <p>
                Quando um visitante utilizar o chat do site,
                a conversa aparecerá aqui.
              </p>
            </div>

          ) : (

            <div className="admin-atendimento-list">

              {conversations.map((conversation) => {

                const lastMessage =
                  conversation.messages[0];

                return (
                  <Link
                    key={conversation.id}
                    href={`/admin/atendimento/${conversation.id}`}
                    className="admin-atendimento-item"
                  >

                    <div className="admin-atendimento-item-main">

                      <div className="admin-atendimento-item-top">

                        <strong>
                          {conversation.name || "Visitante"}
                        </strong>

                        <span
                          className={`admin-atendimento-status status-${conversation.status.toLowerCase()}`}
                        >
                          {conversation.status === "NOVA"
                            ? "Nova"
                            : conversation.status === "EM_ATENDIMENTO"
                              ? "Em atendimento"
                              : conversation.status === "CONCLUIDA"
                                ? "Concluída"
                                : conversation.status}
                        </span>

                      </div>

                      <p>
                        {lastMessage?.message ||
                          "Nenhuma mensagem disponível."}
                      </p>

                      <div className="admin-atendimento-item-meta">

                        <span>
                          {conversation.area ||
                            "Área não definida"}
                        </span>

                        <span>
                          {conversation._count.messages}{" "}
                          nova
                          {conversation._count.messages === 1
                            ? ""
                            : "s"}
                        </span>

                      </div>

                    </div>

                    <div className="admin-atendimento-item-arrow">
                      →
                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}