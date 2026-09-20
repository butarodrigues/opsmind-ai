import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/admin-session";

export default async function AdminHeader() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("opsmind_admin")?.value;

  if (!sessionToken) {
    redirect("/admin/login");
  }

  const session = await getAdminSession(sessionToken);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <header className="admin-header">
      <div className="admin-header-container">

        {/* LOGOTIPO / MARCA */}
        <Link
          href="/admin"
          className="admin-header-brand"
        >
          <span className="admin-header-brand-name">
            OPSMIND
          </span>

          <span className="admin-header-brand-label">
            ADMIN
          </span>
        </Link>

        {/* NAVEGAÇÃO */}
        <nav className="admin-header-nav">

          <Link
            href="/admin"
            className="admin-header-link"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/atendimento"
            className="admin-header-link"
          >
            Atendimento
          </Link>

          <Link
            href="/admin/inscricoes"
            className="admin-header-link"
          >
            Inscrições
          </Link>

          <Link
            href="/admin/cursos"
            className="admin-header-link"
          >
            Cursos
          </Link>

          <Link
            href="/admin/utilizadores"
            className="admin-header-link"
          >
            Utilizadores
          </Link>

        </nav>

        {/* ADMINISTRADOR + SAIR */}
        <div className="admin-header-account">

          <div className="admin-header-user">
            <span className="admin-header-user-label">
              Administrador
            </span>

            <strong>
              {session.admin.name}
            </strong>
          </div>

          <Link
            href="/api/admin/logout"
            className="admin-header-logout"
          >
            Sair
            <span>→</span>
          </Link>

        </div>

      </div>
    </header>
  );
}