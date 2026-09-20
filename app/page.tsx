import Header from "./components/Header";
import Solutions from "./components/Solutions";
import About from "./components/About";
import Academy from "./components/Academy";

export default function Home() {
  return (
    <>
      {/* ========================================
          HEADER
      ======================================== */}

      <Header />

      <main>

        {/* ========================================
            HERO
        ======================================== */}

        <section className="hero">
          <div className="hero-container">

            {/* Coluna esquerda */}

            <div className="hero-content">

              <span className="hero-eyebrow">
                Inteligência. Tecnologia. Transformação.
              </span>

              <h1>
                Inteligência que
                <span> transforma operações.</span>
              </h1>

              <p>
                Desenvolvemos soluções em Inteligência Artificial,
                Dados, Cibersegurança, Compliance e Automação para
                transformar desafios complexos em resultados concretos.
              </p>

              <div className="hero-actions">

                <a
                  href="#solucoes"
                  className="hero-button primary"
                >
                  Explorar soluções
                  <span>→</span>
                </a>

                <a
                  href="#contactos"
                  className="hero-button secondary"
                >
                  Falar com a OpsMind
                </a>

              </div>

            </div>


            {/* Coluna direita */}

            <div className="hero-visual">

              <div className="hero-orbit orbit-one"></div>

              <div className="hero-orbit orbit-two"></div>

              <div className="hero-core">

                <div className="hero-core-inner">
                  AI
                </div>

              </div>

              <div className="hero-card card-one">
                <strong>AI</strong>
                <span>Inteligência Artificial</span>
              </div>

              <div className="hero-card card-two">
                <strong>DATA</strong>
                <span>Dados & Analytics</span>
              </div>

              <div className="hero-card card-three">
                <strong>SEC</strong>
                <span>Cibersegurança</span>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================
            INDICADOR
        ======================================== */}

        <div className="hero-scroll">
          <span></span>
          Explore a OpsMind
        </div>


        {/* ========================================
            SOLUÇÕES
        ======================================== */}

        <Solutions />


        {/* ========================================
            SOBRE A OPSMIND
        ======================================== */}

        <About />


        {/* ========================================
            ACADEMY
        ======================================== */}

        <Academy />

      </main>
    </>
  );
}