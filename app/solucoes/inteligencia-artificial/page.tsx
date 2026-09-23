import Link from "next/link";

export default function InteligenciaArtificialPage() {
  return (
    <main className="solution-page">

      {/* HERO */}
      <section className="solution-hero">
        <div className="solution-container">
        <Link href="/#solucoes" className="solution-back">
           ← Voltar às soluções
            </Link>

          <span className="section-label">
            Soluções OpsMind
          </span>

          <div className="solution-hero-content">
            <div>
              <span className="solution-page-number">
                01 / 05
              </span>

              <h1>
                Inteligência
                <br />
                Artificial
              </h1>

              <p>
                Desenvolvemos soluções de Inteligência Artificial
                para automatizar processos, analisar informação
                e apoiar decisões estratégicas.
              </p>

              <div className="solution-hero-actions">
                <Link
                  href="/contactos"
                  className="solution-primary-button"
                >
                  Fale connosco
                  <span>→</span>
                </Link>

                <a
                  href="#servicos"
                  className="solution-secondary-button"
                >
                  Conhecer soluções
                  <span>↓</span>
                </a>
              </div>
            </div>

            <div className="solution-hero-visual">
              <div className="solution-visual-icon">
                AI
              </div>

              <span>Artificial Intelligence</span>
            </div>
          </div>

        </div>
      </section>

      {/* INTRODUÇÃO */}
      <section className="solution-intro" id="servicos">
        <div className="solution-container">

          <div className="solution-section-heading">
            <span className="section-label">
              O que fazemos
            </span>

            <h2>
              IA aplicada a
              <br />
              desafios reais.
            </h2>
          </div>

          <div className="solution-section-description">
            <p>
              A Inteligência Artificial pode transformar a forma
              como uma organização analisa informação, executa
              processos e toma decisões.
            </p>

            <p>
              Na OpsMind AI desenvolvemos soluções adaptadas
              às necessidades de cada organização, combinando
              dados, automação e modelos de Inteligência Artificial.
            </p>
          </div>

        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="solution-services">
        <div className="solution-container">

          <div className="solution-services-grid">

            <article className="solution-service-card">
              <span>01</span>

              <h3>
                IA Generativa
              </h3>

              <p>
                Desenvolvimento de soluções baseadas em modelos
                generativos para criação, análise e processamento
                de informação.
              </p>
            </article>

            <article className="solution-service-card">
              <span>02</span>

              <h3>
                Machine Learning
              </h3>

              <p>
                Modelos de aprendizagem automática para identificar
                padrões, realizar previsões e apoiar decisões.
              </p>
            </article>

            <article className="solution-service-card">
              <span>03</span>

              <h3>
                Automação Inteligente
              </h3>

              <p>
                Automatização de tarefas e processos através da
                combinação de IA, dados e tecnologias de automação.
              </p>
            </article>

            <article className="solution-service-card">
              <span>04</span>

              <h3>
                Análise Inteligente
              </h3>

              <p>
                Utilização de Inteligência Artificial para analisar
                grandes volumes de informação e extrair conhecimento.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* PROCESSO */}
      <section className="solution-process">
        <div className="solution-container">

          <div className="solution-section-heading">
            <span className="section-label">
              Como trabalhamos
            </span>

            <h2>
              Da ideia à
              <br />
              solução.
            </h2>
          </div>

          <div className="solution-process-grid">

            <div>
              <span>01</span>
              <h3>Diagnóstico</h3>
              <p>
                Identificamos o desafio e analisamos os processos,
                dados e necessidades da organização.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Estratégia</h3>
              <p>
                Definimos a abordagem tecnológica e o modelo de
                Inteligência Artificial mais adequado.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Desenvolvimento</h3>
              <p>
                Desenvolvemos, testamos e validamos a solução
                de acordo com os objetivos definidos.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>Implementação</h3>
              <p>
                Colocamos a solução em produção e acompanhamos
                a sua evolução.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="solution-cta">
        <div className="solution-container">

          <span className="section-label">
            Vamos trabalhar juntos?
          </span>

          <h2>
            Transforme desafios
            <br />
            em soluções inteligentes.
          </h2>

          <Link
            href="/contactos"
            className="solution-primary-button"
          >
            Fale connosco
            <span>→</span>
          </Link>

        </div>
      </section>

    </main>
  );
}