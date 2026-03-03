const DEFAULT_HOURS = JSON.stringify({
  monday: "7:30 - 15:30",
  tuesday: "7:30 - 15:30",
  wednesday: "7:30 - 15:30",
  thursday: "7:30 - 15:30",
  friday: "7:30 - 12:00",
  saturday: "Zavřeno",
  sunday: "Zavřeno",
  note: "* Polední pauza 12:00 - 12:30",
  acceptingPatients: true,
  closedOffice: false,
  closedReason: "",
  closedFrom: "",
  closedUntil: "",
  replacements: [],
  savedReplacementDoctors: [],
});

const JSON_HEADERS = { "Content-Type": "application/json" };

export async function onRequestGet(context) {
  try {
    const { env } = context;
    const data = env.HOURS_KV ? await env.HOURS_KV.get("hours") : null;
    const body = data ?? DEFAULT_HOURS;
    return new Response(body, { headers: JSON_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to read data" }), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { token, data } = body ?? {};
    if (!token || token !== "admin-token-xyz") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: JSON_HEADERS,
      });
    }
    if (!data) {
      return new Response(JSON.stringify({ error: "Data is required" }), {
        status: 400,
        headers: JSON_HEADERS,
      });
    }
    if (env.HOURS_KV) {
      await env.HOURS_KV.put("hours", JSON.stringify(data));
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: JSON_HEADERS,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to save data", details: String(err) }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
