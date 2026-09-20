import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { getAdminSession } from "../../../lib/admin-session";

export async function POST(request: Request) {
  try {
    /*
     * =========================================
     * VERIFICAR SESSÃO DO ADMINISTRADOR
     * =========================================
     */

    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get("opsmind_admin")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      );
    }

    const session =
      await getAdminSession(sessionToken);

    if (!session) {
      return NextResponse.json(
        {
          error: "Sessão inválida ou expirada.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * =========================================
     * LER DADOS DO FORMULÁRIO
     * =========================================
     */

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const confirmPassword =
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    const role =
      typeof body.role === "string"
        ? body.role
        : "ADMIN";

    const status =
      typeof body.status === "string"
        ? body.status
        : "ATIVO";

    /*
     * =========================================
     * VALIDAR CAMPOS OBRIGATÓRIOS
     * =========================================
     */

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        {
          error:
            "Preencha todos os campos obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VALIDAR NOME
     * =========================================
     */

    if (name.length < 2) {
      return NextResponse.json(
        {
          error:
            "O nome deve ter pelo menos 2 caracteres.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VALIDAR EMAIL
     * =========================================
     */

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      return NextResponse.json(
        {
          error:
            "Introduza um endereço de email válido.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VALIDAR PALAVRA-PASSE
     * =========================================
     */

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "A palavra-passe deve ter pelo menos 8 caracteres.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * CONFIRMAR PALAVRA-PASSE
     * =========================================
     */

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          error:
            "As palavras-passe não coincidem.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VALIDAR FUNÇÃO
     * =========================================
     */

    const rolesPermitidas = [
      "ADMIN",
      "GESTOR",
    ];

    if (!rolesPermitidas.includes(role)) {
      return NextResponse.json(
        {
          error:
            "A função selecionada não é válida.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VALIDAR ESTADO
     * =========================================
     */

    const estadosPermitidos = [
      "ATIVO",
      "INATIVO",
    ];

    if (!estadosPermitidos.includes(status)) {
      return NextResponse.json(
        {
          error:
            "O estado selecionado não é válido.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================
     * VERIFICAR EMAIL DUPLICADO
     * =========================================
     */

    const administradorExistente =
      await prisma.admin.findUnique({
        where: {
          email,
        },
      });

    if (administradorExistente) {
      return NextResponse.json(
        {
          error:
            "Já existe um administrador com este email.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * =========================================
     * CRIAR HASH DA PALAVRA-PASSE
     * =========================================
     */

    const passwordHash =
      await bcrypt.hash(password, 12);

    /*
     * =========================================
     * CRIAR ADMINISTRADOR
     * =========================================
     */

    const administrador =
      await prisma.admin.create({
        data: {
          name,
          email,
          passwordHash,
          role,
          status,
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

    /*
     * =========================================
     * RESPOSTA
     * =========================================
     */

    return NextResponse.json(
      {
        success: true,
        message:
          "Administrador criado com sucesso.",
        administrator: administrador,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Erro ao criar administrador:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível criar o administrador.",
      },
      {
        status: 500,
      }
    );
  }
}