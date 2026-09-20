import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";

const areasPermitidas = [
  "ia",
  "data",
  "ciberseguranca",
  "compliance",
];

const estadosPermitidos = [
  "ATIVO",
  "INATIVO",
];

const modalidadesPermitidas = [
  "Online",
  "Presencial",
  "Online | Presencial",
  "Híbrido",
];

const niveisPermitidos = [
  "Iniciante",
  "Intermédio",
  "Avançado",
];

const nomesAreas: Record<string, string> = {
  ia: "Inteligência Artificial",
  data: "Data & Analytics",
  ciberseguranca: "Cibersegurança",
  compliance: "Compliance",
};

function gerarSlug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function AdminCursoDetalhesPage({
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

  // =====================================
  // OBTER ID
  // =====================================

  const { id } = await params;

  const cursoId = Number(id);

  if (Number.isNaN(cursoId)) {
    notFound();
  }

  // =====================================
  // BUSCAR CURSO
  // =====================================

  const curso =
    await prisma.course.findUnique({
      where: {
        id: cursoId,
      },
    });

  if (!curso) {
    notFound();
  }

  // =====================================
  // ATUALIZAR CURSO
  // =====================================

  async function atualizarCurso(
    formData: FormData
  ) {
    "use server";

    const titulo =
      formData.get("title");

    const descricao =
      formData.get("description");

    const area =
      formData.get("area");

    const level =
      formData.get("level");

    const duration =
      formData.get("duration");

    const modality =
      formData.get("modality");

    const price =
      formData.get("price");

    const vacancies =
      formData.get("vacancies");

    const status =
      formData.get("status");

    const image =
      formData.get("image");

    const content =
      formData.get("content");

    // =====================================
    // VALIDAR CAMPOS PRINCIPAIS
    // =====================================

    if (
      typeof titulo !== "string" ||
      typeof descricao !== "string" ||
      typeof area !== "string" ||
      typeof status !== "string"
    ) {
      return;
    }

    const title =
      titulo.trim();

    const description =
      descricao.trim();

    if (
      !title ||
      !description
    ) {
      return;
    }

    // =====================================
    // VALIDAR ÁREA
    // =====================================

    if (
      !areasPermitidas.includes(area)
    ) {
      return;
    }

    // =====================================
    // VALIDAR NÍVEL
    // =====================================

    let nivelNormalizado:
      string | null = null;

    if (
      typeof level === "string" &&
      level.trim()
    ) {
      const nivel =
        level.trim();

      if (
        !niveisPermitidos.includes(
          nivel
        )
      ) {
        return;
      }

      nivelNormalizado =
        nivel;
    }

    // =====================================
    // VALIDAR ESTADO
    // =====================================

    if (
      !estadosPermitidos.includes(status)
    ) {
      return;
    }

    // =====================================
    // VALIDAR MODALIDADE
    // =====================================

    let modalidadeNormalizada:
      string | null = null;

    if (
      typeof modality === "string" &&
      modality.trim()
    ) {
      const modalidade =
        modality.trim();

      if (
        !modalidadesPermitidas.includes(
          modalidade
        )
      ) {
        return;
      }

      modalidadeNormalizada =
        modalidade;
    }

    // =====================================
    // NORMALIZAR DURAÇÃO
    // =====================================

    let duracaoNormalizada:
      string | null = null;

    if (
      typeof duration === "string" &&
      duration.trim()
    ) {
      duracaoNormalizada =
        duration.trim();
    }

    // =====================================
    // NORMALIZAR PREÇO
    // =====================================

    let precoNormalizado:
      number | null = null;

    if (
      typeof price === "string" &&
      price.trim()
    ) {
      const preco =
        Number(
          price.replace(",", ".")
        );

      if (
        !Number.isFinite(preco) ||
        preco < 0
      ) {
        return;
      }

      precoNormalizado =
        preco;
    }

    // =====================================
    // NORMALIZAR VAGAS
    // =====================================

    let vagasNormalizadas:
      number | null = null;

    if (
      typeof vacancies === "string" &&
      vacancies.trim()
    ) {
      const vagas =
        Number(vacancies);

      if (
        !Number.isInteger(vagas) ||
        vagas < 0
      ) {
        return;
      }

      vagasNormalizadas =
        vagas;
    }

    // =====================================
    // NORMALIZAR IMAGEM
    // =====================================

    let imagemNormalizada:
      string | null = null;

    if (
      typeof image === "string" &&
      image.trim()
    ) {
      imagemNormalizada =
        image.trim();
    }

    // =====================================
    // NORMALIZAR CONTEÚDO
    // =====================================

    let conteudoNormalizado:
      string | null = null;

    if (
      typeof content === "string" &&
      content.trim()
    ) {
      conteudoNormalizado =
        content.trim();
    }

    // =====================================
    // GERAR SLUG
    // =====================================

    const slugBase =
      gerarSlug(title);

    if (!slugBase) {
      return;
    }

    let slug =
      slugBase;

    let contador = 2;

    while (true) {
      const slugExistente =
        await prisma.course.findFirst({
          where: {
            slug,
            NOT: {
              id: cursoId,
            },
          },
          select: {
            id: true,
          },
        });

      if (!slugExistente) {
        break;
      }

      slug =
        `${slugBase}-${contador}`;

      contador++;
    }

    // =====================================
    // ATUALIZAR CURSO
    // =====================================

    await prisma.course.update({
      where: {
        id: cursoId,
      },
      data: {
        title,
        slug,
        description,
        area,
        level:
          nivelNormalizado,
        duration:
          duracaoNormalizada,
        modality:
          modalidadeNormalizada,
        price:
          precoNormalizado,
        vacancies:
          vagasNormalizadas,
        status,
        image:
          imagemNormalizada,
        content:
          conteudoNormalizado,
      },
    });

    // =====================================
    // ATUALIZAR CACHE
    // =====================================

    revalidatePath(
      "/admin/cursos"
    );

    revalidatePath(
      `/admin/cursos/${cursoId}`
    );

    // =====================================
    // VOLTAR PARA A LISTA
    // =====================================

    redirect("/admin/cursos");
  }

  // =====================================
  // ALTERAR ESTADO DO CURSO
  // =====================================

  async function alterarEstadoCurso(
    formData: FormData
  ) {
    "use server";

    const novoEstado =
      formData.get("status");

    if (
      typeof novoEstado !== "string" ||
      !estadosPermitidos.includes(
        novoEstado
      )
    ) {
      return;
    }

    await prisma.course.update({
      where: {
        id: cursoId,
      },
      data: {
        status: novoEstado,
      },
    });

    revalidatePath(
      "/admin/cursos"
    );

    revalidatePath(
      `/admin/cursos/${cursoId}`
    );

    redirect(
      `/admin/cursos/${cursoId}`
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* =====================================
            VOLTAR
        ===================================== */}

        <Link
          href="/admin/cursos"
          className="admin-back"
        >
          ← Voltar para cursos
        </Link>

        {/* =====================================
            CABEÇALHO
        ===================================== */}

        <div className="admin-detail-header">

          <div>
            <span className="admin-eyebrow">
              OpsMind Academy
            </span>

            <h1>
              Editar curso
            </h1>

            <p>
              Gerir as informações e o estado
              deste curso.
            </p>
          </div>

          <span className="admin-detail-id">
            ID #{curso.id}
          </span>

        </div>

        {/* =====================================
            INFORMAÇÕES DO CURSO
        ===================================== */}

        <section className="admin-form-card">

          <div className="admin-form-header">

            <span className="admin-eyebrow">
              Dados do curso
            </span>

            <h2>
              Informações principais
            </h2>

            <p>
              Atualize os dados deste curso
              da OpsMind Academy.
            </p>

          </div>

          <form
            action={atualizarCurso}
            className="admin-form"
          >

            {/* =====================================
                TÍTULO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="title">
                Nome do curso
              </label>

              <input
                id="title"
                name="title"
                type="text"
                defaultValue={
                  curso.title
                }
                required
              />

            </div>

            {/* =====================================
                DESCRIÇÃO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="description">
                Descrição
              </label>

              <textarea
                id="description"
                name="description"
                defaultValue={
                  curso.description
                }
                rows={5}
                required
              />

            </div>

            {/* =====================================
                ÁREA
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="area">
                Área
              </label>

              <select
                id="area"
                name="area"
                defaultValue={
                  curso.area
                }
                required
              >

                <option value="ia">
                  Inteligência Artificial
                </option>

                <option value="data">
                  Data & Analytics
                </option>

                <option value="ciberseguranca">
                  Cibersegurança
                </option>

                <option value="compliance">
                  Compliance
                </option>

              </select>

            </div>

            {/* =====================================
                NÍVEL
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="level">
                Nível
              </label>

              <select
                id="level"
                name="level"
                defaultValue={
                  curso.level ||
                  ""
                }
              >

                <option value="">
                  Selecione o nível
                </option>

                <option value="Iniciante">
                  Iniciante
                </option>

                <option value="Intermédio">
                  Intermédio
                </option>

                <option value="Avançado">
                  Avançado
                </option>

              </select>

              <span className="admin-form-help">
                Defina o nível de dificuldade
                do curso.
              </span>

            </div>

            {/* =====================================
                DURAÇÃO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="duration">
                Duração
              </label>

              <input
                id="duration"
                name="duration"
                type="text"
                defaultValue={
                  curso.duration ||
                  ""
                }
                placeholder="Ex.: 40 horas"
              />

            </div>

            {/* =====================================
                MODALIDADE
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="modality">
                Modalidade
              </label>

              <select
                id="modality"
                name="modality"
                defaultValue={
                  curso.modality ||
                  ""
                }
              >

                <option value="">
                  Selecione uma modalidade
                </option>

                <option value="Online">
                  Online
                </option>

                <option value="Presencial">
                  Presencial
                </option>

                <option value="Online | Presencial">
                  Online | Presencial
                </option>

                <option value="Híbrido">
                  Híbrido
                </option>

              </select>

            </div>

            {/* =====================================
                PREÇO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="price">
                Preço
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={
                  curso.price ??
                  ""
                }
                placeholder="Ex.: 150000"
              />

              <span className="admin-form-help">
                Valor do curso em Kz.
              </span>

            </div>

            {/* =====================================
                VAGAS
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="vacancies">
                Número de vagas
              </label>

              <input
                id="vacancies"
                name="vacancies"
                type="number"
                min="0"
                step="1"
                defaultValue={
                  curso.vacancies ??
                  ""
                }
                placeholder="Ex.: 30"
              />

            </div>

            {/* =====================================
                ESTADO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="status">
                Estado
              </label>

              <select
                id="status"
                name="status"
                defaultValue={
                  curso.status
                }
              >

                <option value="ATIVO">
                  Ativo
                </option>

                <option value="INATIVO">
                  Inativo
                </option>

              </select>

            </div>

            {/* =====================================
                IMAGEM
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="image">
                Imagem
              </label>

              <input
                id="image"
                name="image"
                type="text"
                defaultValue={
                  curso.image ||
                  ""
                }
                placeholder="/images/cursos/curso.jpg"
              />

              <span className="admin-form-help">
                Por enquanto, indique o caminho
                da imagem. O upload será
                implementado posteriormente.
              </span>

            </div>

            {/* =====================================
                CONTEÚDO
            ===================================== */}

            <div className="admin-form-group">

              <label htmlFor="content">
                Conteúdo do curso
              </label>

              <textarea
                id="content"
                name="content"
                defaultValue={
                  curso.content ||
                  ""
                }
                placeholder="Introduza os módulos, conteúdos e informações adicionais..."
                rows={12}
              />

              <span className="admin-form-help">
                Poderemos posteriormente substituir
                este campo por um editor de conteúdo
                completo.
              </span>

            </div>

            {/* =====================================
                AÇÕES
            ===================================== */}

            <div className="admin-form-actions">

              <Link
                href="/admin/cursos"
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
            ESTADO DO CURSO
        ===================================== */}

        <section className="admin-detail-card">

          <div className="admin-form-header">

            <span className="admin-eyebrow">
              Publicação
            </span>

            <h2>
              Estado do curso
            </h2>

            <p>
              Controle se este curso está
              disponível na Academy.
            </p>

          </div>

          <div className="admin-account-status">

            <div>

              <span className="admin-detail-label">
                Estado atual
              </span>

              <span
                className={`admin-status-badge ${
                  curso.status ===
                  "ATIVO"
                    ? "active"
                    : ""
                }`}
              >
                {curso.status}
              </span>

            </div>

            <form
              action={
                alterarEstadoCurso
              }
            >

              <input
                type="hidden"
                name="status"
                value={
                  curso.status ===
                  "ATIVO"
                    ? "INATIVO"
                    : "ATIVO"
                }
              />

              <button
                type="submit"
                className={
                  curso.status ===
                  "ATIVO"
                    ? "admin-danger-button"
                    : "admin-activate-button"
                }
              >
                {curso.status ===
                "ATIVO"
                  ? "Inativar curso"
                  : "Ativar curso"}
              </button>

            </form>

          </div>

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
              Informações do sistema
            </h2>

            <p>
              Dados técnicos e administrativos
              deste curso.
            </p>

          </div>

          <div className="admin-detail-grid">

            {/* ID */}

            <div>

              <span className="admin-detail-label">
                ID
              </span>

              <strong>
                #{curso.id}
              </strong>

            </div>

            {/* SLUG */}

            <div>

              <span className="admin-detail-label">
                Slug
              </span>

              <strong>
                {curso.slug}
              </strong>

            </div>

            {/* ÁREA */}

            <div>

              <span className="admin-detail-label">
                Área
              </span>

              <strong>
                {nomesAreas[curso.area] ||
                  curso.area}
              </strong>

            </div>

            {/* NÍVEL */}

            <div>

              <span className="admin-detail-label">
                Nível
              </span>

              <strong>
                {curso.level ||
                  "Não definido"}
              </strong>

            </div>

            {/* CRIADO EM */}

            <div>

              <span className="admin-detail-label">
                Criado em
              </span>

              <strong>
                {new Date(
                  curso.createdAt
                ).toLocaleString(
                  "pt-PT"
                )}
              </strong>

            </div>

            {/* ATUALIZADO EM */}

            <div>

              <span className="admin-detail-label">
                Última atualização
              </span>

              <strong>
                {new Date(
                  curso.updatedAt
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