import Link from "next/link";

export default function CompliancePage() {
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
                04 / 05
              </span>

              <h1>
                Compliance
              </h1>

              <p>
                Desenvolvemos soluções para fortalecer a
                conformidade, gerir riscos, melhorar controlos
                internos e apoiar organizações na tomada de
                decisões mais seguras.
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
                CMP
              </div>

              <span>
                Compliance
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
              Conformidade
              <br />
              que gera confiança.
            </h2>

          </div>

          <div className="solution-section-description">

            <p>
              A conformidade é fundamental para garantir que
              processos, operações e decisões estejam alinhados
              com requisitos internos e regulamentares.
            </p>

            <p>
              Na OpsMind AI combinamos tecnologia, dados e
              automação para ajudar organizações a estruturar
              processos de compliance, identificar riscos e
              reforçar os seus mecanismos de controlo.
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
                Gestão de Compliance
              </h3>

              <p>
                Estruturamos processos e mecanismos para
                apoiar a gestão de conformidade e acompanhar
                requisitos aplicáveis à organização.
              </p>

            </article>


            {/* 02 */}
            <article className="solution-service-card">

              <span>02</span>

              <h3>
                Gestão de Risco
              </h3>

              <p>
                Identificamos, avaliamos e acompanhamos riscos
                para apoiar uma abordagem mais estruturada
                à gestão e tomada de decisão.
              </p>

            </article>


            {/* 03 */}
            <article className="solution-service-card">

              <span>03</span>

              <h3>
                Controlos Internos
              </h3>

              <p>
                Apoiamos a definição e monitorização de
                controlos internos para melhorar processos,
                reduzir riscos e reforçar a governação.
              </p>

            </article>


            {/* 04 */}
            <article className="solution-service-card">

              <span>04</span>

              <h3>
                AML & KYC
              </h3>

              <p>
                Desenvolvemos soluções tecnológicas para
                apoiar processos de prevenção de fraude,
                análise de clientes e monitorização de
                operações.
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
              Do risco à
              <br />
              conformidade.
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
                Analisamos os processos, requisitos,
                controlos e principais riscos da organização.
              </p>

            </div>


            {/* 02 */}
            <div>

              <span>02</span>

              <h3>
                Avaliação
              </h3>

              <p>
                Identificamos riscos, lacunas e oportunidades
                de melhoria nos mecanismos existentes.
              </p>

            </div>


            {/* 03 */}
            <div>

              <span>03</span>

              <h3>
                Implementação
              </h3>

              <p>
                Definimos e implementamos processos,
                controlos e soluções tecnológicas adequadas.
              </p>

            </div>


            {/* 04 */}
            <div>

              <span>04</span>

              <h3>
                Monitorização
              </h3>

              <p>
                Acompanhamos indicadores, controlos e
                processos para promover uma melhoria contínua.
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
            Transforme compliance
            <br />
            em confiança.
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