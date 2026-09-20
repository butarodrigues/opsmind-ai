const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const db = new Database("./dev.db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, resolve);
  });
}

async function redefinirAdmin() {
  console.log("");
  console.log("======================================");
  console.log("       OPSMIND AI - RESET ADMIN");
  console.log("======================================");
  console.log("");

  const id = await perguntar("ID do administrador: ");
  const email = await perguntar("Novo email: ");
  const password = await perguntar("Nova password: ");

  if (!id.trim() || !email.trim() || !password.trim()) {
    console.log("");
    console.log("Erro: todos os campos são obrigatórios.");
    console.log("");

    rl.close();
    db.close();
    return;
  }

  const admin = db
    .prepare(
      "SELECT id, name, email, status FROM Admin WHERE id = ?"
    )
    .get(Number(id));

  if (!admin) {
    console.log("");
    console.log("Erro: administrador não encontrado.");
    console.log("");

    rl.close();
    db.close();
    return;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const emailExistente = db
    .prepare(
      "SELECT id FROM Admin WHERE email = ? AND id != ?"
    )
    .get(emailNormalizado, Number(id));

  if (emailExistente) {
    console.log("");
    console.log("Erro: este email já pertence a outro administrador.");
    console.log("");

    rl.close();
    db.close();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  db.prepare(
    `
      UPDATE Admin
      SET email = ?,
          passwordHash = ?,
          updatedAt = ?
      WHERE id = ?
    `
  ).run(
    emailNormalizado,
    passwordHash,
    new Date().toISOString(),
    Number(id)
  );

  console.log("");
  console.log("======================================");
  console.log("Administrador atualizado!");
  console.log("======================================");
  console.log("");
  console.log(`ID: ${admin.id}`);
  console.log(`Nome: ${admin.name}`);
  console.log(`Email: ${emailNormalizado}`);
  console.log(`Estado: ${admin.status}`);
  console.log("");
  console.log("Email e password foram atualizados com sucesso.");
  console.log("");

  rl.close();
  db.close();
}

redefinirAdmin().catch((error) => {
  console.error("");
  console.error("Erro ao atualizar administrador:");
  console.error(error);
  console.error("");

  rl.close();
  db.close();
});