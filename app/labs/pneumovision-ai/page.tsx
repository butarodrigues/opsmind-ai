import Header from "../../components/Header";

export default function PneumoVisionPage() {
  return (
    <>
      <Header />

      <main className="lab-project-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="lab-project-hero">
          <div className="lab-project-container">

            <div className="lab-project-hero-content">

              <a
                href="/labs"
                className="lab-project-back"
              >
                ← Voltar para Labs
              </a>

              <div className="lab-project-meta">
                <span>AI</span>
                <span>Protótipo</span>
              </div>

              <span className="lab-project-eyebrow">
                OpsMind Labs
              </span>

              <h1>
                PneumoVision
                <span>AI</span>
              </h1>

              <p className="lab-project-intro">
                Exploração de Inteligência Artificial e visão
                computacional aplicada à análise de imagens
                médicas.
              </p>

              <div className="lab-project-hero-actions">
                <a
                  href="#resultados"
                  className="lab-project-button primary"
                >
                  Ver protótipo
                  <span>→</span>
                </a>

                <a
                  href="#projeto"
                  className="lab-project-button secondary"
                >
                  Saber mais
                </a>
              </div>

            </div>


            {/* =================================================
                VISUAL DO PROJETO
            ================================================= */}

            <div className="lab-project-hero-visual">

              <div className="pneumo-analysis-card">

                <div className="pneumo-image-area">

                  <div className="pneumo-xray">
                    <div className="pneumo-lung left"></div>
                    <div className="pneumo-lung right"></div>
                    <div className="pneumo-spine"></div>

                    <div className="pneumo-detection-box">
                      <span>AI</span>
                    </div>
                  </div>

                </div>


                <div className="pneumo-analysis-panel">

                  <div className="pneumo-analysis-header">
                    <strong>
                      Análise com IA
                    </strong>

                    <span>
                      ● Área de interesse
                    </span>
                  </div>


                  <div className="pneumo-mini-image">
                    <div className="pneumo-mini-lung"></div>
                  </div>


                  <div className="pneumo-probability">

                    <div>
                      <span>
                        Probabilidade
                      </span>

                      <strong>
                        87%
                      </strong>
                    </div>

                    <div className="pneumo-progress">
                      <span></span>
                    </div>

                  </div>


                  <div className="pneumo-result">
                    <strong>
                      Resultado experimental
                    </strong>

                    <span>
                      Apoio à análise, não substitui
                      diagnóstico médico.
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            O PROJETO
        ===================================================== */}

        <section
          id="projeto"
          className="lab-project-overview"
        >
          <div className="lab-project-container">

            <div className="lab-project-overview-grid">

              <div>
                <span className="lab-project-section-label">
                  O projeto
                </span>

                <h2>
                  Inteligência Artificial aplicada
                  à visão computacional.
                </h2>
              </div>

              <div>

                <p>
                  O PneumoVision AI é uma iniciativa
                  experimental do OpsMind Labs dedicada à
                  exploração de técnicas de Inteligência
                  Artificial e visão computacional para
                  análise de imagens médicas.
                </p>

                <p>
                  O objetivo é investigar como modelos
                  computacionais podem apoiar processos
                  de análise de imagem e contribuir para
                  novas ferramentas de apoio à decisão.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            PROBLEMA
        ===================================================== */}

        <section className="lab-project-section">

          <div className="lab-project-container">

            <div className="lab-project-two-column">

              <div>

                <span className="lab-project-section-label">
                  01 — Problema
                </span>

                <h2>
                  Explorar novas formas
                  de analisar imagens.
                </h2>

              </div>

              <div>

                <p>
                  A análise de imagens médicas envolve
                  grandes quantidades de informação visual
                  e pode beneficiar de ferramentas capazes
                  de processar padrões de forma sistemática.
                </p>

                <p>
                  O projeto investiga o potencial da visão
                  computacional como ferramenta complementar
                  para este tipo de análise.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            OBJETIVO
        ===================================================== */}

        <section className="lab-project-section lab-project-light">

          <div className="lab-project-container">

            <div className="lab-project-two-column">

              <div>

                <span className="lab-project-section-label">
                  02 — Objetivo
                </span>

                <h2>
                  Construir e testar
                  um protótipo.
                </h2>

              </div>

              <div>

                <p>
                  Desenvolver um protótipo experimental capaz
                  de explorar modelos de visão computacional
                  aplicados a imagens médicas.
                </p>


                <div className="lab-project-objectives">

                  <div>
                    <span>01</span>

                    <strong>
                      Explorar modelos de IA
                    </strong>
                  </div>

                  <div>
                    <span>02</span>

                    <strong>
                      Processar imagens
                    </strong>
                  </div>

                  <div>
                    <span>03</span>

                    <strong>
                      Avaliar resultados
                    </strong>
                  </div>

                  <div>
                    <span>04</span>

                    <strong>
                      Validar o conceito
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TECNOLOGIA
        ===================================================== */}

        <section className="lab-project-section">

          <div className="lab-project-container">

            <div className="lab-project-section-header">

              <span className="lab-project-section-label">
                03 — Tecnologia
              </span>

              <h2>
                Tecnologias em experimentação.
              </h2>

              <p>
                O projeto combina diferentes componentes
                tecnológicos para investigar uma solução
                de visão computacional.
              </p>

            </div>


            <div className="lab-project-tech-grid">

              <div className="lab-project-tech-card">

                <span>01</span>

                <h3>
                  Computer Vision
                </h3>

                <p>
                  Processamento e análise de informação
                  visual através de modelos computacionais.
                </p>

              </div>


              <div className="lab-project-tech-card">

                <span>02</span>

                <h3>
                  Machine Learning
                </h3>

                <p>
                  Exploração de modelos capazes de
                  identificar padrões nos dados.
                </p>

              </div>


              <div className="lab-project-tech-card">

                <span>03</span>

                <h3>
                  Image Analysis
                </h3>

                <p>
                  Técnicas de processamento e interpretação
                  de imagens.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            RESULTADOS / PROTÓTIPO
        ===================================================== */}

        <section
          id="resultados"
          className="lab-project-results"
        >

          <div className="lab-project-container">

            <div className="lab-project-results-header">

              <div>

                <span className="lab-project-section-label">
                  Resultados em exploração
                </span>

                <h2>
                  Exemplos do protótipo.
                </h2>

                <p>
                  Visualizações experimentais utilizadas
                  durante o desenvolvimento do PneumoVision AI.
                </p>

              </div>

            </div>


            <div className="lab-project-results-grid">

              <div className="lab-result-card">

                <div className="lab-result-visual">
                  <div className="result-xray">
                    <div className="result-lung left"></div>
                    <div className="result-lung right"></div>
                    <div className="result-spine"></div>
                  </div>
                </div>

                <span>
                  Imagem original
                </span>

              </div>


              <div className="lab-result-card">

                <div className="lab-result-visual result-ai">

                  <div className="result-xray">
                    <div className="result-lung left"></div>
                    <div className="result-lung right"></div>
                    <div className="result-spine"></div>

                    <div className="result-heatmap"></div>
                  </div>

                </div>

                <span>
                  Análise experimental com IA
                </span>

              </div>


              <div className="lab-result-card">

                <div className="lab-result-visual">

                  <div className="result-region">

                    <span>
                      REGIÃO DE INTERESSE
                    </span>

                    <div></div>

                  </div>

                </div>

                <span>
                  Região de interesse
                </span>

              </div>


              <div className="lab-result-card">

                <div className="lab-result-terminal">

                  <span>
                    &gt; Inference: complete
                  </span>

                  <span>
                    &gt; Model: experimental
                  </span>

                  <span>
                    &gt; Processing time: 1.2s
                  </span>

                  <span>
                    &gt; Status: success
                  </span>

                </div>

                <span>
                  Processo de análise
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            ESTADO ATUAL
        ===================================================== */}

        <section className="lab-project-status">

          <div className="lab-project-container">

            <div className="lab-project-status-grid">

              <div>

                <span className="lab-project-section-label">
                  Estado atual
                </span>

                <h2>
                  Protótipo em desenvolvimento.
                </h2>

                <p>
                  O PneumoVision AI encontra-se numa fase
                  experimental de investigação e desenvolvimento.
                </p>

              </div>


              <div className="lab-project-status-card">

                <span>
                  STATUS
                </span>

                <strong>
                  Protótipo
                </strong>

                <div className="lab-project-status-line">
                  <span></span>
                </div>

                <small>
                  Investigação & Desenvolvimento
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA FINAL
        ===================================================== */}

        <section className="lab-project-cta">

          <div className="lab-project-container">

            <span className="lab-project-section-label">
              OpsMind Labs
            </span>

            <h2>
              Explorar novas possibilidades
              através da tecnologia.
            </h2>

            <a
              href="/labs"
              className="lab-project-cta-button"
            >
              Voltar aos projetos
              <span>→</span>
            </a>

          </div>

        </section>

      </main>
    </>
  );
}