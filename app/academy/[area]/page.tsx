import Link from "next/link";
import Header from "../../components/Header";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

const areas = {
  ia: {
    code: "AI",
    title: "Inteligência Artificial",
    databaseName: "ia",
    description:
      "Desenvolva competências em Inteligência Artificial e aprenda a aplicar tecnologias de IA em contextos profissionais e empresariais.",
  },

  data: {
    code: "DATA",
    title: "Dados & Analytics",
    databaseName: "data",
    description:
      "Transforme dados em informação útil e desenvolva competências para apoiar decisões estratégicas.",
  },

  ciberseguranca: {
    code: "SEC",
    title: "Cibersegurança",
    databaseName: "ciberseguranca",
    description:
      "Desenvolva competências para proteger sistemas, dados e infraestruturas contra ameaças digitais.",
  },

  compliance: {
    code: "CMP",
    title: "Compliance",
    databaseName: "compliance",
    description:
      "Desenvolva competências em conformidade, gestão de risco, controlos internos e governação.",
  },
};

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;

  const data = areas[area as keyof typeof areas];

  /*
   * ============================================================
   * VERIFICAR SE A ÁREA EXISTE
   * ============================================================
   */

  if (!data) {
    return (
      <>
        <Header />

        <main className="academy-not-found">
          <div>
            <span>Academia OpsMind</span>

            <h1>Área não encontrada.</h1>

            <p>
              A área de formação que procura
              não está disponível.
            </p>

            <Link href="/academy">
              ← Voltar para a Academy
            </Link>
          </div>
        </main>
      </>
    );
  }

  /*
   * ============================================================
   * BUSCAR CURSOS DA BASE DE DADOS
   * ============================================================
   *
   * Procuramos os cursos pertencentes à área atual.
   *
   * Os valores utilizados são:
   *
   * ia
   * data
   * ciberseguranca
   * compliance
   *
   * Estes valores correspondem aos identificadores
   * utilizados pela Academy e pela base de dados.
   */

  const cursos = await prisma.course.findMany({
    where: {
      area: data.databaseName,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  /*
   * ============================================================
   * PÁGINA
   * ============================================================
   */

  return (
    <>
      <Header />

      <main className="academy-area-page">

        {/* =====================================================
            HERO DA ÁREA
            ===================================================== */}

        <section className="academy-area-hero">
          <div className="academy-area-container">

            <Link
              href="/academy"
              className="academy-back"
            >
              ← Voltar para a Academy
            </Link>

            <div className="academy-area-code">
              {data.code}
            </div>

            <span className="academy-area-eyebrow">
              Academia OpsMind
            </span>

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

          </div>
        </section>

        {/* =====================================================
            CURSOS
            ===================================================== */}

        <section className="academy-courses">
          <div className="academy-courses-container">

            <div className="academy-courses-header">

              <span>
                Formação
              </span>

              <h2>
                Cursos de{" "}
                <strong>
                  {data.title}
                </strong>
              </h2>

              <p>
                Explore os cursos disponíveis nesta área e
                encontre a formação adequada aos seus objetivos
                profissionais.
              </p>

            </div>

            {/* =================================================
                SEM CURSOS
                ================================================= */}

            {cursos.length === 0 ? (

              <div className="academy-empty-state">

                <span>
                  Academia OpsMind
                </span>

                <h3>
                  Ainda não existem cursos disponíveis.
                </h3>

                <p>
                  Estamos a preparar novas formações para esta
                  área. Volte em breve para descobrir os próximos
                  cursos.
                </p>

                <Link
                  href="/academy"
                  className="academy-course-button"
                >
                  Ver outras áreas

                  <span>
                    →
                  </span>
                </Link>

              </div>

            ) : (

              /* =================================================
                 CURSOS ENCONTRADOS
                 ================================================= */

              <div className="academy-courses-grid">

                {cursos.map((course, index) => (

                  <article
                    key={course.id}
                    className="academy-course-card"
                  >

                    {/* =========================================
                        TOPO DO CARD
                        ========================================= */}

                    <div className="academy-course-top">

                      <span className="academy-course-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="academy-course-format">
                        {course.modality ||
                          "Online | Presencial"}
                      </span>

                    </div>

                    {/* =========================================
                        TÍTULO
                        ========================================= */}

                    <h3>
                      {course.title}
                    </h3>

                    {/* =========================================
                        DESCRIÇÃO
                        ========================================= */}

                    <p>
                      {course.description}
                    </p>

                    {/* =========================================
                        DETALHES
                        ========================================= */}

                    <div className="academy-course-details">

                      <div>

                        <span>
                          Formação
                        </span>

                        <strong>
                          {data.title}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Carga horária
                        </span>

                        <strong>
                          {course.duration ||
                            "A definir"}
                        </strong>

                      </div>

                    </div>

                    {/* =========================================
                        LINK PARA O CURSO
                        ========================================= */}

                    <Link
                      href={`/academy/${area}/${course.slug}`}
                      className="academy-course-button"
                    >
                      Ver curso

                      <span>
                        →
                      </span>
                    </Link>

                  </article>

                ))}

              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            CTA
            ===================================================== */}

        <section className="academy-area-cta">

          <div>

            <span>
              Academia OpsMind
            </span>

            <h2>
              Prepare-se para o futuro.
            </h2>

            <p>
              Desenvolva competências e transforme conhecimento
              em resultados concretos.
            </p>

          </div>

          <Link
            href="/academy"
            className="academy-cta-button"
          >
            Ver todas as áreas

            <span>
              →
            </span>
          </Link>

        </section>

      </main>
    </>
  );
}