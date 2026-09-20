import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { createAdminSession } from "../../../lib/admin-session";

export async function POST(request: Request) {
  try {
    // =====================================
    // LER DADOS DO LOGIN
    // =====================================

    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    // =====================================
    // VALIDAR CAMPOS
    // =====================================

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Introduza o email e a palavra-passe.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================
    // BUSCAR ADMINISTRADOR
    // =====================================

    const admin =
      await prisma.admin.findUnique({
        where: {
          email,
        },
      });

    if (!admin) {
      return NextResponse.json(
        {
          error: "Credenciais inválidas.",
        },
        {
          status: 401,
        }
      );
    }

    // =====================================
    // VERIFICAR ESTADO DA CONTA
    // =====================================

    if (admin.status !== "ATIVO") {
      return NextResponse.json(
        {
          error:
            "Esta conta de administrador está inativa.",
        },
        {
          status: 403,
        }
      );
    }

    // =====================================
    // VALIDAR PALAVRA-PASSE
    // =====================================

    const passwordValida =
      await bcrypt.compare(
        password,
        admin.passwordHash
      );

    if (!passwordValida) {
      return NextResponse.json(
        {
          error: "Credenciais inválidas.",
        },
        {
          status: 401,
        }
      );
    }

    // =====================================
    // CRIAR SESSÃO REAL
    // =====================================

    const session =
      await createAdminSession(admin.id);

    // =====================================
    // ATUALIZAR ÚLTIMO ACESSO
    // =====================================

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    // =====================================
    // GUARDAR TOKEN NO COOKIE
    // =====================================

    const cookieStore = await cookies();

    cookieStore.set(
      "opsmind_admin",
      session.token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    // =====================================
    // RESPOSTA
    // =====================================

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Erro no login:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível iniciar sessão.",
      },
      {
        status: 500,
      }
    );
  }
}