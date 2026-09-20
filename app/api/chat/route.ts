import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

import { getAdminSession } from "../../lib/admin-session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      visitorId,
      message,
      name,
      email,
      phone,
      company,
      subject,
      area,
    } = body;

    if (!visitorId) {
      return NextResponse.json(
        {
          error: "visitorId é obrigatório.",
        },
        {
          status: 400,
        }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        {
          error: "A mensagem é obrigatória.",
        },
        {
          status: 400,
        }
      );
    }

    let conversation =
      await prisma.chatConversation.findUnique({
        where: {
          visitorId,
        },
      });

    if (!conversation) {
      conversation =
        await prisma.chatConversation.create({
          data: {
            visitorId,
            name: name || null,
            email: email || null,
            phone: phone || null,
            company: company || null,
            subject: subject || null,
            area: area || null,
            status: "NOVA",
          },
        });
    } else {
      conversation =
        await prisma.chatConversation.update({
          where: {
            id: conversation.id,
          },
          data: {
            name: name || conversation.name,
            email: email || conversation.email,
            phone: phone || conversation.phone,
            company: company || conversation.company,
            subject: subject || conversation.subject,
            area: area || conversation.area,
          },
        });
    }

    const chatMessage =
      await prisma.chatMessage.create({
        data: {
          conversationId: conversation.id,
          senderType: "VISITOR",
          senderName: name || "Visitante",
          message: message.trim(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        conversationId: conversation.id,
        message: {
          id: chatMessage.id,
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
      "Erro na API do chat:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível processar a mensagem.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   GET — OBTER CONVERSA
   ========================================================= */

   export async function GET(request: NextRequest) {
    try {
      const visitorId = request.nextUrl.searchParams.get("visitorId");
  
      if (!visitorId) {
        return NextResponse.json(
          {
            error: "visitorId é obrigatório.",
          },
          {
            status: 400,
          }
        );
      }
  
      const conversation = await prisma.chatConversation.findUnique({
        where: {
          visitorId,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
            select: {
              id: true,
              senderType: true,
              senderName: true,
              message: true,
              createdAt: true,
            },
          },
        },
      });
  
      if (!conversation) {
        return NextResponse.json({
          success: true,
          conversation: null,
          messages: [],
        });
      }
  
      return NextResponse.json({
        success: true,
        conversation: {
          id: conversation.id,
          visitorId: conversation.visitorId,
          status: conversation.status,
        },
        messages: conversation.messages,
      });
    } catch (error) {
      console.error("Erro ao obter conversa:", error);
  
      return NextResponse.json(
        {
          error: "Não foi possível obter a conversa.",
        },
        {
          status: 500,
        }
      );
    }
  }