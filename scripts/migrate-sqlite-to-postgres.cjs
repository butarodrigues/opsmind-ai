require("dotenv/config");

const path = require("path");
const Database = require("better-sqlite3");
const { Pool } = require("pg");

const sqlitePath = path.join(process.cwd(), "dev.db");

const sqlite = new Database(sqlitePath, {
  readonly: true,
});

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
});

function getRows(table) {
  return sqlite.prepare(`SELECT * FROM "${table}"`).all();
}

async function main() {
  if (!process.env.DIRECT_URL) {
    throw new Error("DIRECT_URL não está configurada.");
  }

  if (!process.env.DATABASE_URL_SQLITE) {
    throw new Error("DATABASE_URL_SQLITE não está configurada.");
  }

  console.log("========================================");
  console.log(" MIGRAÇÃO SQLITE → POSTGRESQL");
  console.log("========================================");
  console.log("");

  console.log("SQLite:", sqlitePath);
  console.log("PostgreSQL: conexão Direct configurada");
  console.log("");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    /*
     * IMPORTANTE:
     * As tabelas PostgreSQL foram criadas pelo Prisma.
     * A ordem abaixo respeita as relações entre elas.
     */

    const admins = getRows("Admin");
    const courses = getRows("Course");
    const enrollments = getRows("Enrollment");
    const enrollmentHistory = getRows("EnrollmentHistory");
    const conversations = getRows("ChatConversation");
    const messages = getRows("ChatMessage");

    console.log("Registos encontrados no SQLite:");
    console.log(`Admin: ${admins.length}`);
    console.log(`Course: ${courses.length}`);
    console.log(`Enrollment: ${enrollments.length}`);
    console.log(`EnrollmentHistory: ${enrollmentHistory.length}`);
    console.log(`ChatConversation: ${conversations.length}`);
    console.log(`ChatMessage: ${messages.length}`);
    console.log("");

    /*
     * ADMIN
     */

    for (const row of admins) {
      await client.query(
        `
        INSERT INTO "Admin"
        (
          "id",
          "name",
          "email",
          "passwordHash",
          "role",
          "status",
          "lastLoginAt",
          "createdAt",
          "updatedAt"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          row.id,
          row.name,
          row.email,
          row.passwordHash,
          row.role,
          row.status,
          row.lastLoginAt,
          row.createdAt,
          row.updatedAt,
        ]
      );
    }

    /*
     * COURSE
     */

    for (const row of courses) {
      await client.query(
        `
        INSERT INTO "Course"
        (
          "id",
          "title",
          "slug",
          "description",
          "area",
          "level",
          "duration",
          "modality",
          "price",
          "vacancies",
          "status",
          "image",
          "content",
          "createdAt",
          "updatedAt"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        `,
        [
          row.id,
          row.title,
          row.slug,
          row.description,
          row.area,
          row.level,
          row.duration,
          row.modality,
          row.price,
          row.vacancies,
          row.status,
          row.image,
          row.content,
          row.createdAt,
          row.updatedAt,
        ]
      );
    }

    /*
     * ENROLLMENTS
     */

    for (const row of enrollments) {
      await client.query(
        `
        INSERT INTO "Enrollment"
        (
          "id",
          "name",
          "email",
          "phone",
          "profession",
          "company",
          "message",
          "area",
          "course",
          "createdAt",
          "status",
          "notes"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        `,
        [
          row.id,
          row.name,
          row.email,
          row.phone,
          row.profession,
          row.company,
          row.message,
          row.area,
          row.course,
          row.createdAt,
          row.status,
          row.notes,
        ]
      );
    }

    /*
     * ENROLLMENT HISTORY
     */

    for (const row of enrollmentHistory) {
      await client.query(
        `
        INSERT INTO "EnrollmentHistory"
        (
          "id",
          "enrollmentId",
          "oldStatus",
          "newStatus",
          "createdAt"
        )
        VALUES ($1,$2,$3,$4,$5)
        `,
        [
          row.id,
          row.enrollmentId,
          row.oldStatus,
          row.newStatus,
          row.createdAt,
        ]
      );
    }

    /*
     * CHAT CONVERSATIONS
     */

    for (const row of conversations) {
      await client.query(
        `
        INSERT INTO "ChatConversation"
        (
          "id",
          "visitorId",
          "name",
          "email",
          "phone",
          "company",
          "subject",
          "area",
          "status",
          "adminId",
          "createdAt",
          "updatedAt"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        `,
        [
          row.id,
          row.visitorId,
          row.name,
          row.email,
          row.phone,
          row.company,
          row.subject,
          row.area,
          row.status,
          row.adminId,
          row.createdAt,
          row.updatedAt,
        ]
      );
    }

    /*
     * CHAT MESSAGES
     */

    for (const row of messages) {
      await client.query(
        `
        INSERT INTO "ChatMessage"
        (
          "id",
          "conversationId",
          "senderType",
          "senderName",
          "message",
          "readByAdmin",
          "createdAt"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `,
        [
          row.id,
          row.conversationId,
          row.senderType,
          row.senderName,
          row.message,
          row.readByAdmin,
          row.createdAt,
        ]
      );
    }

    /*
     * Atualizar sequences dos IDs.
     */

    const tables = [
      "Admin",
      "Course",
      "Enrollment",
      "EnrollmentHistory",
      "ChatConversation",
      "ChatMessage",
    ];

    for (const table of tables) {
      await client.query(`
        SELECT setval(
          pg_get_serial_sequence('"${table}"', 'id'),
          COALESCE((SELECT MAX("id") FROM "${table}"), 1),
          true
        );
      `);
    }

    await client.query("COMMIT");

    console.log("");
    console.log("========================================");
    console.log(" MIGRAÇÃO CONCLUÍDA");
    console.log("========================================");
    console.log("");
    console.log("Dados migrados com sucesso.");
    console.log("");
    console.log("Admin:", admins.length);
    console.log("Course:", courses.length);
    console.log("Enrollment:", enrollments.length);
    console.log("EnrollmentHistory:", enrollmentHistory.length);
    console.log("ChatConversation:", conversations.length);
    console.log("ChatMessage:", messages.length);
    console.log("");
    console.log("AdminSession NÃO foi migrado.");
    console.log("Os administradores terão de iniciar sessão novamente.");
    console.log("");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("");
    console.error("========================================");
    console.error(" ERRO NA MIGRAÇÃO");
    console.error("========================================");
    console.error("");
    console.error(error);
    console.error("");
    console.error("ROLLBACK executado. Nenhum dado desta migração foi confirmado.");
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
    sqlite.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});