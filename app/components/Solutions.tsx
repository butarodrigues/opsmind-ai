export default function Solutions() {
    return (
      <section id="solucoes" className="solutions-section">
        <div className="solutions-container">
  
          {/* Cabeçalho da secção */}
          <div className="solutions-header">
            <span className="section-label">
              Soluções OpsMind
            </span>
  
            <h2>
              Tecnologia aplicada
              <br />
              a desafios reais.
            </h2>
  
            <p>
              Desenvolvemos soluções tecnológicas orientadas para resultados,
              combinando Inteligência Artificial, Dados, Cibersegurança,
              Compliance e Automação.
            </p>
          </div>
  
          {/* Cartões das soluções */}
          <div className="solutions-grid">
  
            {/* Inteligência Artificial */}
            <article className="solution-card">
              <div className="solution-icon">AI</div>
  
              <span className="solution-number">01</span>
  
              <h3>Inteligência Artificial</h3>
  
              <p>
                Criamos soluções de Inteligência Artificial para automatizar
                processos, analisar informação e apoiar decisões estratégicas.
              </p>
  
              <a href="#contactos" className="solution-link">
                Conhecer solução <span>→</span>
              </a>
            </article>
  
            {/* Dados */}
            <article className="solution-card">
              <div className="solution-icon">DATA</div>
  
              <span className="solution-number">02</span>
  
              <h3>Dados & Analytics</h3>
  
              <p>
                Transformamos dados em informação útil através de análise,
                visualização, Business Intelligence e modelos preditivos.
              </p>
  
              <a href="#contactos" className="solution-link">
                Conhecer solução <span>→</span>
              </a>
            </article>
  
            {/* Cibersegurança */}
            <article className="solution-card">
              <div className="solution-icon">SEC</div>
  
              <span className="solution-number">03</span>
  
              <h3>Cibersegurança</h3>
  
              <p>
                Protegemos sistemas, dados e operações através de estratégias
                de segurança, avaliação de riscos e monitorização.
              </p>
  
              <a href="#contactos" className="solution-link">
                Conhecer solução <span>→</span>
              </a>
            </article>
  
            {/* Compliance */}
            <article className="solution-card">
              <div className="solution-icon">CMP</div>
  
              <span className="solution-number">04</span>
  
              <h3>Compliance</h3>
  
              <p>
                Desenvolvemos soluções para gestão de conformidade, risco,
                controlos internos e apoio à tomada de decisão.
              </p>
  
              <a href="#contactos" className="solution-link">
                Conhecer solução <span>→</span>
              </a>
            </article>
  
            {/* Automação */}
            <article className="solution-card">
              <div className="solution-icon">AUTO</div>
  
              <span className="solution-number">05</span>
  
              <h3>Automação</h3>
  
              <p>
                Automatizamos tarefas e processos para reduzir operações
                manuais, aumentar eficiência e melhorar a produtividade.
              </p>
  
              <a href="#contactos" className="solution-link">
                Conhecer solução <span>→</span>
              </a>
            </article>
  
          </div>
  
        </div>
      </section>
    );
  }