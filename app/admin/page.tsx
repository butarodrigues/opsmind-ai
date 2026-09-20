import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "../../lib/prisma";
import { getAdminSession } from "../lib/admin-session";
import AdminHeader from "./components/AdminHeader";

const estados = [
  "NOVA",
  "CONTACTADO",
  "INSCRITO",
  "CONCLUÍDO",
];

function formatarCurso(course: string) {
  return course
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function formatarData(data: Date) {
  return new Date(data).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarEstado(estado: string) {
  return estado;
}

export default async function AdminDashboardPage() {
  /* =========================================================
     VERIFICAR SESSÃO DO ADMINISTRADOR
     ========================================================= */

  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("opsmind_admin")?.value;

  if (!sessionToken) {
    redirect("/admin/login");
  }

  const session =
    await getAdminSession(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  /* =========================================================
     BUSCAR DADOS DO DASHBOARD
     ========================================================= */

  const [
    total,
    novas,
    contactados,
    inscritos,
    concluidos,
    inscricoesRecentes,
    cursos,
  ] = await Promise.all([
    prisma.enrollment.count(),

    prisma.enrollment.count({
      where: {
        status: "NOVA",
      },
    }),

    prisma.enrollment.count({
      where: {
        status: "CONTACTADO",
      },
    }),

    prisma.enrollment.count({
      where: {
        status: "INSCRITO",
      },
    }),

    prisma.enrollment.count({
      where: {
        status: "CONCLUÍDO",
      },
    }),

    prisma.enrollment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),

    prisma.enrollment.groupBy({
      by: ["course"],
      _count: {
        course: true,
      },
      orderBy: {
        _count: {
          course: "desc",
        },
      },
      take: 5,
    }),
  ]);

  /* =========================================================
     INDICADORES
     ========================================================= */

  const indicadores = [
    {
      label: "Total",
      value: total,
      className: "admin-dashboard-stat total",
    },
    {
      label: "Novas",
      value: novas,
      className: "admin-dashboard-stat",
    },
    {
      label: "Contactados",
      value: contactados,
      className: "admin-dashboard-stat",
    },
    {
      label: "Inscritos",
      value: inscritos,
      className: "admin-dashboard-stat",
    },
    {
      label: "Concluídos",
      value: concluidos,
      className: "admin-dashboard-stat",
    },
  ];

  return (
    <>
      {/* =====================================================
          HEADER ADMIN
          ===================================================== */}

      <AdminHeader />

      {/* =====================================================
          DASHBOARD
          ===================================================== */}

      <main className="admin-dashboard-page">
        <div className="admin-dashboard-container">

          {/* =================================================
              CABEÇALHO
              ================================================= */}

          <header className="admin-dashboard-header">
            <div>
              <span className="admin-eyebrow">
                OpsMind Admin
              </span>

              <h1>
                Dashboard
              </h1>

              <p>
                Visão geral da atividade da Academia OpsMind.
              </p>
            </div>

            <div className="admin-dashboard-actions">
              <Link
                href="/admin/inscricoes"
                className="admin-dashboard-button primary"
              >
                Gerir inscrições
                <span>→</span>
              </Link>

              <Link
                href="/api/admin/logout"
                className="admin-dashboard-button secondary"
              >
                Terminar sessão
              </Link>
            </div>
          </header>

          {/* =================================================
              INDICADORES
              ================================================= */}

          <section className="admin-dashboard-stats">
            {indicadores.map((indicador) => (
              <div
                key={indicador.label}
                className={indicador.className}
              >
                <span>
                  {indicador.label}
                </span>

                <strong>
                  {indicador.value}
                </strong>
              </div>
            ))}
          </section>

          {/* =================================================
              CONTEÚDO PRINCIPAL
              ================================================= */}

          <section className="admin-dashboard-grid">

            {/* =================================================
                INSCRIÇÕES RECENTES
                ================================================= */}

            <div className="admin-dashboard-card admin-dashboard-recent">

              <div className="admin-dashboard-card-header">
                <div>
                  <span className="admin-eyebrow">
                    Atividade
                  </span>

                  <h2>
                    Inscrições recentes
                  </h2>

                  <p>
                    Últimas inscrições recebidas pela Academia.
                  </p>
                </div>

                <Link
                  href="/admin/inscricoes"
                  className="admin-dashboard-link"
                >
                  Ver todas
                  <span>→</span>
                </Link>
              </div>

              <div className="admin-dashboard-list">

                {inscricoesRecentes.length === 0 ? (
                  <div className="admin-dashboard-empty">
                    <span>—</span>

                    <div>
                      <strong>
                        Ainda não existem inscrições.
                      </strong>

                      <p>
                        As novas inscrições aparecerão aqui.
                      </p>
                    </div>
                  </div>
                ) : (
                  inscricoesRecentes.map((inscricao) => (
                    <Link
                      key={inscricao.id}
                      href={`/admin/inscricoes/${inscricao.id}`}
                      className="admin-dashboard-recent-item"
                    >
                      <div className="admin-dashboard-recent-main">

                        <strong>
                          {inscricao.name}
                        </strong>

                        <span>
                          {formatarCurso(inscricao.course)}
                        </span>

                      </div>

                      <div className="admin-dashboard-recent-meta">

                        <span
                          className={`admin-status-badge ${inscricao.status
                            .toLowerCase()
                            .replace("í", "i")}`}
                        >
                          {formatarEstado(inscricao.status)}
                        </span>

                        <small>
                          {formatarData(
                            inscricao.createdAt
                          )}
                        </small>

                      </div>
                    </Link>
                  ))
                )}

              </div>
            </div>

            {/* =================================================
                CURSOS
                ================================================= */}

            <div className="admin-dashboard-card">

              <div className="admin-dashboard-card-header">
                <div>
                  <span className="admin-eyebrow">
                    Formação
                  </span>

                  <h2>
                    Cursos
                  </h2>

                  <p>
                    Cursos com maior número de inscrições.
                  </p>
                </div>
              </div>

              <div className="admin-dashboard-courses">

                {cursos.length === 0 ? (
                  <div className="admin-dashboard-empty">
                    <span>—</span>

                    <div>
                      <strong>
                        Sem dados disponíveis.
                      </strong>

                      <p>
                        Os cursos aparecerão quando existirem
                        inscrições.
                      </p>
                    </div>
                  </div>
                ) : (
                  cursos.map((curso, index) => (
                    <div
                      key={curso.course}
                      className="admin-dashboard-course"
                    >
                      <div className="admin-dashboard-course-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="admin-dashboard-course-info">
                        <strong>
                          {formatarCurso(curso.course)}
                        </strong>

                        <span>
                          {curso._count.course}{" "}
                          {curso._count.course === 1
                            ? "inscrição"
                            : "inscrições"}
                        </span>
                      </div>
                    </div>
                  ))
                )}

              </div>

            </div>

          </section>

          {/* =================================================
              ESTADOS
              ================================================= */}

          <section className="admin-dashboard-card admin-dashboard-status">

            <div className="admin-dashboard-card-header">
              <div>
                <span className="admin-eyebrow">
                  Acompanhamento
                </span>

                <h2>
                  Estado das inscrições
                </h2>

                <p>
                  Distribuição atual das inscrições por estado.
                </p>
              </div>

              <Link
                href="/admin/inscricoes"
                className="admin-dashboard-link"
              >
                Gerir inscrições
                <span>→</span>
              </Link>
            </div>

            <div className="admin-dashboard-status-grid">

              {estados.map((estado) => {

                const quantidade =
                  estado === "NOVA"
                    ? novas
                    : estado === "CONTACTADO"
                      ? contactados
                      : estado === "INSCRITO"
                        ? inscritos
                        : concluidos;

                const percentagem =
                  total > 0
                    ? Math.round(
                        (quantidade / total) * 100
                      )
                    : 0;

                return (
                  <div
                    key={estado}
                    className="admin-dashboard-status-item"
                  >

                    <div className="admin-dashboard-status-top">

                      <span>
                        {estado}
                      </span>

                      <strong>
                        {quantidade}
                      </strong>

                    </div>

                    <div className="admin-dashboard-progress">
                      <div
                        style={{
                          width: `${percentagem}%`,
                        }}
                      />
                    </div>

                    <small>
                      {percentagem}% das inscrições
                    </small>

                  </div>
                );
              })}

            </div>

          </section>

          {/* =================================================
              ATALHOS
              ================================================= */}

          <section className="admin-dashboard-shortcuts">

            <Link
              href="/admin/inscricoes"
              className="admin-dashboard-shortcut"
            >
              <div>
                <span className="admin-eyebrow">
                  Gestão
                </span>

                <h3>
                  Todas as inscrições
                </h3>

                <p>
                  Pesquisar, filtrar e acompanhar participantes.
                </p>
              </div>

              <span className="admin-dashboard-shortcut-arrow">
                →
              </span>
            </Link>

            <Link
              href="/academy"
              className="admin-dashboard-shortcut"
            >
              <div>
                <span className="admin-eyebrow">
                  Academia
                </span>

                <h3>
                  Ver a Academy
                </h3>

                <p>
                  Consultar as áreas e formações disponíveis.
                </p>
              </div>

              <span className="admin-dashboard-shortcut-arrow">
                →
              </span>
            </Link>

          </section>

        </div>
      </main>
    </>
  );
}