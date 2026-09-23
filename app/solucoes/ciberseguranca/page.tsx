import Link from "next/link";

export default function CibersegurancaPage() {
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
                03 / 05
              </span>

              <h1>
                Cibersegurança
              </h1>

              <p>
                Protegemos sistemas, dados e operações através
                de estratégias de segurança, avaliação de riscos,
                monitorização e resposta a incidentes.
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
                SEC
              </div>

              <span>
                Cybersecurity
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
              Segurança para
              <br />
              desafios reais.
            </h2>

          </div>

          <div className="solution-section-description">

            <p>
              A segurança digital é essencial para proteger
              sistemas, dados, aplicações e operações contra
              ameaças cada vez mais sofisticadas.
            </p>

            <p>
              Na OpsMind AI ajudamos organizações a identificar
              riscos, reforçar a segurança dos seus ambientes
              tecnológicos e melhorar a capacidade de deteção
              e resposta a incidentes.
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
                Segurança de Redes
              </h3>

              <p>
                Avaliamos e reforçamos a segurança das redes,
                sistemas e infraestruturas tecnológicas da
                organização.
              </p>

            </article>


            {/* 02 */}
            <article className="solution-service-card">

              <span>02</span>

              <h3>
                Monitorização & SOC
              </h3>

              <p>
                Monitorizamos eventos e atividades para
                identificar comportamentos suspeitos e
                potenciais incidentes de segurança.
              </p>

            </article>


            {/* 03 */}
            <article className="solution-service-card">

              <span>03</span>

              <h3>
                Gestão de Vulnerabilidades
              </h3>

              <p>
                Identificamos vulnerabilidades e riscos
                tecnológicos para apoiar a implementação
                de medidas de segurança.
              </p>

            </article>


            {/* 04 */}
            <article className="solution-service-card">

              <span>04</span>

              <h3>
                Pentesting & Segurança
              </h3>

              <p>
                Avaliamos aplicações, sistemas e ambientes
                tecnológicos através de testes de segurança
                controlados e autorizados.
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
              Da avaliação à
              <br />
              proteção.
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
                Avaliamos o ambiente tecnológico, os ativos,
                processos e principais riscos de segurança.
              </p>

            </div>


            {/* 02 */}
            <div>

              <span>02</span>

              <h3>
                Avaliação
              </h3>

              <p>
                Identificamos vulnerabilidades, ameaças e
                possíveis pontos de exposição.
              </p>

            </div>


            {/* 03 */}
            <div>

              <span>03</span>

              <h3>
                Proteção
              </h3>

              <p>
                Definimos e implementamos medidas para
                reduzir os riscos identificados.
              </p>

            </div>


            {/* 04 */}
            <div>

              <span>04</span>

              <h3>
                Monitorização
              </h3>

              <p>
                Acompanhamos o ambiente e apoiamos a evolução
                contínua da postura de segurança.
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
            Proteja os seus
            <br />
            ativos digitais.
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