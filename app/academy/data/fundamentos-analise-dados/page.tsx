import Link from "next/link";

export default function FundamentosAnaliseDadosPage() {
  return (
    <main className="course-page">

      {/* ========================================
          VOLTAR
      ======================================== */}

      <div className="course-container">

        <Link href="/academy/data" className="course-back">
          ← Voltar para Dados & Analytics
        </Link>


        {/* ========================================
            CABEÇALHO DO CURSO
        ======================================== */}

        <section className="course-header">

          <span className="course-eyebrow">
            Academia OpsMind
          </span>

          <h1>
            Fundamentos de Análise de
            <span> Dados.</span>
          </h1>

          <p className="course-description">
            Aprenda os principais conceitos de análise de dados,
            interpretação de informação e utilização de dados
            para apoiar decisões.
          </p>

          <div className="course-actions">

            <Link
              href="#inscricao"
              className="course-button primary"
            >
              Inscrever-me neste curso →
            </Link>

          </div>

        </section>


        {/* ========================================
            INFORMAÇÕES DO CURSO
        ======================================== */}

        <section className="course-info">

          <div className="course-info-item">
            <span>Nível</span>
            <strong>Iniciante</strong>
          </div>

          <div className="course-info-item">
            <span>Carga horária</span>
            <strong>20 horas</strong>
          </div>

          <div className="course-info-item">
            <span>Modalidade</span>
            <strong>Online | Presencial</strong>
          </div>

          <div className="course-info-item">
            <span>Área</span>
            <strong>Dados & Analytics</strong>
          </div>

        </section>


        {/* ========================================
            SOBRE O CURSO
        ======================================== */}

        <section className="course-section">

          <span className="section-label">
            Sobre o curso
          </span>

          <h2>
            Desenvolva uma base sólida
            <span> em análise de dados.</span>
          </h2>

          <p>
            Este curso foi desenvolvido para profissionais e
            estudantes que pretendem compreender os fundamentos
            da análise de dados e aprender a transformar
            informação em conhecimento útil para a tomada
            de decisão.
          </p>

        </section>


        {/* ========================================
            OBJETIVOS
        ======================================== */}

        <section className="course-section">

          <span className="section-label">
            Objetivos
          </span>

          <h2>
            O que vai aprender
          </h2>

          <div className="course-grid">

            <div className="course-card">
              <span>01</span>
              <h3>Compreender os dados</h3>
              <p>
                Compreender os principais conceitos relacionados
                com dados e informação.
              </p>
            </div>

            <div className="course-card">
              <span>02</span>
              <h3>Analisar informação</h3>
              <p>
                Aprender conceitos fundamentais de análise
                e interpretação de dados.
              </p>
            </div>

            <div className="course-card">
              <span>03</span>
              <h3>Identificar padrões</h3>
              <p>
                Desenvolver capacidade para identificar padrões,
                tendências e relações nos dados.
              </p>
            </div>

            <div className="course-card">
              <span>04</span>
              <h3>Apoiar decisões</h3>
              <p>
                Utilizar informação analisada para apoiar
                processos de decisão.
              </p>
            </div>

          </div>

        </section>


        {/* ========================================
            CONTEÚDO PROGRAMÁTICO
        ======================================== */}

        <section className="course-section">

          <span className="section-label">
            Conteúdo programático
          </span>

          <h2>
            Programa do curso
          </h2>

          <div className="program-list">

            <div className="program-item">
              <span>01</span>
              <div>
                <h3>Introdução à análise de dados</h3>
                <p>
                  Conceitos fundamentais, tipos de dados
                  e ciclo de análise.
                </p>
              </div>
            </div>

            <div className="program-item">
              <span>02</span>
              <div>
                <h3>Preparação e organização de dados</h3>
                <p>
                  Organização, limpeza e preparação
                  dos dados para análise.
                </p>
              </div>
            </div>

            <div className="program-item">
              <span>03</span>
              <div>
                <h3>Análise exploratória</h3>
                <p>
                  Exploração dos dados, identificação
                  de padrões e tendências.
                </p>
              </div>
            </div>

            <div className="program-item">
              <span>04</span>
              <div>
                <h3>Visualização de dados</h3>
                <p>
                  Princípios de visualização e apresentação
                  de informação.
                </p>
              </div>
            </div>

            <div className="program-item">
              <span>05</span>
              <div>
                <h3>Interpretação de resultados</h3>
                <p>
                  Como transformar resultados analíticos
                  em informação útil.
                </p>
              </div>
            </div>

            <div className="program-item">
              <span>06</span>
              <div>
                <h3>Dados para tomada de decisão</h3>
                <p>
                  Utilização de informação para apoiar
                  decisões profissionais e organizacionais.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* ========================================
            PARA QUEM É
        ======================================== */}

        <section className="course-section">

          <span className="section-label">
            Público-alvo
          </span>

          <h2>
            Para quem é este curso?
          </h2>

          <div className="audience-list">

            <p>✓ Estudantes que pretendem entrar na área de dados.</p>

            <p>✓ Profissionais que trabalham com informação.</p>

            <p>✓ Profissionais que pretendem desenvolver competências analíticas.</p>

            <p>✓ Organizações que pretendem capacitar as suas equipas.</p>

          </div>

        </section>


        {/* ========================================
            INSCRIÇÃO
        ======================================== */}

        <section id="inscricao" className="course-enrollment">

          <div>

            <span className="section-label">
              Inscrição
            </span>

            <h2>
              Pronto para começar?
            </h2>

            <p>
              Faça a sua inscrição e dê o próximo passo
              no desenvolvimento das suas competências.
            </p>

          </div>

          <Link
            href="/academy/data/fundamentos-analise-dados/inscricao"
            className="course-button primary"
          >
            Inscrever-me →
          </Link>

        </section>

      </div>

    </main>
  );
}