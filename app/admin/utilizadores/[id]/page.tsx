import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";

const rolesPermitidas = ["ADMIN", "GESTOR"];
const estadosPermitidos = ["ATIVO", "INATIVO"];

export default async function AdminUtilizadorDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // =====================================
  // VERIFICAR SESSÃO
  // =====================================

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

  // Guardamos o ID do administrador autenticado
  // para poder utilizá-lo nas Server Actions.
  const administradorAtualId = session.admin.id;

  // =====================================
  // OBTER ID
  // =====================================

  const { id } = await params;

  const administradorId = Number(id);

  if (Number.isNaN(administradorId)) {
    notFound();
  }

  // =====================================
  // BUSCAR ADMINISTRADOR
  // =====================================

  const administrador =
    await prisma.admin.findUnique({
      where: {
        id: administradorId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

  if (!administrador) {
    notFound();
  }

  // =====================================
  // ALTERAR PALAVRA-PASSE
  // =====================================

  async function atualizarPalavraPasse(
    formData: FormData
  ) {
    "use server";

    const novaPalavraPasse =
      formData.get("password");

    const confirmarPalavraPasse =
      formData.get("confirmPassword");

    if (
      typeof novaPalavraPasse !== "string" ||
      typeof confirmarPalavraPasse !== "string"
    ) {
      return;
    }

    if (novaPalavraPasse.length < 8) {
      return;
    }

    if (
      novaPalavraPasse !== confirmarPalavraPasse
    ) {
      return;
    }

    const passwordHash =
      await bcrypt.hash(
        novaPalavraPasse,
        12
      );

    await prisma.admin.update({
      where: {
        id: administradorId,
      },
      data: {
        passwordHash,
      },
    });

    revalidatePath(
      `/admin/utilizadores/${administradorId}`
    );

    redirect(
      `/admin/utilizadores/${administradorId}`
    );
  }

  // =====================================
  // ATIVAR / INATIVAR ADMINISTRADOR
  // =====================================

  async function alterarEstadoAdministrador(
    formData: FormData
  ) {
    "use server";

    const novoEstado =
      formData.get("status");

    if (
      typeof novoEstado !== "string" ||
      !estadosPermitidos.includes(novoEstado)
    ) {
      return;
    }

    // Não permitir que o administrador
    // desative a própria conta.
    if (
      administradorId === administradorAtualId &&
      novoEstado === "INATIVO"
    ) {
      return;
    }

    await prisma.admin.update({
      where: {
        id: administradorId,
      },
      data: {
        status: novoEstado,
      },
    });

    // Se a conta for inativada,
    // terminar todas as sessões existentes.
    if (novoEstado === "INATIVO") {
      await prisma.adminSession.deleteMany({
        where: {
          adminId: administradorId,
        },
      });
    }

    revalidatePath(
      "/admin/utilizadores"
    );

    revalidatePath(
      `/admin/utilizadores/${administradorId}`
    );

    redirect(
      `/admin/utilizadores/${administradorId}`
    );
  }

  // =====================================
  // ATUALIZAR ADMINISTRADOR
  // =====================================

  async function atualizarAdministrador(
    formData: FormData
  ) {
    "use server";

    const nome =
      formData.get("name");

    const email =
      formData.get("email");

    const role =
      formData.get("role");

    const status =
      formData.get("status");

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string" ||
      typeof status !== "string"
    ) {
      return;
    }

    const name = nome.trim();

    const emailNormalizado =
      email.trim().toLowerCase();

    if (
      !name ||
      !emailNormalizado
    ) {
      return;
    }

    if (
      !rolesPermitidas.includes(role)
    ) {
      return;
    }

    if (
      !estadosPermitidos.includes(status)
    ) {
      return;
    }

    // =====================================
    // NÃO PERMITIR INATIVAR A PRÓPRIA CONTA
    // =====================================

    if (
      administradorId === administradorAtualId &&
      status === "INATIVO"
    ) {
      return;
    }

    // =====================================
    // VERIFICAR EMAIL DUPLICADO
    // =====================================

    const emailExistente =
      await prisma.admin.findFirst({
        where: {
          email: emailNormalizado,
          NOT: {
            id: administradorId,
          },
        },
      });

    if (emailExistente) {
      return;
    }

    // =====================================
    // ATUALIZAR DADOS
    // =====================================

    await prisma.admin.update({
      where: {
        id: administradorId,
      },
      data: {
        name,
        email: emailNormalizado,
        role,
        status,
      },
    });

    // =====================================
    // TERMINAR SESSÕES SE FICAR INATIVO
    // =====================================

    if (status === "INATIVO") {
      await prisma.adminSession.deleteMany({
        where: {
          adminId: administradorId,
        },
      });
    }

    revalidatePath(
      "/admin/utilizadores"
    );

    revalidatePath(
      `/admin/utilizadores/${administradorId}`
    );

    redirect(
      `/admin/utilizadores/${administradorId}`
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* =====================================
            VOLTAR
        ===================================== */}

        <Link
          href="/admin/utilizadores"
          className="admin-back"
        >
          ← Voltar para administradores
        </Link>

        {/* =====================================
            CABEÇALHO
        ===================================== */}

        <div className="admin-detail-header">
          <div>
            <span className="admin-eyebrow">
              OpsMind Admin
            </span>

            <h1>
              Editar administrador
            </h1>

            <p>
              Gerir os dados e o acesso deste
              utilizador administrativo.
            </p>
          </div>

          <span className="admin-detail-id">
            ID #{administrador.id}
          </span>
        </div>

        {/* =====================================
            DADOS DA CONTA
        ===================================== */}

        <section className="admin-form-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Dados da conta
            </span>

            <h2>
              Informações do administrador
            </h2>

            <p>
              Atualize os dados principais desta
              conta administrativa.
            </p>
          </div>

          <form
            action={atualizarAdministrador}
            className="admin-form"
          >

            {/* NOME */}

            <div className="admin-form-group">
              <label htmlFor="name">
                Nome completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={
                  administrador.name
                }
                required
              />
            </div>

            {/* EMAIL */}

            <div className="admin-form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                defaultValue={
                  administrador.email
                }
                required
              />
            </div>

            {/* FUNÇÃO */}

            <div className="admin-form-group">
              <label htmlFor="role">
                Função
              </label>

              <select
                id="role"
                name="role"
                defaultValue={
                  administrador.role
                }
              >
                <option value="ADMIN">
                  Administrador
                </option>

                <option value="GESTOR">
                  Gestor
                </option>
              </select>
            </div>

            {/* ESTADO */}

            <div className="admin-form-group">
              <label htmlFor="status">
                Estado
              </label>

              <select
                id="status"
                name="status"
                defaultValue={
                  administrador.status
                }
                disabled={
                  administradorId ===
                  administradorAtualId
                }
              >
                <option value="ATIVO">
                  Ativo
                </option>

                <option value="INATIVO">
                  Inativo
                </option>
              </select>

              {administradorId ===
                administradorAtualId && (
                <span className="admin-form-help">
                  A sua própria conta não pode ser
                  inativada.
                </span>
              )}
            </div>

            {/* AÇÕES */}

            <div className="admin-form-actions">

              <Link
                href="/admin/utilizadores"
                className="admin-form-cancel"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="admin-form-submit"
              >
                Guardar alterações
                <span>→</span>
              </button>

            </div>

          </form>
        </section>

        {/* =====================================
            ESTADO DA CONTA
        ===================================== */}

        <section className="admin-detail-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Acesso
            </span>

            <h2>
              Estado da conta
            </h2>

            <p>
              Controle se este administrador pode
              aceder à área administrativa.
            </p>
          </div>

          <div className="admin-account-status">

            <div>
              <span className="admin-detail-label">
                Estado atual
              </span>

              <span
                className={`admin-status-badge ${
                  administrador.status ===
                  "ATIVO"
                    ? "active"
                    : ""
                }`}
              >
                {administrador.status}
              </span>
            </div>

            <form
              action={
                alterarEstadoAdministrador
              }
            >

              <input
                type="hidden"
                name="status"
                value={
                  administrador.status ===
                  "ATIVO"
                    ? "INATIVO"
                    : "ATIVO"
                }
              />

              <button
                type="submit"
                className={
                  administrador.status ===
                  "ATIVO"
                    ? "admin-danger-button"
                    : "admin-activate-button"
                }
                disabled={
                  administradorId ===
                    administradorAtualId &&
                  administrador.status ===
                    "ATIVO"
                }
              >
                {administrador.status ===
                "ATIVO"
                  ? "Inativar administrador"
                  : "Ativar administrador"}
              </button>

            </form>

          </div>
        </section>

        {/* =====================================
            SEGURANÇA DA CONTA
        ===================================== */}

        <section className="admin-form-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Segurança
            </span>

            <h2>
              Alterar palavra-passe
            </h2>

            <p>
              Defina uma nova palavra-passe
              para esta conta administrativa.
            </p>
          </div>

          <form
            action={atualizarPalavraPasse}
            className="admin-form"
          >

            {/* NOVA PALAVRA-PASSE */}

            <div className="admin-form-group">
              <label htmlFor="password">
                Nova palavra-passe
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Introduza uma nova palavra-passe"
                minLength={8}
                required
              />

              <span className="admin-form-help">
                Utilize uma palavra-passe forte,
                com pelo menos 8 caracteres.
              </span>
            </div>

            {/* CONFIRMAR */}

            <div className="admin-form-group">
              <label htmlFor="confirmPassword">
                Confirmar palavra-passe
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repita a nova palavra-passe"
                minLength={8}
                required
              />
            </div>

            {/* AÇÃO */}

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-form-submit"
              >
                Alterar palavra-passe
                <span>→</span>
              </button>

            </div>

          </form>
        </section>

        {/* =====================================
            INFORMAÇÕES DO SISTEMA
        ===================================== */}

        <section className="admin-detail-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Informações
            </span>

            <h2>
              Atividade da conta
            </h2>

            <p>
              Informações de utilização desta
              conta administrativa.
            </p>
          </div>

          <div className="admin-detail-grid">

            {/* ID */}

            <div>
              <span className="admin-detail-label">
                ID
              </span>

              <strong>
                #{administrador.id}
              </strong>
            </div>

            {/* ESTADO */}

            <div>
              <span className="admin-detail-label">
                Estado atual
              </span>

              <span
                className={`admin-status-badge ${
                  administrador.status ===
                  "ATIVO"
                    ? "active"
                    : ""
                }`}
              >
                {administrador.status}
              </span>
            </div>

            {/* ÚLTIMO ACESSO */}

            <div>
              <span className="admin-detail-label">
                Último acesso
              </span>

              <strong>
                {administrador.lastLoginAt
                  ? new Date(
                      administrador.lastLoginAt
                    ).toLocaleString(
                      "pt-PT"
                    )
                  : "Nunca"}
              </strong>
            </div>

            {/* CRIADO EM */}

            <div>
              <span className="admin-detail-label">
                Criado em
              </span>

              <strong>
                {new Date(
                  administrador.createdAt
                ).toLocaleString(
                  "pt-PT"
                )}
              </strong>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}