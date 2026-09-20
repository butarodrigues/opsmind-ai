"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function NovoAdministradorPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );
    const role = String(formData.get("role") || "ADMIN");
    const status = String(formData.get("status") || "ATIVO");

    try {
      const response = await fetch("/api/admin/utilizadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Não foi possível criar o administrador."
        );
        return;
      }

      setSuccess("Administrador criado com sucesso.");

      form.reset();

      setTimeout(() => {
        window.location.href = "/admin/utilizadores";
      }, 1000);
    } catch (error) {
      console.error("Erro ao criar administrador:", error);

      setError(
        "Não foi possível criar o administrador. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        <Link
          href="/admin/utilizadores"
          className="admin-back"
        >
          ← Voltar para administradores
        </Link>

        <div className="admin-detail-header admin-new-user-header">
          <div>
            <span className="admin-eyebrow">
              OpsMind Admin
            </span>

            <h1>
              Novo administrador
            </h1>

            <p>
              Crie uma nova conta com acesso à área administrativa da OpsMind.
            </p>
          </div>
        </div>

        <section className="admin-form-card">

          <div className="admin-form-header">
            <span className="admin-eyebrow">
              Dados da conta
            </span>

            <h2>
              Criar administrador
            </h2>

            <p>
              Preencha os dados do novo utilizador administrativo.
            </p>
          </div>

          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-form-group">
              <label htmlFor="name">
                Nome completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ex.: João Manuel"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@opsmind.ai"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">
                Palavra-passe
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Introduza uma palavra-passe segura"
                minLength={8}
                required
              />

              <span className="admin-form-help">
                Utilize uma palavra-passe forte, com pelo menos 8 caracteres.
              </span>
            </div>

            <div className="admin-form-group">
              <label htmlFor="confirmPassword">
                Confirmar palavra-passe
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repita a palavra-passe"
                minLength={8}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="role">
                Função
              </label>

              <select
                id="role"
                name="role"
                defaultValue="ADMIN"
              >
                <option value="ADMIN">
                  Administrador
                </option>

                <option value="GESTOR">
                  Gestor
                </option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="status">
                Estado
              </label>

              <select
                id="status"
                name="status"
                defaultValue="ATIVO"
              >
                <option value="ATIVO">
                  Ativo
                </option>

                <option value="INATIVO">
                  Inativo
                </option>
              </select>
            </div>

            {error && (
              <div className="admin-form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="admin-form-success">
                {success}
              </div>
            )}

            <div className="admin-form-actions">

              <Link
                href="/admin/utilizadores"
                className="admin-form-cancel"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="admin-form-submit"
                disabled={loading}
              >
                {loading
                  ? "A criar..."
                  : "Criar administrador"}

                {!loading && <span>→</span>}
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}