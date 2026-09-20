import Link from "next/link";
import Header from "../../components/Header";

export default function FraudShieldAIPage() {
  return (
    <>
      <Header />

      <main className="fraudshield-page">

        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="fraudshield-hero">
          <div className="fraudshield-container">
            <div className="fraudshield-hero-content">

              <Link
                href="/projetos"
                className="fraudshield-back"
              >
                ← Voltar para projetos
              </Link>

              <span className="fraudshield-eyebrow">
                Inteligência Artificial · FinTech
              </span>

              <h1>
                FraudShield
                <span>AI</span>
              </h1>

              <p className="fraudshield-hero-description">
                Inteligência Artificial para deteção de anomalias
                e identificação de padrões suspeitos em transações
                financeiras.
              </p>

              <div className="fraudshield-hero-actions">
                <a
                  href="#visao-geral"
                  className="fraudshield-primary-button"
                >
                  Explorar projeto
                  <span>↓</span>
                </a>

                <span className="fraudshield-status">
                  Em desenvolvimento
                </span>
              </div>
            </div>

            <div className="fraudshield-hero-visual">

              <div className="fraudshield-orbit orbit-one"></div>
              <div className="fraudshield-orbit orbit-two"></div>
              <div className="fraudshield-orbit orbit-three"></div>

              <div className="fraudshield-core">
                <span>AI</span>
                <strong>FRAUD</strong>
              </div>

              <div className="fraudshield-floating-card card-one">
                <strong>DATA</strong>
                <span>Transações</span>
              </div>

              <div className="fraudshield-floating-card card-two">
                <strong>ML</strong>
                <span>Anomalias</span>
              </div>

              <div className="fraudshield-floating-card card-three">
                <strong>RISK</strong>
                <span>Análise</span>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            01 — VISÃO GERAL
            ===================================================== */}

        <section
          id="visao-geral"
          className="fraudshield-section fraudshield-overview"
        >
          <div className="fraudshield-container">

            <div className="fraudshield-section-grid">

              <div>
                <span className="fraudshield-eyebrow">
                  01 — Visão geral
                </span>

                <h2>
                  Detetar padrões.
                  <br />
                  Identificar anomalias.
                </h2>
              </div>

              <div className="fraudshield-section-text">
                <p>
                  O FraudShield AI é um projeto de investigação e
                  desenvolvimento focado na aplicação de Inteligência
                  Artificial e Machine Learning à análise de
                  transações financeiras.
                </p>

                <p>
                  O objetivo é explorar modelos capazes de identificar
                  comportamentos anómalos e padrões que possam indicar
                  situações potencialmente suspeitas.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            02 — O PROBLEMA
            ===================================================== */}

        <section className="fraudshield-section fraudshield-problem">
          <div className="fraudshield-container">

            <div className="fraudshield-section-grid">

              <div>
                <span className="fraudshield-eyebrow">
                  02 — O problema
                </span>

                <h2>
                  Milhões de
                  <br />
                  transações.
                </h2>
              </div>

              <div className="fraudshield-problem-content">

                <p className="fraudshield-lead">
                  Grandes volumes de transações financeiras tornam
                  difícil analisar manualmente todos os
                  comportamentos e identificar padrões anómalos.
                </p>

                <div className="fraudshield-points">

                  <div className="fraudshield-point">
                    <span>01</span>

                    <div>
                      <strong>Volume de dados</strong>

                      <p>
                        Grandes quantidades de transações precisam
                        de ser processadas e analisadas.
                      </p>
                    </div>
                  </div>

                  <div className="fraudshield-point">
                    <span>02</span>

                    <div>
                      <strong>Comportamentos anómalos</strong>

                      <p>
                        Alguns padrões podem diferir
                        significativamente do comportamento esperado.
                      </p>
                    </div>
                  </div>

                  <div className="fraudshield-point">
                    <span>03</span>

                    <div>
                      <strong>Assimetria dos dados</strong>

                      <p>
                        Eventos fraudulentos representam uma
                        pequena parte do total de transações.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            03 — A SOLUÇÃO
            ===================================================== */}

        <section className="fraudshield-section fraudshield-solution">
          <div className="fraudshield-container">

            <div className="fraudshield-section-grid">

              <div>
                <span className="fraudshield-eyebrow">
                  03 — A solução
                </span>

                <h2>
                  Inteligência
                  <br />
                  orientada por dados.
                </h2>
              </div>

              <div className="fraudshield-section-text">

                <p>
                  O FraudShield AI utiliza técnicas de Machine
                  Learning para analisar transações e procurar
                  comportamentos que se afastem dos padrões
                  observados.
                </p>

                <p>
                  A abordagem permite explorar a deteção de
                  anomalias como mecanismo complementar para
                  apoiar processos de prevenção e análise de fraude.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            04 — COMO FUNCIONA
            ===================================================== */}

        <section className="fraudshield-process">
          <div className="fraudshield-container">

            <div className="fraudshield-process-header">

              <span className="fraudshield-eyebrow">
                04 — Processo
              </span>

              <h2>
                Dos dados à
                <br />
                deteção.
              </h2>

              <p>
                O projeto segue um processo de preparação,
                análise e modelação dos dados.
              </p>

            </div>

            <div className="fraudshield-process-grid">

              <div className="fraudshield-process-card">
                <span>01</span>

                <strong>Transações</strong>

                <p>
                  Recolha e análise dos dados das transações
                  financeiras.
                </p>
              </div>

              <div className="fraudshield-process-card">
                <span>02</span>

                <strong>Preparação</strong>

                <p>
                  Limpeza, transformação e preparação dos dados
                  para análise.
                </p>
              </div>

              <div className="fraudshield-process-card">
                <span>03</span>

                <strong>Feature Engineering</strong>

                <p>
                  Criação e transformação de variáveis relevantes
                  para a modelação.
                </p>
              </div>

              <div className="fraudshield-process-card">
                <span>04</span>

                <strong>Machine Learning</strong>

                <p>
                  Aplicação de modelos para identificação de
                  comportamentos anómalos.
                </p>
              </div>

              <div className="fraudshield-process-card">
                <span>05</span>

                <strong>Análise</strong>

                <p>
                  Avaliação dos resultados e identificação de
                  padrões potencialmente suspeitos.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            05 — TECNOLOGIAS
            ===================================================== */}

        <section className="fraudshield-section fraudshield-technologies">
          <div className="fraudshield-container">

            <div className="fraudshield-section-grid">

              <div>
                <span className="fraudshield-eyebrow">
                  05 — Tecnologias
                </span>

                <h2>
                  Tecnologia
                  <br />
                  aplicada ao risco.
                </h2>
              </div>

              <div className="fraudshield-tech-grid">

                <div>
                  <span>01</span>
                  <strong>Python</strong>
                </div>

                <div>
                  <span>02</span>
                  <strong>Machine Learning</strong>
                </div>

                <div>
                  <span>03</span>
                  <strong>FastAPI</strong>
                </div>

                <div>
                  <span>04</span>
                  <strong>React</strong>
                </div>

                <div>
                  <span>05</span>
                  <strong>PostgreSQL</strong>
                </div>

                <div>
                  <span>06</span>
                  <strong>Power BI</strong>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            06 — ESTADO ATUAL
            ===================================================== */}

        <section className="fraudshield-current">
          <div className="fraudshield-container">

            <div className="fraudshield-current-grid">

              <div>
                <span className="fraudshield-eyebrow">
                  06 — Estado atual
                </span>

                <h2>
                  Em desenvolvimento.
                </h2>

                <p>
                  O FraudShield AI encontra-se em desenvolvimento,
                  com investigação, experimentação de modelos e
                  construção progressiva da solução.
                </p>
              </div>

              <div className="fraudshield-current-card">

                <span>STATUS</span>

                <strong>
                  Investigação &
                  <br />
                  Desenvolvimento
                </strong>

                <div className="fraudshield-progress">
                  <span></span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            07 — PRÓXIMOS PASSOS
            ===================================================== */}

        <section className="fraudshield-section fraudshield-next">
          <div className="fraudshield-container">

            <span className="fraudshield-eyebrow">
              07 — Próximos passos
            </span>

            <h2>
              Continuar a investigar.
              <br />
              Continuar a construir.
            </h2>

            <div className="fraudshield-next-grid">

              <div>
                <span>01</span>
                <strong>Experimentar modelos</strong>
                <p>
                  Avaliar diferentes técnicas de deteção de
                  anomalias.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Avaliar resultados</strong>
                <p>
                  Comparar resultados através de métricas adequadas
                  ao problema.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Desenvolver a plataforma</strong>
                <p>
                  Evoluir o protótipo e integrar os diferentes
                  componentes tecnológicos.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            CTA
            ===================================================== */}

        <section className="fraudshield-cta">
          <div className="fraudshield-container">

            <span className="fraudshield-eyebrow">
              OpsMind Labs
            </span>

            <h2>
              Explorar novas possibilidades
              <br />
              através da tecnologia.
            </h2>

            <div className="fraudshield-cta-actions">

              <Link
                href="/labs"
                className="fraudshield-primary-button"
              >
                Explorar Labs
                <span>→</span>
              </Link>

              <Link
                href="/projetos"
                className="fraudshield-secondary-button"
              >
                Ver projetos
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}