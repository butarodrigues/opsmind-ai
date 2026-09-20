import Link from "next/link";
import Header from "../components/Header";

const projetos = [
  {
    code: "AI",
    area: "Inteligência Artificial",
    title: "FraudShield AI",
    description:
      "Plataforma de deteção de anomalias e apoio à identificação de fraude em transações financeiras através de Inteligência Artificial e Machine Learning.",
    status: "Em desenvolvimento",
    slug: "fraudshield-ai",
  },
  {
    code: "SCI",
    area: "Ciência & Dados",
    title: "SCIENTIA",
    description:
      "Plataforma dedicada à investigação, conhecimento científico e partilha de conteúdos para apoiar estudantes, investigadores e instituições.",
    status: "Em desenvolvimento",
    slug: "scientia",
  },
  {
    code: "EDU",
    area: "Educação & Tecnologia",
    title: "LÚMEN",
    description:
      "Plataforma digital de aprendizagem concebida para aproximar tecnologia, conhecimento e formação profissional.",
    status: "Em desenvolvimento",
    slug: "lumen",
  },
  {
    code: "CMP",
    area: "Compliance",
    title: "Compliance Intelligence",
    description:
      "Solução tecnológica para apoiar organizações na gestão de compliance, risco, controlos internos e processos de conformidade.",
    status: "Em desenvolvimento",
    slug: "compliance-intelligence",
  },
  {
    code: "AO",
    area: "Tecnologia & Sociedade",
    title: "Encontrei.AO",
    description:
      "Plataforma digital concebida para facilitar a comunicação e recuperação de objetos perdidos em Angola.",
    status: "Em desenvolvimento",
    slug: "encontrei-ao",
  },
];

export default function ProjetosPage() {
  return (
    <>
      <Header />

      <main className="projects-page">
        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="projects-hero">
          <div className="projects-container">
            <div className="projects-hero-content">
              <span className="projects-eyebrow">
                Projetos OpsMind
              </span>

              <h1>
                Ideias que se
                <span> transformam em soluções.</span>
              </h1>

              <p>
                Desenvolvemos projetos que combinam Inteligência
                Artificial, Dados, Software e tecnologia para
                responder a problemas concretos e criar novas
                possibilidades.
              </p>
            </div>

            <div className="projects-hero-visual">
              <div className="projects-orbit orbit-one"></div>
              <div className="projects-orbit orbit-two"></div>
              <div className="projects-orbit orbit-three"></div>

              <div className="projects-core">
                <span>OPS</span>
                <strong>PROJECTS</strong>
              </div>

              <div className="projects-floating-card card-one">
                <strong>AI</strong>
                <span>Inteligência</span>
              </div>

              <div className="projects-floating-card card-two">
                <strong>DATA</strong>
                <span>Dados</span>
              </div>

              <div className="projects-floating-card card-three">
                <strong>TECH</strong>
                <span>Tecnologia</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUÇÃO
            ===================================================== */}

        <section className="projects-intro">
          <div className="projects-container">
            <div className="projects-section-heading">
              <span className="projects-eyebrow">
                Projetos em destaque
              </span>

              <h2>
                Construímos para
                <br />
                resolver problemas.
              </h2>

              <p>
                Cada projeto nasce de uma necessidade, uma hipótese
                ou uma oportunidade de inovação. Investigamos,
                desenvolvemos e transformamos conceitos em soluções
                tecnológicas.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            LISTA DE PROJETOS
            ===================================================== */}

        <section className="projects-list">
          <div className="projects-container">
            <div className="projects-grid">
              {projetos.map((projeto, index) => (
                <article
                  key={projeto.slug}
                  className={`project-card ${
                    index === 0 ? "project-card-featured" : ""
                  }`}
                >
                  <div className="project-card-top">
                    <span className="project-code">
                      {projeto.code}
                    </span>

                    <span className="project-status">
                      {projeto.status}
                    </span>
                  </div>

                  <div className="project-card-content">
                    <span className="project-area">
                      {projeto.area}
                    </span>

                    <h3>{projeto.title}</h3>

                    <p>{projeto.description}</p>
                  </div>

                  <Link
                    href={`/projetos/${projeto.slug}`}
                    className="project-card-link"
                  >
                    Explorar projeto
                    <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ÁREAS
            ===================================================== */}

        <section className="projects-areas">
          <div className="projects-container">
            <div className="projects-areas-header">
              <span className="projects-eyebrow">
                Como trabalhamos
              </span>

              <h2>
                Tecnologia aplicada
                <br />
                a problemas reais.
              </h2>
            </div>

            <div className="projects-areas-grid">
              <div className="projects-area-item">
                <span>01</span>
                <strong>Inteligência Artificial</strong>
                <p>
                  Modelos inteligentes, automação e sistemas
                  orientados por dados.
                </p>
              </div>

              <div className="projects-area-item">
                <span>02</span>
                <strong>Dados & Analytics</strong>
                <p>
                  Transformação de dados em informação e apoio
                  à decisão.
                </p>
              </div>

              <div className="projects-area-item">
                <span>03</span>
                <strong>Software</strong>
                <p>
                  Desenvolvimento de plataformas e soluções
                  digitais.
                </p>
              </div>

              <div className="projects-area-item">
                <span>04</span>
                <strong>Segurança & Compliance</strong>
                <p>
                  Tecnologia para reduzir riscos e melhorar
                  processos organizacionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
            ===================================================== */}

        <section className="projects-cta">
          <div className="projects-container">
            <span className="projects-eyebrow">
              Do problema ao impacto
            </span>

            <h2>
              Tem um problema.
              <br />
              Vamos construir a solução.
            </h2>

            <p>
              Trabalhamos com organizações e parceiros para
              transformar desafios complexos em soluções
              tecnológicas.
            </p>

            <Link
              href="#contactos"
              className="projects-cta-button"
            >
              Falar com a OpsMind
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}