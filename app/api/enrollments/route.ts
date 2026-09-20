import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      profession,
      company,
      message,
      area,
      course,
    } = body;

    if (!name || !email || !phone || !area || !course) {
      return NextResponse.json(
        {
          error: "Preencha todos os campos obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        name,
        email,
        phone,
        profession: profession || null,
        company: company || null,
        message: message || null,
        area,
        course,
      },
    });

    return NextResponse.json(
      {
        success: true,
        enrollment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Erro ao criar inscrição:", error);

    return NextResponse.json(
      {
        error: "Não foi possível registar a inscrição.",
      },
      {
        status: 500,
      }
    );
  }
}