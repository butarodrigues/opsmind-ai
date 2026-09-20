import Link from "next/link";
import Header from "../components/Header";

const areas = [
  {
    slug: "ia",
    code: "AI",
    title: "Inteligência Artificial",
    description:
      "Desenvolva competências em Inteligência Artificial e aprenda a aplicar tecnologias de IA em contextos profissionais e empresariais.",
  },
  {
    slug: "data",
    code: "DATA",
    title: "Dados & Analytics",
    description:
      "Transforme dados em informação útil e desenvolva competências para apoiar decisões estratégicas.",
  },
  {
    slug: "ciberseguranca",
    code: "SEC",
    title: "Cibersegurança",
    description:
      "Desenvolva competências para proteger sistemas, dados e infraestruturas contra ameaças digitais.",
  },
  {
    slug: "compliance",
    code: "CMP",
    title: "Compliance",
    description:
      "Desenvolva competências em conformidade, gestão de risco, controlos internos e governação.",
  },
];

export default function AcademyPage() {
  return (
    <>
      <Header />

      <main className="academy-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="academy-hero">
          <div className="academy-container">

            <span className="academy-eyebrow">
              Formação
            </span>

            <h1>
              Desenvolva competências.
              <br />
              <span>Prepare o futuro.</span>
            </h1>

            <p>
              A OpsMind Academy oferece formação especializada
              em Inteligência Artificial, Dados, Cibersegurança
              e Compliance.
            </p>

          </div>
        </section>


        {/* =====================================================
            ÁREAS DE FORMAÇÃO
        ===================================================== */}

        <section className="academy-areas">

          <div className="academy-container">

            <div className="academy-section-header">

              <span>
                Academia OpsMind
              </span>

              <h2>
                Áreas de formação
              </h2>

              <p>
                Explore as nossas áreas de formação e encontre
                a especialização adequada aos seus objetivos
                profissionais.
              </p>

            </div>


            {/* =================================================
                ÁREAS
            ================================================= */}

            <div className="academy-areas-grid">

              {areas.map((area, index) => (

                <article
                  key={area.slug}
                  className="academy-area-card"
                >

                  {/* Topo */}

                  <div className="academy-area-card-top">

                    <span className="academy-area-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="academy-area-code">
                      {area.code}
                    </span>

                  </div>


                  {/* Conteúdo */}

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.description}
                  </p>


                  {/* Link */}

                  <Link
                    href={`/academy/${area.slug}`}
                    className="academy-course-button"
                  >
                    Explorar área

                    <span>
                      →
                    </span>
                  </Link>

                </article>

              ))}

            </div>

          </div>

        </section>

      </main>
    </>
  );
}