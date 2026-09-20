import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function ContactosPage() {
  return (
    <>
      <Header />

      <main className="contact-page">

        {/* =========================================================
            HERO
            ========================================================= */}

        <section className="contact-hero">
          <div className="contact-container">

            <div className="contact-hero-content">

              <span className="contact-eyebrow">
                Fale connosco
              </span>

              <h1>
                Vamos transformar
                <span> ideias em impacto.</span>
              </h1>

              <p>
                Tem um desafio tecnológico, um projeto em desenvolvimento
                ou uma ideia que gostaria de explorar? Fale com a OpsMind AI.
              </p>

            </div>

            <div className="contact-hero-meta">

              <div>
                <span>01</span>
                <strong>Estratégia</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Tecnologia</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Inovação</strong>
              </div>

            </div>

          </div>
        </section>


        {/* =========================================================
            CONTACTO + FORMULÁRIO
            ========================================================= */}

        <section className="contact-main">

          <div className="contact-container contact-grid">

            {/* INFORMAÇÃO */}

            <div className="contact-info">

              <span className="contact-section-label">
                Contactos
              </span>

              <h2>
                Conte-nos o que
                <span> está a construir.</span>
              </h2>

              <p>
                A nossa equipa está disponível para compreender o seu
                desafio e explorar consigo possíveis soluções em
                Inteligência Artificial, Dados, Software, Cibersegurança,
                Compliance e Automação.
              </p>


              <div className="contact-details">

                <div className="contact-detail">

                  <span className="contact-detail-number">
                    01
                  </span>

                  <div>
                    <small>Email</small>

                    <strong>
                      geral@opsmind.ai
                    </strong>
                  </div>

                </div>


                <div className="contact-detail">

                  <span className="contact-detail-number">
                    02
                  </span>

                  <div>
                    <small>Localização</small>

                    <strong>
                      Angola, Luanda, Av. Pedro de Castro Van-Dúnem Loy.
                    </strong>
                  </div>

                </div>


                <div className="contact-detail">

                  <span className="contact-detail-number">
                    03
                  </span>

                  <div>
                    <small>Contactos</small>

                    <strong>
                      +351 912 345 678
                    </strong>
                  </div>

                </div>


                <div className="contact-detail">

                  <span className="contact-detail-number">
                    04
                  </span>

                  <div>
                    <small>Área de atuação</small>

                    <strong>
                      Tecnologia &amp; Inovação
                    </strong>
                  </div>

                </div>

              </div>

            </div>


            {/* FORMULÁRIO */}

            <div className="contact-form-card">

              <div className="contact-form-header">

                <span>
                  ENVIE UMA MENSAGEM
                </span>

                <h3>
                  Fale com a OpsMind
                </h3>

                <p>
                  Preencha o formulário e entraremos em contacto.
                </p>

              </div>


              <form className="contact-form">

                <div className="contact-form-row">

                  <label>
                    Nome

                    <input
                      type="text"
                      name="name"
                      placeholder="O seu nome"
                    />
                  </label>


                  <label>
                    Empresa

                    <input
                      type="text"
                      name="company"
                      placeholder="Nome da empresa"
                    />
                  </label>

                </div>


                <div className="contact-form-row">

                  <label>
                    Email

                    <input
                      type="email"
                      name="email"
                      placeholder="nome@empresa.com"
                    />
                  </label>


                  <label>
                    Telefone

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+351 000 000 000"
                    />
                  </label>

                </div>


                <label>
                  Assunto

                  <select name="subject">

                    <option value="">
                      Selecione uma opção
                    </option>

                    <option value="ia">
                      Inteligência Artificial
                    </option>

                    <option value="dados">
                      Dados &amp; Analytics
                    </option>

                    <option value="software">
                      Software &amp; Desenvolvimento
                    </option>

                    <option value="ciberseguranca">
                      Cibersegurança
                    </option>

                    <option value="compliance">
                      Compliance
                    </option>

                    <option value="automacao">
                      Automação
                    </option>

                    <option value="outro">
                      Outro
                    </option>

                  </select>

                </label>


                <label>
                  Mensagem

                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Conte-nos brevemente sobre o seu desafio..."
                  />

                </label>


                <button
                  type="submit"
                  className="contact-submit"
                >
                  Enviar mensagem
                  <span>→</span>
                </button>

              </form>

            </div>

          </div>

        </section>


        {/* =========================================================
            CTA FINAL
            ========================================================= */}

        <section className="contact-cta">

          <div className="contact-container">

            <div className="contact-cta-content">

              <span className="contact-section-label">
                OPSMIND AI
              </span>

              <h2>
                Tem um problema.
                <br />
                Vamos construir
                <span> a solução.</span>
              </h2>

              <p>
                Transformamos desafios complexos em soluções tecnológicas
                concretas.
              </p>

            </div>


            <div className="contact-cta-mark">
              AI
            </div>

          </div>

        </section>

      </main>


      {/* =========================================================
          CHAT OPSMIND
          ========================================================= */}

      <ChatWidget />

    </>
  );
}