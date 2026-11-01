function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i % (x.length || 1)] || 0) ^ (y[i % (y.length || 1)] || 0);
  return diff === 0;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/unlock') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
      let code = '';
      try {
        const body = await request.json();
        code = String((body && body.code) || '').trim().toUpperCase();
      } catch (e) {
        return json({ ok: false, error: 'bad_request' }, 400);
      }
      if (!code || code.length > 128) return json({ ok: false });
      const codes = String(env.UNLOCK_CODES || '')
        .split(',').map((c) => c.trim().toUpperCase()).filter(Boolean);
      let ok = false;
      for (const c of codes) { if (safeEqual(code, c)) ok = true; }
      if (!ok && String(env.UNLOCK_ALLOW_EB_PREFIX || '').toLowerCase() === 'true') {
        ok = code.startsWith('EB-') && code.length >= 7;
      }
      return json({ ok });
    }
    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'not_found' }, 404);
    return env.ASSETS.fetch(request);
  },
};
