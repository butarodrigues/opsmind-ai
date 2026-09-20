"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Header from "../../../../components/Header";

export default function InscricaoPage() {
  const params = useParams();

  const area = params.area as string;
  const curso = params.curso as string;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      profession: formData.get("profession"),
      company: formData.get("company"),
      message: formData.get("message"),
      area,
      course: curso,
    };

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Não foi possível enviar a inscrição."
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);

      setError(
        "Não foi possível enviar a inscrição. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />

        <main className="enrollment-success-page">
          <section className="enrollment-success">
            <div className="enrollment-success-container">
              <span className="enrollment-eyebrow">
                Academia OpsMind
              </span>

              <div className="success-icon">
                ✓
              </div>

              <h1>
                Inscrição recebida.
              </h1>

              <p>
                Obrigado pelo seu interesse nesta formação.
                Recebemos os seus dados e a equipa OpsMind
                entrará em contacto consigo brevemente.
              </p>

              <div className="success-actions">
                <Link
                  href="/academy"
                  className="success-button primary"
                >
                  Voltar para a Academy
                  <span>→</span>
                </Link>

                <Link
                  href="/"
                  className="success-button secondary"
                >
                  Ir para o início
                </Link>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="enrollment-page">
        <section className="enrollment-header">
          <div className="enrollment-container">
            <Link
              href={`/academy/${area}/${curso}`}
              className="enrollment-back"
            >
              ← Voltar para o curso
            </Link>

            <span className="enrollment-eyebrow">
              Academia OpsMind
            </span>

            <h1>
              Faça a sua inscrição.
            </h1>

            <p>
              Preencha os seus dados para manifestar interesse
              nesta formação.
            </p>
          </div>
        </section>

        <section className="enrollment-form-section">
          <div className="enrollment-container">
            <div className="enrollment-form-header">
              <span>
                Inscrição
              </span>

              <h2>
                Dados do participante
              </h2>

              <p>
                Introduza os seus dados para podermos entrar
                em contacto consigo relativamente à formação.
              </p>
            </div>

            <form
              className="enrollment-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">
                  Nome completo
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Introduza o seu nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Telefone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+244 000 000 000"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profession">
                  Profissão
                </label>

                <input
                  id="profession"
                  name="profession"
                  type="text"
                  placeholder="Ex.: Analista de Dados"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="company">
                  Empresa / Organização
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Nome da empresa ou organização"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="message">
                  Informação adicional
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Indique alguma informação que considere relevante."
                />
              </div>

              {error && (
                <div className="enrollment-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="enrollment-submit"
                disabled={loading}
              >
                {loading
                  ? "A enviar..."
                  : "Enviar inscrição"}

                {!loading && <span>→</span>}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}