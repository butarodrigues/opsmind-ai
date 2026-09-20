import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";

const areasPermitidas = [
  "Inteligência Artificial",
  "Dados",
  "Cibersegurança",
  "Compliance",
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

const estadosPermitidos = [
  "ATIVO",
  "INATIVO",
];

function gerarSlug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function NovoCursoPage() {
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

  async function criarCurso(formData: FormData) {
    "use server";

    const titleValue =
      formData.get("title");

    const descriptionValue =
      formData.get("description");

    const areaValue =
      formData.get("area");

    const levelValue =
      formData.get("level");

    const durationValue =
      formData.get("duration");

    const modalityValue =
      formData.get("modality");

    const priceValue =
      formData.get("price");

    const vacanciesValue =
      formData.get("vacancies");

    const statusValue =
      formData.get("status");

    const imageValue =
      formData.get("image");

    const contentValue =
      formData.get("content");

    if (
      typeof titleValue !== "string" ||
      typeof descriptionValue !== "string" ||
      typeof areaValue !== "string"
    ) {
      return;
    }

    const title =
      titleValue.trim();

    const description =
      descriptionValue.trim();

    const area =
      areaValue.trim();

    if (!title || !description || !area) {
      return;
    }

    if (!areasPermitidas.includes(area)) {
      return;
    }

    // =====================================
    // NORMALIZAR NÍVEL
    // =====================================

    let nivelNormalizado:
      string | null = null;

    if (
      typeof levelValue === "string" &&
      levelValue.trim()
    ) {
      const nivel =
        levelValue.trim();

      if (
        !niveisPermitidos.includes(nivel)
      ) {
        return;
      }

      nivelNormalizado =
        nivel;
    }

    // =====================================
    // NORMALIZAR DURAÇÃO
    // =====================================

    let duracaoNormalizada:
      string | null = null;

    if (
      typeof durationValue === "string" &&
      durationValue.trim()
    ) {
      duracaoNormalizada =
        durationValue.trim();
    }

    // =====================================
    // NORMALIZAR MODALIDADE
    // =====================================

    let modalidadeNormalizada:
      string | null = null;

    if (
      typeof modalityValue === "string" &&
      modalityValue.trim()
    ) {
      const modalidade =
        modalityValue.trim();

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
    // NORMALIZAR PREÇO
    // =====================================

    let precoNormalizado:
      number | null = null;

    if (
      typeof priceValue === "string" &&
      priceValue.trim()
    ) {
      const precoTexto =
        priceValue
          .trim()
          .replace(",", ".");

      const preco =
        Number(precoTexto);

      if (
        Number.isNaN(preco) ||
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
      typeof vacanciesValue === "string" &&
      vacanciesValue.trim()
    ) {
      const vagas =
        Number(vacanciesValue);

      if (
        Number.isNaN(vagas) ||
        !Number.isInteger(vagas) ||
        vagas < 0
      ) {
        return;
      }

      vagasNormalizadas =
        vagas;
    }

    // =====================================
    // NORMALIZAR ESTADO
    // =====================================

    let estadoNormalizado =
      "ATIVO";

    if (
      typeof statusValue === "string" &&
      statusValue.trim()
    ) {
      const estado =
        statusValue.trim();

      if (
        !estadosPermitidos.includes(
          estado
        )
      ) {
        return;
      }

      estadoNormalizado =
        estado;
    }

    // =====================================
    // NORMALIZAR IMAGEM
    // =====================================

    let imagemNormalizada:
      string | null = null;

    if (
      typeof imageValue === "string" &&
      imageValue.trim()
    ) {
      imagemNormalizada =
        imageValue.trim();
    }

    // =====================================
    // NORMALIZAR CONTEÚDO
    // =====================================

    let conteudoNormalizado:
      string | null = null;

    if (
      typeof contentValue === "string" &&
      contentValue.trim()
    ) {
      conteudoNormalizado =
        contentValue.trim();
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

    while (
      await prisma.course.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug =
        `${slugBase}-${contador}`;

      contador++;
    }

    // =====================================
    // CRIAR CURSO
    // =====================================

    await prisma.course.create({
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
        status:
          estadoNormalizado,
        image:
          imagemNormalizada,
        content:
          conteudoNormalizado,
      },
    });

    revalidatePath("/admin/cursos");

    redirect("/admin/cursos");
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        <Link
          href="/admin/cursos"
          className="admin-back"
        >
          ← Voltar para cursos
        </Link>

        <div className="admin-detail-header">
          <div>
            <span className="admin-eyebrow">
              OpsMind Academy
            </span>

            <h1>
              Novo curso
            </h1>

            <p>
              Crie um novo curso para a
              OpsMind Academy.
            </p>
          </div>
        </div>

        <section className="admin-form-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Dados do curso
            </span>

            <h2>
              Informações principais
            </h2>

            <p>
              Preencha os dados necessários
              para criar o curso.
            </p>
          </div>

          <form
            action={criarCurso}
            className="admin-form"
          >

            <div className="admin-form-grid">

              {/* NOME */}

              <div className="admin-form-group">
                <label htmlFor="title">
                  Nome do curso
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Ex.: Fundamentos de Inteligência Artificial"
                  required
                />
              </div>

              {/* DESCRIÇÃO */}

              <div className="admin-form-group">
                <label htmlFor="description">
                  Descrição
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Descreva o curso..."
                  rows={4}
                  required
                />
              </div>

              {/* ÁREA */}

              <div className="admin-form-group">
                <label htmlFor="area">
                  Área
                </label>

                <select
                  id="area"
                  name="area"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Selecione uma área
                  </option>

                  <option value="Inteligência Artificial">
                    Inteligência Artificial
                  </option>

                  <option value="Dados">
                    Dados
                  </option>

                  <option value="Cibersegurança">
                    Cibersegurança
                  </option>

                  <option value="Compliance">
                    Compliance
                  </option>
                </select>
              </div>

              {/* NÍVEL */}

              <div className="admin-form-group">
                <label htmlFor="level">
                  Nível
                </label>

                <select
                  id="level"
                  name="level"
                  defaultValue=""
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
              </div>

              {/* DURAÇÃO */}

              <div className="admin-form-group">
                <label htmlFor="duration">
                  Duração
                </label>

                <input
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="Ex.: 40 horas"
                />
              </div>

              {/* MODALIDADE */}

              <div className="admin-form-group">
                <label htmlFor="modality">
                  Modalidade
                </label>

                <select
                  id="modality"
                  name="modality"
                  defaultValue=""
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

              {/* PREÇO */}

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
                  placeholder="Ex.: 150000"
                />
              </div>

              {/* VAGAS */}

              <div className="admin-form-group">
                <label htmlFor="vacancies">
                  Vagas
                </label>

                <input
                  id="vacancies"
                  name="vacancies"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Ex.: 30"
                />
              </div>

              {/* ESTADO */}

              <div className="admin-form-group">
                <label htmlFor="status">
                  Estado
                </label>

                <select
                  id="status"
                  name="status"
                  defaultValue="ATIVO"
                >
                  <option value="ATIVO">
                    Ativo
                  </option>

                  <option value="INATIVO">
                    Inativo
                  </option>
                </select>
              </div>

              {/* IMAGEM */}

              <div className="admin-form-group">
                <label htmlFor="image">
                  Imagem
                </label>

                <input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="Ex.: /academy/ia.jpg"
                />

                <span className="admin-form-help">
                  Introduza o caminho da imagem
                  que será utilizada no curso.
                </span>
              </div>

            </div>

            {/* CONTEÚDO */}

            <div className="admin-form-group">
              <label htmlFor="content">
                Conteúdo do curso
              </label>

              <textarea
                id="content"
                name="content"
                placeholder="Introduza o conteúdo ou informações adicionais do curso..."
                rows={8}
              />

              <span className="admin-form-help">
                Este campo poderá ser utilizado
                posteriormente para estruturar
                o conteúdo completo do curso.
              </span>
            </div>

            {/* AÇÕES */}

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
                Criar curso
                <span>→</span>
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}