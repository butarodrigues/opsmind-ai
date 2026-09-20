import crypto from "crypto";
import { prisma } from "../../lib/prisma";

const SESSION_DURATION_HOURS = 8;

export async function createAdminSession(adminId: number) {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() +
      SESSION_DURATION_HOURS * 60 * 60 * 1000
  );

  const session = await prisma.adminSession.create({
    data: {
      token,
      adminId,
      expiresAt,
    },
  });

  return session;
}

export async function getAdminSession(token: string) {
  if (!token) {
    return null;
  }

  const session = await prisma.adminSession.findUnique({
    where: {
      token,
    },
    include: {
      admin: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  if (session.admin.status !== "ATIVO") {
    return null;
  }

  return session;
}

export async function deleteAdminSession(token: string) {
  if (!token) {
    return;
  }

  await prisma.adminSession.deleteMany({
    where: {
      token,
    },
  });
}