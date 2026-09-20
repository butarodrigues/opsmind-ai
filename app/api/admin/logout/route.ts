import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteAdminSession } from "../../../lib/admin-session";

async function logout(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("opsmind_admin")?.value;

    /*
     * Se existir uma sessão, remove-a da base de dados.
     */
    if (sessionToken) {
      await deleteAdminSession(sessionToken);
    }

    /*
     * Redireciona para o login usando o endereço
     * da própria requisição.
     *
     * Assim não ficamos dependentes de
     * http://localhost:3000.
     */
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    /*
     * Remove o cookie da sessão do navegador.
     */
    response.cookies.delete("opsmind_admin");

    return response;
  } catch (error) {
    console.error(
      "Erro no logout:",
      error
    );

    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    /*
     * Mesmo que exista um erro na BD,
     * removemos o cookie local.
     */
    response.cookies.delete("opsmind_admin");

    return response;
  }
}

/*
 * Permite logout através de um formulário
 * ou de uma requisição POST.
 */
export async function POST(request: Request) {
  return logout(request);
}

/*
 * Permite também abrir diretamente:
 *
 * /api/admin/logout
 *
 * no navegador.
 */
export async function GET(request: Request) {
  return logout(request);
}