import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "../../../../../lib/prisma";
import { getAdminSession } from "../../../../lib/admin-session";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // =====================================
    // VALIDAR SESSÃO DO ADMINISTRADOR
    // =====================================

    const cookieStore = await cookies();

    const token = cookieStore.get("opsmind_admin")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Não autorizado.",
        },
        {
          status: 401,
        }
      );
    }

    const session = await getAdminSession(token);

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

    // =====================================
    // OBTER ID DA CONVERSA
    // =====================================

    const { id } = await context.params;

    const conversationId = Number(id);

    if (!Number.isInteger(conversationId)) {
      return NextResponse.json(
        {
          error: "ID da conversa inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================
    // LER MENSAGEM
    // =====================================

    const body = await request.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "A mensagem não pode estar vazia.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================
    // VERIFICAR CONVERSA
    // =====================================

    const conversation =
      await prisma.chatConversation.findUnique({
        where: {
          id: conversationId,
        },
      });

    if (!conversation) {
      return NextResponse.json(
        {
          error: "Conversa não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================
    // REGISTAR RESPOSTA DO ADMIN
    // =====================================

    const chatMessage =
      await prisma.chatMessage.create({
        data: {
          conversationId,
          senderType: "ADMIN",
          senderName: session.admin.name,
          message,
        },
      });

    // =====================================
    // ATUALIZAR ESTADO DA CONVERSA
    // =====================================

    await prisma.chatConversation.update({
      where: {
        id: conversationId,
      },
      data: {
        status: "EM_ATENDIMENTO",
        adminId: session.admin.id,
      },
    });

    // =====================================
    // RESPOSTA
    // =====================================

    return NextResponse.json(
      {
        success: true,
        message: {
          id: chatMessage.id,
          conversationId: chatMessage.conversationId,
          senderType: chatMessage.senderType,
          senderName: chatMessage.senderName,
          message: chatMessage.message,
          createdAt: chatMessage.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Erro ao responder à conversa:",
      error
    );

    return NextResponse.json(
      {
        error: "Não foi possível enviar a resposta.",
      },
      {
        status: 500,
      }
    );
  }
}
export async function PATCH(
    request: NextRequest,
    context: {
      params: Promise<{
        id: string;
      }>;
    }
  ) {
    try {
      const token = request.cookies.get("opsmind_admin")?.value;
  
      if (!token) {
        return NextResponse.json(
          {
            error: "Não autorizado.",
          },
          {
            status: 401,
          }
        );
      }
  
      const session = await getAdminSession(token);
  
      if (!session) {
        return NextResponse.json(
          {
            error: "Sessão administrativa inválida ou expirada.",
          },
          {
            status: 401,
          }
        );
      }
  
      const { id } = await context.params;
  
      const conversationId = Number(id);
  
      if (!Number.isInteger(conversationId)) {
        return NextResponse.json(
          {
            error: "ID da conversa inválido.",
          },
          {
            status: 400,
          }
        );
      }
  
      const body = await request.json();
  
      const { status } = body;
  
      const allowedStatuses = [
        "NOVA",
        "EM_ATENDIMENTO",
        "CONCLUIDA",
      ];
  
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: "Estado da conversa inválido.",
          },
          {
            status: 400,
          }
        );
      }
  
      const conversation =
        await prisma.chatConversation.findUnique({
          where: {
            id: conversationId,
          },
        });
  
      if (!conversation) {
        return NextResponse.json(
          {
            error: "Conversa não encontrada.",
          },
          {
            status: 404,
          }
        );
      }
  
      const updatedConversation =
        await prisma.chatConversation.update({
          where: {
            id: conversationId,
          },
          data: {
            status,
            adminId:
              status === "NOVA"
                ? conversation.adminId
                : session.admin.id,
          },
        });
  
      return NextResponse.json({
        success: true,
        conversation: updatedConversation,
      });
    } catch (error) {
      console.error(
        "Erro ao alterar estado da conversa:",
        error
      );
  
      return NextResponse.json(
        {
          error:
            "Não foi possível alterar o estado da conversa.",
        },
        {
          status: 500,
        }
      );
    }
  }