import Link from "next/link";

export default function DadosAnalyticsPage() {
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
                02 / 05
              </span>

              <h1>
                Dados &
                <br />
                Analytics
              </h1>

              <p>
                Transformamos dados em informação útil para apoiar
                decisões, otimizar processos e gerar novas
                oportunidades para as organizações.
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
                DATA
              </div>

              <span>
                Data & Analytics
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
              Dados que
              <br />
              geram decisões.
            </h2>

          </div>

          <div className="solution-section-description">

            <p>
              Os dados são um dos principais ativos de uma
              organização. Quando corretamente tratados e
              analisados, permitem compreender o negócio,
              identificar oportunidades e apoiar decisões
              mais informadas.
            </p>

            <p>
              Na OpsMind AI desenvolvemos soluções de dados
              que combinam engenharia, análise, visualização
              e Inteligência Artificial para transformar
              informação em conhecimento acionável.
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
                Data Analytics
              </h3>

              <p>
                Analisamos dados para identificar padrões,
                tendências e informações relevantes para
                apoiar decisões estratégicas.
              </p>

            </article>


            {/* 02 */}
            <article className="solution-service-card">

              <span>02</span>

              <h3>
                Business Intelligence
              </h3>

              <p>
                Desenvolvemos dashboards e soluções de
                Business Intelligence para transformar
                dados complexos em informação clara.
              </p>

            </article>


            {/* 03 */}
            <article className="solution-service-card">

              <span>03</span>

              <h3>
                Data Engineering
              </h3>

              <p>
                Estruturamos, integramos e preparamos dados
                para criar bases sólidas para análise,
                automação e Inteligência Artificial.
              </p>

            </article>


            {/* 04 */}
            <article className="solution-service-card">

              <span>04</span>

              <h3>
                Modelos Preditivos
              </h3>

              <p>
                Utilizamos modelos analíticos e de Machine
                Learning para identificar padrões e apoiar
                previsões baseadas em dados.
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
              Dos dados à
              <br />
              decisão.
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
                Analisamos as fontes de dados, os processos
                existentes e as necessidades da organização.
              </p>

            </div>


            {/* 02 */}
            <div>

              <span>02</span>

              <h3>
                Estruturação
              </h3>

              <p>
                Organizamos, integramos e preparamos os dados
                para garantir qualidade e consistência.
              </p>

            </div>


            {/* 03 */}
            <div>

              <span>03</span>

              <h3>
                Análise
              </h3>

              <p>
                Transformamos os dados em indicadores,
                modelos analíticos e informação relevante.
              </p>

            </div>


            {/* 04 */}
            <div>

              <span>04</span>

              <h3>
                Implementação
              </h3>

              <p>
                Disponibilizamos dashboards, modelos e
                soluções para apoiar as decisões do negócio.
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
            Transforme dados
            <br />
            em decisões inteligentes.
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