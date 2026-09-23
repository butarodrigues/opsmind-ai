import Link from "next/link";

export default function AutomacaoPage() {
  return (
    <main className="solution-page">

      {/* HERO */}
      <section className="solution-hero">
        <div className="solution-container">

          <Link
            href="/#solucoes"
            className="solution-back"
          >
            ← Voltar às soluções
          </Link>

          <span className="section-label">
            Soluções OpsMind
          </span>

          <div className="solution-hero-content">

            <div>
              <span className="solution-page-number">
                05 / 05
              </span>

              <h1>
                Automação
              </h1>

              <p>
                Automatizamos tarefas e processos para reduzir
                operações manuais, aumentar a eficiência e
                melhorar a produtividade das organizações.
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
                AUTO
              </div>

              <span>
                Intelligent Automation
              </span>

            </div>

          </div>
        </div>
      </section>


      {/* INTRODUÇÃO */}
      <section
        className="solution-intro"
        id="servicos"
      >
        <div className="solution-container">

          <div className="solution-section-heading">

            <span className="section-label">
              O que fazemos
            </span>

            <h2>
              Processos mais
              <br />
              simples e eficientes.
            </h2>

          </div>

          <div className="solution-section-description">

            <p>
              A automação permite reduzir tarefas repetitivas,
              eliminar operações manuais e tornar os processos
              mais rápidos, consistentes e eficientes.
            </p>

            <p>
              Na OpsMind AI combinamos automação, dados,
              Inteligência Artificial e integração de sistemas
              para criar soluções adaptadas aos processos de
              cada organização.
            </p>

          </div>

        </div>
      </section>


      {/* SERVIÇOS */}
      <section className="solution-services">

        <div className="solution-container">

          <div className="solution-services-grid">

            {/* 01 */}
            <article className="solution-service-card">

              <span>01</span>

              <h3>
                Automação de Processos
              </h3>

              <p>
                Automatizamos tarefas e fluxos de trabalho
                repetitivos para reduzir operações manuais
                e aumentar a eficiência.
              </p>

            </article>


            {/* 02 */}
            <article className="solution-service-card">

              <span>02</span>

              <h3>
                RPA
              </h3>

              <p>
                Utilizamos automação robótica de processos
                para executar tarefas estruturadas de forma
                rápida, consistente e controlada.
              </p>

            </article>


            {/* 03 */}
            <article className="solution-service-card">

              <span>03</span>

              <h3>
                Integração de Sistemas
              </h3>

              <p>
                Ligamos aplicações, sistemas e fontes de dados
                para melhorar o fluxo de informação e reduzir
                operações duplicadas.
              </p>

            </article>


            {/* 04 */}
            <article className="solution-service-card">

              <span>04</span>

              <h3>
                Workflows Inteligentes
              </h3>

              <p>
                Criamos workflows inteligentes combinando
                automação, dados e Inteligência Artificial
                para apoiar processos mais eficientes.
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
              Do processo à
              <br />
              automação.
            </h2>

          </div>


          <div className="solution-process-grid">

            {/* 01 */}
            <div>

              <span>01</span>

              <h3>
                Diagnóstico
              </h3>

              <p>
                Identificamos tarefas, processos e operações
                que podem beneficiar de automação.
              </p>

            </div>


            {/* 02 */}
            <div>

              <span>02</span>

              <h3>
                Estratégia
              </h3>

              <p>
                Definimos a abordagem tecnológica e
                selecionamos os processos prioritários.
              </p>

            </div>


            {/* 03 */}
            <div>

              <span>03</span>

              <h3>
                Automação
              </h3>

              <p>
                Desenvolvemos e implementamos os fluxos
                automatizados de acordo com os objetivos.
              </p>

            </div>


            {/* 04 */}
            <div>

              <span>04</span>

              <h3>
                Monitorização
              </h3>

              <p>
                Acompanhamos os processos automatizados e
                identificamos oportunidades de melhoria.
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
            Automatize processos.
            <br />
            Aumente a eficiência.
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