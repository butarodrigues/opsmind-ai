import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";

const estados = [
  "NOVA",
  "CONTACTADO",
  "INSCRITO",
  "CONCLUÍDO",
];

const nomesCursos: Record<string, string> = {
  "fundamentos-inteligencia-artificial":
    "Fundamentos de Inteligência Artificial",

  "machine-learning":
    "Machine Learning",

  "ia-generativa":
    "IA Generativa",

  "ia-aplicada-organizacoes":
    "IA Aplicada às Organizações",

  "fundamentos-analise-dados":
    "Fundamentos de Análise de Dados",

  "power-bi-business-intelligence":
    "Power BI & Business Intelligence",

  "data-analytics":
    "Data Analytics",

  "fundamentos-ciberseguranca":
    "Fundamentos de Cibersegurança",

  "seguranca-redes":
    "Segurança de Redes",

  "gestao-risco-ciberseguranca":
    "Gestão de Risco em Cibersegurança",

  "fundamentos-compliance":
    "Fundamentos de Compliance",

  "gestao-risco-controlos-internos":
    "Gestão de Risco e Controlos Internos",

  "compliance-governacao":
    "Compliance e Governação",
};

export default async function InscricaoDetalhesPage({
  params,
}: {
  params: Promise<{
    id: string;
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
   * OBTER ID DA INSCRIÇÃO
   * =========================================
   */

  const { id } = await params;

  const inscricaoId = Number(id);

  if (Number.isNaN(inscricaoId)) {
    notFound();
  }

  /*
   * =========================================
   * BUSCAR INSCRIÇÃO
   * =========================================
   */

  const inscricao =
    await prisma.enrollment.findUnique({
      where: {
        id: inscricaoId,
      },
      include: {
        history: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!inscricao) {
    notFound();
  }

  /*
   * Depois do notFound(), o TypeScript já sabe
   * que a inscrição existe.
   *
   * Criamos esta referência para que as Server
   * Actions possam trabalhar com um valor
   * garantidamente existente.
   */

  const inscricaoAtual = inscricao;

  const nomeCurso =
    nomesCursos[inscricaoAtual.course] ||
    inscricaoAtual.course;

  /*
   * =========================================
   * ATUALIZAR ESTADO
   * =========================================
   */

  async function atualizarEstado(
    formData: FormData
  ) {
    "use server";

    const novoEstado =
      formData.get("status");

    if (
      typeof novoEstado !== "string" ||
      !estados.includes(novoEstado)
    ) {
      return;
    }

    if (
      novoEstado ===
      inscricaoAtual.status
    ) {
      return;
    }

    await prisma.enrollment.update({
      where: {
        id: inscricaoId,
      },
      data: {
        status: novoEstado,
      },
    });

    await prisma.enrollmentHistory.create({
      data: {
        enrollmentId: inscricaoId,
        oldStatus:
          inscricaoAtual.status,
        newStatus: novoEstado,
      },
    });

    revalidatePath(
      "/admin/inscricoes"
    );

    revalidatePath(
      `/admin/inscricoes/${inscricaoId}`
    );

    redirect(
      `/admin/inscricoes/${inscricaoId}`
    );
  }

  /*
   * =========================================
   * ATUALIZAR NOTAS
   * =========================================
   */

  async function atualizarNotas(
    formData: FormData
  ) {
    "use server";

    const notas =
      formData.get("notes");

    if (typeof notas !== "string") {
      return;
    }

    await prisma.enrollment.update({
      where: {
        id: inscricaoId,
      },
      data: {
        notes:
          notas.trim() || null,
      },
    });

    revalidatePath(
      `/admin/inscricoes/${inscricaoId}`
    );

    redirect(
      `/admin/inscricoes/${inscricaoId}`
    );
  }

  /*
   * =========================================
   * INTERFACE
   * =========================================
   */

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* VOLTAR */}

        <Link
          href="/admin/inscricoes"
          className="admin-back"
        >
          ← Voltar para inscrições
        </Link>

        {/* CABEÇALHO */}

        <div className="admin-detail-header">

          <div>

            <span className="admin-eyebrow">
              OpsMind Admin
            </span>

            <h1>
              Detalhes da inscrição
            </h1>

            <p>
              Informação completa do participante.
            </p>

          </div>

          <span className="admin-detail-id">
            ID #{inscricaoAtual.id}
          </span>

        </div>

        {/* =====================================
            INFORMAÇÕES PRINCIPAIS
        ===================================== */}

        <section className="admin-detail-card">

          <div className="admin-detail-grid">

            {/* NOME */}

            <div className="admin-detail-item">

              <span>
                Nome completo
              </span>

              <strong>
                {inscricaoAtual.name}
              </strong>

            </div>

            {/* EMAIL */}

            <div className="admin-detail-item">

              <span>
                Email
              </span>

              <strong>
                {inscricaoAtual.email}
              </strong>

            </div>

            {/* TELEFONE */}

            <div className="admin-detail-item">

              <span>
                Telefone
              </span>

              <strong>
                {inscricaoAtual.phone}
              </strong>

            </div>

            {/* PROFISSÃO */}

            <div className="admin-detail-item">

              <span>
                Profissão
              </span>

              <strong>
                {inscricaoAtual.profession || "—"}
              </strong>

            </div>

            {/* EMPRESA */}

            <div className="admin-detail-item">

              <span>
                Empresa / Organização
              </span>

              <strong>
                {inscricaoAtual.company || "—"}
              </strong>

            </div>

            {/* ÁREA */}

            <div className="admin-detail-item">

              <span>
                Área
              </span>

              <strong className="admin-detail-badge">
                {inscricaoAtual.area.toUpperCase()}
              </strong>

            </div>

            {/* CURSO */}

            <div className="admin-detail-item full">

              <span>
                Curso
              </span>

              <strong>
                {nomeCurso}
              </strong>

            </div>

            {/* INFORMAÇÃO ADICIONAL */}

            <div className="admin-detail-item full">

              <span>
                Informação adicional
              </span>

              <div className="admin-message">
                {inscricaoAtual.message ||
                  "Nenhuma informação adicional."}
              </div>

            </div>

            {/* DATA */}

            <div className="admin-detail-item">

              <span>
                Data da inscrição
              </span>

              <strong>
                {new Date(
                  inscricaoAtual.createdAt
                ).toLocaleString("pt-PT")}
              </strong>

            </div>

            {/* ESTADO */}

            <div className="admin-detail-item">

              <span>
                Estado da inscrição
              </span>

              <form
                action={atualizarEstado}
              >

                <div className="admin-status-control">

                  <select
                    name="status"
                    defaultValue={
                      inscricaoAtual.status
                    }
                  >

                    {estados.map(
                      (estado) => (
                        <option
                          key={estado}
                          value={estado}
                        >
                          {estado}
                        </option>
                      )
                    )}

                  </select>

                  <button
                    type="submit"
                    className="admin-status-save"
                  >
                    Guardar
                  </button>

                </div>

              </form>

            </div>

          </div>

        </section>

        {/* =====================================
            NOTAS INTERNAS
        ===================================== */}

        <section className="admin-notes-card">

          <div className="admin-notes-header">

            <div>

              <span className="admin-eyebrow">
                Gestão interna
              </span>

              <h2>
                Notas internas
              </h2>

              <p>
                Registe informações internas sobre o
                acompanhamento desta inscrição.
              </p>

            </div>

          </div>

          <form
            action={atualizarNotas}
            className="admin-notes-form"
          >

            <textarea
              name="notes"
              defaultValue={
                inscricaoAtual.notes || ""
              }
              placeholder="Escreva aqui uma nota interna..."
              rows={7}
            />

            <div className="admin-notes-footer">

              <span>
                Estas notas são visíveis apenas na área
                administrativa.
              </span>

              <button
                type="submit"
                className="admin-notes-save"
              >
                Guardar nota
                <span>→</span>
              </button>

            </div>

          </form>

        </section>

        {/* =====================================
            HISTÓRICO
        ===================================== */}

        <section className="admin-history-card">

          <div className="admin-history-header">

            <div>

              <span className="admin-eyebrow">
                Histórico
              </span>

              <h2>
                Histórico da inscrição
              </h2>

              <p>
                Consulte todas as alterações de estado
                desta inscrição.
              </p>

            </div>

          </div>

          {inscricaoAtual.history.length === 0 ? (

            <div className="admin-history-empty">

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Sem alterações registadas.
                </strong>

                <p>
                  O estado desta inscrição ainda não
                  foi alterado.
                </p>

              </div>

            </div>

          ) : (

            <div className="admin-history-list">

              {inscricaoAtual.history.map(
                (item) => (

                  <div
                    key={item.id}
                    className="admin-history-item"
                  >

                    <div className="admin-history-icon">
                      ↗
                    </div>

                    <div className="admin-history-content">

                      <div className="admin-history-status">

                        <span className="admin-history-old">
                          {item.oldStatus || "—"}
                        </span>

                        <span className="admin-history-arrow">
                          →
                        </span>

                        <span className="admin-history-new">
                          {item.newStatus}
                        </span>

                      </div>

                      <span className="admin-history-date">
                        {new Date(
                          item.createdAt
                        ).toLocaleString("pt-PT")}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}