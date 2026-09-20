import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminHeader from "../components/AdminHeader";
import { prisma } from "../../../lib/prisma";
import { getAdminSession } from "../../lib/admin-session";

export default async function AdminInscricoesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    q?: string;
    area?: string;
    course?: string;
  }>;
}) {
  /*
   * =========================================
   * VERIFICAR SESSÃO DO ADMINISTRADOR
   * =========================================
   */

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

  /*
   * =========================================
   * LER FILTROS DA URL
   * =========================================
   */

  const {
    status,
    q,
    area,
    course,
  } = await searchParams;

  const pesquisa =
    q?.trim().toLowerCase() || "";

  const areaSelecionada =
    area?.trim() || "";

  const cursoSelecionado =
    course?.trim() || "";

  /*
   * =========================================
   * BUSCAR INSCRIÇÕES
   * =========================================
   */

  const inscricoes =
    await prisma.enrollment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  /*
   * =========================================
   * LISTA DE ÁREAS
   * =========================================
   */

  const areas = Array.from(
    new Set(
      inscricoes.map(
        (inscricao) => inscricao.area
      )
    )
  ).sort();

  /*
   * =========================================
   * LISTA DE CURSOS
   * =========================================
   */

  const cursos = Array.from(
    new Set(
      inscricoes.map(
        (inscricao) => inscricao.course
      )
    )
  ).sort();

  /*
   * =========================================
   * ESTATÍSTICAS
   * =========================================
   */

  const total = inscricoes.length;

  const novas = inscricoes.filter(
    (inscricao) =>
      inscricao.status === "NOVA"
  ).length;

  const contactados = inscricoes.filter(
    (inscricao) =>
      inscricao.status === "CONTACTADO"
  ).length;

  const inscritos = inscricoes.filter(
    (inscricao) =>
      inscricao.status === "INSCRITO"
  ).length;

  const concluidos = inscricoes.filter(
    (inscricao) =>
      inscricao.status === "CONCLUÍDO"
  ).length;

  /*
   * =========================================
   * VALIDAR ESTADO
   * =========================================
   */

  const estadosPermitidos = [
    "NOVA",
    "CONTACTADO",
    "INSCRITO",
    "CONCLUÍDO",
  ];

  const statusValido =
    status &&
    estadosPermitidos.includes(status)
      ? status
      : null;

  /*
   * =========================================
   * FILTRAR POR ESTADO
   * =========================================
   */

  const inscricoesFiltradas =
    statusValido
      ? inscricoes.filter(
          (inscricao) =>
            inscricao.status ===
            statusValido
        )
      : inscricoes;

  /*
   * =========================================
   * PESQUISA + ÁREA + CURSO
   * =========================================
   */

  const resultados =
    inscricoesFiltradas.filter(
      (inscricao) => {
        const correspondePesquisa =
          !pesquisa ||
          inscricao.name
            .toLowerCase()
            .includes(pesquisa) ||
          inscricao.email
            .toLowerCase()
            .includes(pesquisa) ||
          inscricao.phone
            .toLowerCase()
            .includes(pesquisa) ||
          (
            inscricao.company || ""
          )
            .toLowerCase()
            .includes(pesquisa);

        const correspondeArea =
          !areaSelecionada ||
          inscricao.area ===
            areaSelecionada;

        const correspondeCurso =
          !cursoSelecionado ||
          inscricao.course ===
            cursoSelecionado;

        return (
          correspondePesquisa &&
          correspondeArea &&
          correspondeCurso
        );
      }
    );

  return (
    <>
      <AdminHeader />

      <main className="admin-page">
        <div className="admin-container">

          {/* =====================================
              CABEÇALHO
          ===================================== */}

          <div className="admin-header">

            <div>

              <span className="admin-eyebrow">
                OpsMind Admin
              </span>

              <h1>
                Inscrições
              </h1>

              <p>
                Gestão das inscrições recebidas
                pela Academia OpsMind.
              </p>

            </div>

            {/* ===================================
                ESTATÍSTICAS
            =================================== */}

            <div className="admin-stats">

              <Link
                href="/admin/inscricoes"
                className={`admin-stat ${
                  !statusValido
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  Total
                </span>

                <strong>
                  {total}
                </strong>
              </Link>

              <Link
                href="/admin/inscricoes?status=NOVA"
                className={`admin-stat ${
                  statusValido ===
                  "NOVA"
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  Novas
                </span>

                <strong>
                  {novas}
                </strong>
              </Link>

              <Link
                href="/admin/inscricoes?status=CONTACTADO"
                className={`admin-stat ${
                  statusValido ===
                  "CONTACTADO"
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  Contactados
                </span>

                <strong>
                  {contactados}
                </strong>
              </Link>

              <Link
                href="/admin/inscricoes?status=INSCRITO"
                className={`admin-stat ${
                  statusValido ===
                  "INSCRITO"
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  Inscritos
                </span>

                <strong>
                  {inscritos}
                </strong>
              </Link>

              <Link
                href="/admin/inscricoes?status=CONCLUÍDO"
                className={`admin-stat ${
                  statusValido ===
                  "CONCLUÍDO"
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  Concluídos
                </span>

                <strong>
                  {concluidos}
                </strong>
              </Link>

            </div>

          </div>

          {/* =====================================
              TABELA + PESQUISA
          ===================================== */}

          <section className="admin-table-section">

            {/* ===================================
                PESQUISA E FILTROS
            =================================== */}

            <form
              className="admin-search"
              method="GET"
            >

              {statusValido && (
                <input
                  type="hidden"
                  name="status"
                  value={statusValido}
                />
              )}

              <input
                type="search"
                name="q"
                defaultValue={q || ""}
                placeholder="Pesquisar por nome, email, telefone ou empresa..."
              />

              <select
                name="area"
                defaultValue={
                  areaSelecionada
                }
              >
                <option value="">
                  Todas as áreas
                </option>

                {areas.map(
                  (area) => (
                    <option
                      key={area}
                      value={area}
                    >
                      {area.toUpperCase()}
                    </option>
                  )
                )}

              </select>

              <select
                name="course"
                defaultValue={
                  cursoSelecionado
                }
              >
                <option value="">
                  Todos os cursos
                </option>

                {cursos.map(
                  (curso) => (
                    <option
                      key={curso}
                      value={curso}
                    >
                      {curso}
                    </option>
                  )
                )}

              </select>

              <button type="submit">
                Pesquisar
              </button>

              {(q ||
                areaSelecionada ||
                cursoSelecionado) && (
                <Link
                  href={
                    statusValido
                      ? `/admin/inscricoes?status=${statusValido}`
                      : "/admin/inscricoes"
                  }
                  className="admin-search-clear"
                >
                  Limpar
                </Link>
              )}

            </form>

            {/* ===================================
                RESULTADOS
            =================================== */}

            {resultados.length === 0 ? (

              <div className="admin-empty">

                <h2>
                  Não existem inscrições
                  neste estado.
                </h2>

                <p>
                  Não foram encontradas
                  inscrições para o filtro
                  selecionado.
                </p>

                <Link
                  href="/admin/inscricoes"
                  className="admin-view-button"
                >
                  Ver todas
                  <span>→</span>
                </Link>

              </div>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-table">

                  <thead>

                    <tr>

                      <th>
                        Data
                      </th>

                      <th>
                        Nome
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Telefone
                      </th>

                      <th>
                        Área
                      </th>

                      <th>
                        Curso
                      </th>

                      <th>
                        Empresa
                      </th>

                      <th>
                        Estado
                      </th>

                      <th>
                        Ação
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {resultados.map(
                      (inscricao) => (

                        <tr
                          key={
                            inscricao.id
                          }
                        >

                          {/* DATA */}

                          <td>
                            {new Date(
                              inscricao.createdAt
                            ).toLocaleDateString(
                              "pt-PT"
                            )}
                          </td>

                          {/* NOME */}

                          <td>
                            <strong>
                              {
                                inscricao.name
                              }
                            </strong>
                          </td>

                          {/* EMAIL */}

                          <td>
                            {
                              inscricao.email
                            }
                          </td>

                          {/* TELEFONE */}

                          <td>
                            {
                              inscricao.phone
                            }
                          </td>

                          {/* ÁREA */}

                          <td>

                            <span className="admin-badge">
                              {
                                inscricao.area.toUpperCase()
                              }
                            </span>

                          </td>

                          {/* CURSO */}

                          <td>
                            {
                              inscricao.course
                            }
                          </td>

                          {/* EMPRESA */}

                          <td>
                            {
                              inscricao.company ||
                              "—"
                            }
                          </td>

                          {/* ESTADO */}

                          <td>

                            <span
                              className={`admin-status-badge ${
                                inscricao.status ===
                                "NOVA"
                                  ? "new"
                                  : inscricao.status ===
                                    "CONTACTADO"
                                  ? "contacted"
                                  : inscricao.status ===
                                    "INSCRITO"
                                  ? "enrolled"
                                  : inscricao.status ===
                                    "CONCLUÍDO"
                                  ? "completed"
                                  : ""
                              }`}
                            >
                              {
                                inscricao.status
                              }
                            </span>

                          </td>

                          {/* =================================
                              ÚNICA AÇÃO
                          ================================= */}

                          <td>

                            <Link
                              href={`/admin/inscricoes/${inscricao.id}`}
                              className="admin-view-button"
                            >
                              Ver
                              <span>
                                →
                              </span>
                            </Link>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

        </div>
      </main>
    </>
  );
}