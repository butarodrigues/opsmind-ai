import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "../../../lib/prisma";
import { getAdminSession } from "../../lib/admin-session";
import AdminHeader from "../components/AdminHeader";

const areas: Record<string, string> = {
  ia: "Inteligência Artificial",
  data: "Data & Analytics",
  ciberseguranca: "Cibersegurança",
  compliance: "Compliance",
};

export default async function AdminCursosPage() {
  /* =========================================================
     VERIFICAR SESSÃO
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
     BUSCAR CURSOS
     ========================================================= */

  const cursos = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  /* =========================================================
     ESTATÍSTICAS
     ========================================================= */

  const totalCursos = cursos.length;

  const cursosAtivos = cursos.filter(
    (curso) =>
      curso.status === "ATIVO"
  ).length;

  const cursosInativos = cursos.filter(
    (curso) =>
      curso.status === "INATIVO"
  ).length;

  return (
    <>
      <AdminHeader />

      <main className="admin-page admin-courses-page">
        <div className="admin-container">

          {/* =================================================
              CABEÇALHO
              ================================================= */}

          <header className="admin-header">

            <div>
              <span className="admin-eyebrow">
                OpsMind Academy
              </span>

              <h1>
                Cursos
              </h1>

              <p>
                Gerir os cursos disponíveis
                na OpsMind Academy.
              </p>
            </div>

            <div className="admin-header-actions">

              <Link
                href="/admin/cursos/novo"
                className="admin-new-course-button"
              >
                Novo curso
                <span>+</span>
              </Link>

            </div>

          </header>

          {/* =================================================
              ESTATÍSTICAS
              ================================================= */}

          <section
            className="admin-course-stats"
            aria-label="Estatísticas dos cursos"
          >

            <div className="admin-course-stat-card">
              <span>
                Total de cursos
              </span>

              <strong>
                {totalCursos}
              </strong>
            </div>

            <div className="admin-course-stat-card">
              <span>
                Cursos ativos
              </span>

              <strong>
                {cursosAtivos}
              </strong>
            </div>

            <div className="admin-course-stat-card">
              <span>
                Cursos inativos
              </span>

              <strong>
                {cursosInativos}
              </strong>
            </div>

          </section>

          {/* =================================================
              LISTA DE CURSOS
              ================================================= */}

          <section className="admin-courses-section">

            <div className="admin-courses-section-header">

              <div>
                <span className="admin-eyebrow">
                  Academia
                </span>

                <h2>
                  Todos os cursos
                </h2>

                <p>
                  Consulte e gira os cursos
                  disponíveis na OpsMind Academy.
                </p>
              </div>

            </div>

            {cursos.length === 0 ? (

              /* =================================================
                 ESTADO VAZIO
                 ================================================= */

              <div className="admin-courses-empty">

                <div className="admin-empty-icon">
                  +
                </div>

                <h2>
                  Ainda não existem cursos
                </h2>

                <p>
                  Comece por criar o primeiro
                  curso da OpsMind Academy.
                </p>

                <Link
                  href="/admin/cursos/novo"
                  className="admin-new-course-button"
                >
                  Criar primeiro curso
                  <span>+</span>
                </Link>

              </div>

            ) : (

              /* =================================================
                 TABELA
                 ================================================= */

              <div className="admin-courses-table-wrapper">

                <table className="admin-courses-table">

                  <thead>
                    <tr>
                      <th>
                        Curso
                      </th>

                      <th>
                        Área
                      </th>

                      <th>
                        Duração
                      </th>

                      <th>
                        Modalidade
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

                    {cursos.map((curso) => (

                      <tr key={curso.id}>

                        {/* =====================================
                            CURSO
                            ===================================== */}

                        <td>

                          <div className="admin-course-name">

                            <strong>
                              {curso.title}
                            </strong>

                            <span>
                              {curso.description}
                            </span>

                          </div>

                        </td>

                        {/* =====================================
                            ÁREA
                            ===================================== */}

                        <td>

                          <span className="admin-course-area">
                            {areas[curso.area] ||
                              curso.area}
                          </span>

                        </td>

                        {/* =====================================
                            DURAÇÃO
                            ===================================== */}

                        <td>

                          <span className="admin-course-meta">
                            {curso.duration || "—"}
                          </span>

                        </td>

                        {/* =====================================
                            MODALIDADE
                            ===================================== */}

                        <td>

                          <span className="admin-course-meta">
                            {curso.modality || "—"}
                          </span>

                        </td>

                        {/* =====================================
                            ESTADO
                            ===================================== */}

                        <td>

                          <span
                            className={`admin-course-status ${
                              curso.status === "INATIVO"
                                ? "inativo"
                                : ""
                            }`}
                          >
                            {curso.status}
                          </span>

                        </td>

                        {/* =====================================
                            AÇÃO
                            ===================================== */}

                        <td>

                          <Link
                            href={`/admin/cursos/${curso.id}`}
                            className="admin-course-action"
                          >
                            Editar
                            <span>→</span>
                          </Link>

                        </td>

                      </tr>

                    ))}

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