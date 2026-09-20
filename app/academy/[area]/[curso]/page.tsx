import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

const areas = {
  ia: {
    code: "AI",
    title: "Inteligência Artificial",
    databaseName: "ia",
  },

  data: {
    code: "DATA",
    title: "Dados & Analytics",
    databaseName: "data",
  },

  ciberseguranca: {
    code: "SEC",
    title: "Cibersegurança",
    databaseName: "ciberseguranca",
  },

  compliance: {
    code: "CMP",
    title: "Compliance",
    databaseName: "compliance",
  },
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{
    area: string;
    curso: string;
  }>;
}) {
  /*
   * ============================================================
   * OBTER PARÂMETROS DA URL
   * ============================================================
   */

  const { area, curso } = await params;

  /*
   * ============================================================
   * VALIDAR ÁREA
   * ============================================================
   */

  const areaData =
    areas[area as keyof typeof areas];

  if (!areaData) {
    notFound();
  }

  /*
   * ============================================================
   * BUSCAR CURSO NA BASE DE DADOS
   * ============================================================
   *
   * Procuramos o curso através do slug.
   *
   * Também confirmamos que pertence à área correta.
   *
   */

  const course =
    await prisma.course.findFirst({
      where: {
        slug: curso,
        area: areaData.databaseName,
      },
    });

  /*
   * ============================================================
   * CURSO NÃO ENCONTRADO
   * ============================================================
   */

  if (!course) {
    notFound();
  }

  /*
   * ============================================================
   * DADOS NORMALIZADOS
   * ============================================================
   */

  const duration =
    course.duration || "A definir";

  const modality =
    course.modality ||
    "Online | Presencial";

  const price =
    course.price;

  const vacancies =
    course.vacancies;

  const content =
    course.content?.trim() ||
    "";

  /*
   * ============================================================
   * PÁGINA
   * ============================================================
   */

  return (
    <>
      <Header />

      <main className="course-page">

        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="course-header">

          <div className="course-container">

            <Link
              href={`/academy/${area}`}
              className="course-back"
            >
              ← Voltar para os cursos
            </Link>

            <span className="course-code">
              {areaData.code}
            </span>

            <span className="course-eyebrow">
              Academia OpsMind · {areaData.title}
            </span>

            <h1>
              {course.title}
            </h1>

            <p className="course-description">
              {course.description}
            </p>

            <div className="course-actions">

              <Link
                href={`/academy/${area}/${course.slug}/inscricao`}
                className="course-button primary"
              >
                Inscrever-me neste curso

                <span>
                  →
                </span>
              </Link>

            </div>

          </div>

        </section>

        {/* =====================================================
            INFORMAÇÕES DO CURSO
            ===================================================== */}

        <section className="course-info-section">

          <div className="course-container">

            <div className="course-info">

              <div>
                <span>
                  Área
                </span>

                <strong>
                  {areaData.title}
                </strong>
              </div>

              <div>
                <span>
                  Carga horária
                </span>

                <strong>
                  {duration}
                </strong>
              </div>

              <div>
                <span>
                  Modalidade
                </span>

                <strong>
                  {modality}
                </strong>
              </div>

              <div>
                <span>
                  Estado
                </span>

                <strong>
                  {course.status === "ATIVO"
                    ? "Disponível"
                    : course.status}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            SOBRE O CURSO
            ===================================================== */}

        <section className="course-section">

          <div className="course-container">

            <div className="course-grid">

              <div>

                <span className="course-section-label">
                  Sobre o curso
                </span>

                <h2>
                  Desenvolva competências
                  para o futuro.
                </h2>

              </div>

              <div>

                <p>
                  {course.description}
                </p>

                <p>
                  Esta formação foi desenvolvida pela
                  OpsMind Academy para proporcionar uma
                  aprendizagem prática e orientada para
                  resultados.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            DETALHES DA FORMAÇÃO
            ===================================================== */}

        <section className="course-section course-section-light">

          <div className="course-container">

            <span className="course-section-label">
              Formação
            </span>

            <h2>
              Informações do curso
            </h2>

            <div className="course-objectives">

              <div className="course-objective">

                <span>
                  01
                </span>

                <p>
                  Formação especializada em{" "}
                  {areaData.title}.
                </p>

              </div>

              <div className="course-objective">

                <span>
                  02
                </span>

                <p>
                  Carga horária de{" "}
                  {duration}.
                </p>

              </div>

              <div className="course-objective">

                <span>
                  03
                </span>

                <p>
                  Modalidade de formação:
                  {" "}
                  {modality}.
                </p>

              </div>

              <div className="course-objective">

                <span>
                  04
                </span>

                <p>
                  Conteúdos orientados para aplicação
                  prática e desenvolvimento profissional.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTEÚDO DA FORMAÇÃO
            ===================================================== */}

        <section className="course-section">

          <div className="course-container">

            <span className="course-section-label">
              Programa
            </span>

            <h2>
              Conteúdos da formação
            </h2>

            {content ? (

              <div className="program-list">

                <div className="program-item">

                  <span className="program-number">
                    01
                  </span>

                  <div>

                    <h3>
                      Programa do curso
                    </h3>

                    <p>
                      {content}
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="program-list">

                <div className="program-item">

                  <span className="program-number">
                    01
                  </span>

                  <div>

                    <h3>
                      Programa em preparação
                    </h3>

                    <p>
                      Os conteúdos detalhados desta
                      formação serão disponibilizados
                      pela OpsMind Academy.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

        </section>

        {/* =====================================================
            METODOLOGIA
            ===================================================== */}

        <section className="course-section course-section-light">

          <div className="course-container">

            <span className="course-section-label">
              Metodologia
            </span>

            <div className="course-grid">

              <div>

                <h2>
                  Aprender fazendo.
                </h2>

              </div>

              <div>

                <p>
                  A formação combina exposição teórica
                  com exercícios práticos, análise de
                  casos e atividades orientadas.
                </p>

                <p>
                  Os participantes são incentivados a
                  aplicar os conhecimentos adquiridos
                  em situações próximas da realidade
                  profissional.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PÚBLICO E CONDIÇÕES
            ===================================================== */}

        <section className="course-section">

          <div className="course-container">

            <div className="course-grid">

              <div>

                <span className="course-section-label">
                  Público-alvo
                </span>

                <h2>
                  Para quem é esta formação?
                </h2>

                <p>
                  Profissionais, estudantes, gestores,
                  técnicos e todos aqueles que pretendam
                  desenvolver competências em{" "}
                  {areaData.title}.
                </p>

              </div>

              <div>

                <span className="course-section-label">
                  Modalidade
                </span>

                <h2>
                  Como funciona?
                </h2>

                <p>
                  Esta formação está disponível na
                  modalidade{" "}
                  <strong>
                    {modality}
                  </strong>.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            DISPONIBILIDADE
            ===================================================== */}

        <section className="course-section course-section-light">

          <div className="course-container">

            <div className="course-grid">

              <div>

                <span className="course-section-label">
                  Disponibilidade
                </span>

                <h2>
                  Garanta a sua vaga.
                </h2>

                <p>
                  Este curso encontra-se atualmente
                  disponível para inscrição.
                </p>

              </div>

              <div>

                {price !== null &&
                price !== undefined ? (

                  <div>

                    <span className="course-section-label">
                      Investimento
                    </span>

                    <h2>
                      {price} Kz
                    </h2>

                  </div>

                ) : (

                  <div>

                    <span className="course-section-label">
                      Investimento
                    </span>

                    <p>
                      Informação disponível através
                      da equipa OpsMind Academy.
                    </p>

                  </div>

                )}

                {vacancies !== null &&
                vacancies !== undefined && (

                  <p>
                    Vagas disponíveis:
                    {" "}
                    <strong>
                      {vacancies}
                    </strong>
                  </p>

                )}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            AVALIAÇÃO E CERTIFICAÇÃO
            ===================================================== */}

        <section className="course-section">

          <div className="course-container">

            <div className="course-grid">

              <div>

                <span className="course-section-label">
                  Avaliação
                </span>

                <h2>
                  Avaliar para consolidar.
                </h2>

                <p>
                  A avaliação poderá incluir exercícios
                  práticos, participação nas atividades
                  e aplicação dos conhecimentos adquiridos.
                </p>

              </div>

              <div>

                <span className="course-section-label">
                  Certificação
                </span>

                <h2>
                  Certificação OpsMind.
                </h2>

                <p>
                  Os participantes que cumprirem os
                  requisitos definidos para a formação
                  receberão a certificação correspondente
                  às condições da edição.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CTA INSCRIÇÃO
            ===================================================== */}

        <section className="course-enrollment">

          <div className="course-container">

            <div>

              <span>
                Academia OpsMind
              </span>

              <h2>
                Pronto para começar?
              </h2>

              <p>
                Garanta a sua vaga nesta formação e
                desenvolva competências para o futuro.
              </p>

            </div>

            <Link
              href={`/academy/${area}/${course.slug}/inscricao`}
              className="course-button"
            >
              Fazer inscrição

              <span>
                →
              </span>
            </Link>

          </div>

        </section>

      </main>
    </>
  );
}