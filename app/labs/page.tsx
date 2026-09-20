import Header from "../components/Header";

export default function LabsPage() {
  return (
    <>
      <Header />

      <main className="labs-page">

        {/* =================================================
           HERO
           ================================================= */}

        <section className="labs-hero">
          <div className="labs-container">

            <div className="labs-hero-content">

              <span className="labs-eyebrow">
                OpsMind Labs
              </span>

              <h1>
                Experimentamos hoje.
                <span> Construímos o amanhã.</span>
              </h1>

              <p>
                Investigamos novas tecnologias, desenvolvemos
                protótipos e testamos ideias para transformar
                problemas complexos em novas possibilidades.
              </p>

              <div className="labs-hero-actions">
                <a
                  href="#projetos-labs"
                  className="labs-button primary"
                >
                  Explorar projetos
                  <span>→</span>
                </a>

                <a
                  href="#investigacao"
                  className="labs-button secondary"
                >
                  Conhecer o Labs
                </a>
              </div>

            </div>

            <div className="labs-hero-visual">

              <div className="labs-orbit orbit-one"></div>
              <div className="labs-orbit orbit-two"></div>
              <div className="labs-orbit orbit-three"></div>

              <div className="labs-core">
                <span>LAB</span>
              </div>

              <div className="labs-node node-ai">
                <strong>AI</strong>
                <span>Inteligência</span>
              </div>

              <div className="labs-node node-data">
                <strong>DATA</strong>
                <span>Dados</span>
              </div>

              <div className="labs-node node-sec">
                <strong>SEC</strong>
                <span>Segurança</span>
              </div>

            </div>

          </div>
        </section>


        {/* =================================================
           INVESTIGAÇÃO
           ================================================= */}

        <section
          id="investigacao"
          className="labs-section labs-investigation"
        >
          <div className="labs-container">

            <div className="labs-section-header">

              <span className="labs-eyebrow">
                Investigação & Desenvolvimento
              </span>

              <h2>
                Onde ideias se tornam experiências.
              </h2>

              <p>
                O OpsMind Labs é o espaço dedicado à
                experimentação, investigação e desenvolvimento
                de novas soluções tecnológicas.
              </p>

            </div>

            <div className="labs-areas-grid">

              <article className="labs-area-card">
                <span className="labs-area-code">
                  AI
                </span>

                <h3>
                  Inteligência Artificial
                </h3>

                <p>
                  Exploramos modelos, agentes, visão
                  computacional, IA generativa e novas
                  aplicações de Inteligência Artificial.
                </p>
              </article>


              <article className="labs-area-card">
                <span className="labs-area-code">
                  DATA
                </span>

                <h3>
                  Dados & Analytics
                </h3>

                <p>
                  Transformamos dados em conhecimento através
                  de análise, modelos preditivos e sistemas
                  inteligentes de apoio à decisão.
                </p>
              </article>


              <article className="labs-area-card">
                <span className="labs-area-code">
                  SEC
                </span>

                <h3>
                  Cibersegurança
                </h3>

                <p>
                  Investigamos novas abordagens para proteção
                  de sistemas, dados, infraestruturas e
                  ambientes digitais.
                </p>
              </article>


              <article className="labs-area-card">
                <span className="labs-area-code">
                  AUTO
                </span>

                <h3>
                  Automação
                </h3>

                <p>
                  Desenvolvemos sistemas capazes de automatizar
                  processos e transformar operações através
                  de tecnologia inteligente.
                </p>
              </article>

            </div>

          </div>
        </section>


        {/* =================================================
           PROJETOS
           ================================================= */}

        <section
          id="projetos-labs"
          className="labs-section labs-projects"
        >
          <div className="labs-container">

            <div className="labs-section-header">

              <span className="labs-eyebrow">
                Projetos em destaque
              </span>

              <h2>
                Experimentar. Construir. Validar.
              </h2>

              <p>
                Projetos experimentais desenvolvidos pelo
                OpsMind Labs para explorar novas possibilidades
                tecnológicas.
              </p>

            </div>


            <div className="labs-projects-grid">

              <article className="labs-project-card">

                <div className="labs-project-top">
                  <span>AI</span>
                  <span>Protótipo</span>
                </div>

                <h3>
                  PneumoVision AI
                </h3>

                <p>
                  Exploração de Inteligência Artificial e
                  visão computacional aplicada à análise
                  de imagens médicas.
                </p>

                <a href="#">
                  Explorar projeto
                  <span>→</span>
                </a>

              </article>


              <article className="labs-project-card">

                <div className="labs-project-top">
                  <span>DATA</span>
                  <span>Investigação</span>
                </div>

                <h3>
                  Election Analytics
                </h3>

                <p>
                  Exploração de modelos de dados e análise
                  preditiva aplicada ao estudo de cenários
                  eleitorais.
                </p>

                <a href="#">
                  Explorar projeto
                  <span>→</span>
                </a>

              </article>


              <article className="labs-project-card">

                <div className="labs-project-top">
                  <span>AI</span>
                  <span>Experimental</span>
                </div>

                <h3>
                  AI Operations
                </h3>

                <p>
                  Investigação de sistemas inteligentes
                  capazes de apoiar operações, processos
                  e tomada de decisão.
                </p>

                <a href="#">
                  Explorar projeto
                  <span>→</span>
                </a>

              </article>

            </div>

          </div>
        </section>


        {/* =================================================
           PROCESSO
           ================================================= */}

        <section className="labs-process">

          <div className="labs-container">

            <div className="labs-process-content">

              <span className="labs-eyebrow">
                Do conceito ao impacto
              </span>

              <h2>
                Investigamos.
                Construímos.
                Testamos.
              </h2>

              <p>
                No Labs, cada projeto começa com uma pergunta.
                Investigamos o problema, desenvolvemos uma
                hipótese, construímos um protótipo e avaliamos
                os resultados.
              </p>

            </div>


            <div className="labs-process-steps">

              <div className="labs-process-step">
                <span>01</span>
                <strong>Investigar</strong>
              </div>

              <div className="labs-process-step">
                <span>02</span>
                <strong>Construir</strong>
              </div>

              <div className="labs-process-step">
                <span>03</span>
                <strong>Testar</strong>
              </div>

              <div className="labs-process-step">
                <span>04</span>
                <strong>Medir</strong>
              </div>

              <div className="labs-process-step">
                <span>05</span>
                <strong>Aprender</strong>
              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}