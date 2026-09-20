import Link from "next/link";

const areas = [
  {
    code: "AI",
    title: "Inteligência Artificial",
    description:
      "Formação em Inteligência Artificial, Machine Learning, IA generativa e aplicação prática de modelos inteligentes.",
    slug: "ia",
  },
  {
    code: "DATA",
    title: "Dados & Analytics",
    description:
      "Capacitação em análise de dados, Business Intelligence, visualização e apoio à tomada de decisão.",
    slug: "data",
  },
  {
    code: "SEC",
    title: "Cibersegurança",
    description:
      "Formação orientada para segurança da informação, avaliação de riscos, proteção de sistemas e boas práticas.",
    slug: "ciberseguranca",
  },
  {
    code: "CMP",
    title: "Compliance",
    description:
      "Capacitação em compliance, gestão de risco, controlos internos e governação.",
    slug: "compliance",
  },
];

export default function Academy() {
  return (
    <section id="academy" className="academy-section">

      {/* CABEÇALHO */}

      <div className="academy-header">

        <span className="academy-eyebrow">
          Academia OpsMind
        </span>

        <h2>
          Conhecimento que
          <span> transforma.</span>
        </h2>

        <p>
          Desenvolvemos competências para preparar profissionais e
          organizações para os desafios da Inteligência Artificial,
          Dados, Cibersegurança, Compliance e Automação.
        </p>

      </div>

      {/* ÁREAS */}

      <div className="academy-grid">

        {areas.map((area, index) => (

          <div
            key={area.slug}
            className="academy-card"
          >

            {/* TOPO DO CARD */}

            <div className="academy-card-top">

              <div className="academy-code">
                {area.code}
              </div>

              <span className="academy-number">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>

            {/* CONTEÚDO */}

            <div className="academy-card-content">

              <h3>
                {area.title}
              </h3>

              <p>
                {area.description}
              </p>

            </div>

            {/* BOTÃO */}

            <Link
              href={`/academy/${area.slug}`}
              className="academy-card-link"
            >
              Explorar formação
              <span>→</span>
            </Link>

          </div>

        ))}

      </div>

      {/* BLOCO FINAL */}

      <div className="academy-bottom">

        <div>
          <span>Academia OpsMind</span>

          <h3>
            Prepare-se para o futuro.
          </h3>

          <p>
            Desenvolva competências e transforme conhecimento
            em resultados concretos.
          </p>
        </div>

        <Link
          href="/academy"
          className="academy-bottom-button"
        >
          Conhecer a Academy
          <span>→</span>
        </Link>

      </div>

    </section>
  );
}