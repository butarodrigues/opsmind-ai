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

async function criarAdmin() {
  console.log("");
  console.log("======================================");
  console.log("       OPSMIND AI - CRIAR ADMIN");
  console.log("======================================");
  console.log("");

  const name = await perguntar("Nome do administrador: ");
  const email = await perguntar("Email do administrador: ");
  const password = await perguntar("Password: ");

  if (!name.trim() || !email.trim() || !password.trim()) {
    console.log("");
    console.log("Erro: todos os campos são obrigatórios.");
    console.log("");

    rl.close();
    db.close();
    return;
  }

  const emailNormalizado = email.trim().toLowerCase();

  const adminExistente = db
    .prepare("SELECT id, email FROM Admin WHERE email = ?")
    .get(emailNormalizado);

  if (adminExistente) {
    console.log("");
    console.log(
      `Erro: já existe um administrador com o email ${emailNormalizado}.`
    );
    console.log("");

    rl.close();
    db.close();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const agora = new Date().toISOString();

  const resultado = db
    .prepare(`
      INSERT INTO Admin (
        name,
        email,
        passwordHash,
        role,
        status,
        lastLoginAt,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      name.trim(),
      emailNormalizado,
      passwordHash,
      "ADMIN",
      "ATIVO",
      null,
      agora,
      agora
    );

  console.log("");
  console.log("======================================");
  console.log("Administrador criado com sucesso!");
  console.log("======================================");
  console.log("");
  console.log(`ID: ${resultado.lastInsertRowid}`);
  console.log(`Nome: ${name.trim()}`);
  console.log(`Email: ${emailNormalizado}`);
  console.log("Role: ADMIN");
  console.log("Estado: ATIVO");
  console.log("");
  console.log("Pode agora utilizar estas credenciais no login.");
  console.log("");

  rl.close();
  db.close();
}

criarAdmin().catch((error) => {
  console.error("");
  console.error("Erro ao criar administrador:");
  console.error(error);
  console.error("");

  rl.close();
  db.close();
});