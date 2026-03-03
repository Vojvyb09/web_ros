const JSON_HEADERS = { "Content-Type": "application/json" };

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const password = body?.password ?? "";
    const adminPassword = env.ADMIN_PASSWORD ?? "admin";
    if (!password) {
      return new Response(
        JSON.stringify({ success: false, message: "Heslo je povinné" }),
        { status: 400, headers: JSON_HEADERS }
      );
    }
    if (password === adminPassword) {
      return new Response(
        JSON.stringify({ success: true, token: "admin-token-xyz" }),
        { headers: JSON_HEADERS }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: "Nesprávné heslo" }),
      { status: 401, headers: JSON_HEADERS }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Chyba serveru" }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
