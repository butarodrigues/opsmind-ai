import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getAdminSession } from "../../lib/admin-session";

export default async function AdminUtilizadoresPage() {
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
   * BUSCAR ADMINISTRADORES
   * =========================================
   */

  const administradores =
    await prisma.admin.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* =====================================
            CABEÇALHO
        ===================================== */}

        <div className="admin-detail-header">
          <div>
            <Link
              href="/admin"
              className="admin-back"
            >
              ← Voltar para o Dashboard
            </Link>

            <span className="admin-eyebrow">
              OpsMind Admin
            </span>

            <h1>
              Administradores
            </h1>

            <p>
              Gestão dos utilizadores com acesso
              à área administrativa.
            </p>
          </div>

          <div className="admin-users-header-actions">

            <div className="admin-users-count">
              <span>
                Total
              </span>

              <strong>
                {administradores.length}
              </strong>
            </div>

            <Link
              href="/admin/utilizadores/novo"
              className="admin-new-user-button"
            >
              <span>+</span>
              Novo administrador
            </Link>

          </div>
        </div>

        {/* =====================================
            LISTA DE ADMINISTRADORES
        ===================================== */}

        <section className="admin-table-section">

          <div className="admin-users-header">
            <div>
              <span className="admin-eyebrow">
                Utilizadores
              </span>

              <h2>
                Contas administrativas
              </h2>

              <p>
                Administradores com acesso ao
                painel de gestão da OpsMind.
              </p>
            </div>
          </div>

          {administradores.length === 0 ? (

            <div className="admin-empty">
              <h2>
                Nenhum administrador encontrado.
              </h2>

              <p>
                Não existem contas administrativas
                registadas.
              </p>
            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>
                      Nome
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Função
                    </th>

                    <th>
                      Estado
                    </th>

                    <th>
                      Último acesso
                    </th>

                    <th>
                      Criado em
                    </th>
                    <th>
                        Ações
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {administradores.map(
                    (
                      admin: (typeof administradores)[number]
                    ) => (

                      <tr
                        key={admin.id}
                      >

                        <td>
                          <strong>
                            {admin.name}
                          </strong>
                        </td>

                        <td>
                          {admin.email}
                        </td>

                        <td>
                          <span className="admin-badge">
                            {admin.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`admin-status-badge ${
                              admin.status === "ATIVO"
                                ? "active"
                                : ""
                            }`}
                          >
                            {admin.status}
                          </span>
                        </td>

                        <td>
                          {admin.lastLoginAt
                            ? new Date(
                                admin.lastLoginAt
                              ).toLocaleString(
                                "pt-PT"
                              )
                            : "Nunca"}
                        </td>

                        <td>
                          {new Date(
                            admin.createdAt
                          ).toLocaleDateString(
                            "pt-PT"
                          )}
                        </td>
                        <td>
                        <Link
                          href={`/admin/utilizadores/${admin.id}`}
                          className="admin-table-action"
  >
                         Editar
                            <span>→</span>
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
  );
}