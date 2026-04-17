const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://elkcgeumvoyyzagziplw.supabase.co';

const hopByHopHeaders = new Set([
  'connection',
  'host',
  'content-length',
  'transfer-encoding',
  'keep-alive',
  'upgrade',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
]);

function buildTargetUrl(req) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = (req.query && req.query.path) || requestUrl.searchParams.get('path') || '';
  const target = new URL(SUPABASE_URL);
  target.pathname = `/${path}`;

  const query = new URLSearchParams(requestUrl.searchParams);
  query.delete('path');
  target.search = query.toString();
  return target.toString();
}

async function proxy(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'apikey, authorization, content-type, prefer, x-client-info, x-supabase-api-version');
    res.status(200).end();
    return;
  }

  const targetUrl = buildTargetUrl(req);
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!hopByHopHeaders.has(key.toLowerCase()) && value) {
      headers[key] = value;
    }
  }

  const method = req.method || 'GET';
  let body;
  if (!['GET', 'HEAD'].includes(method)) {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    body = Buffer.concat(chunks);
  }

  let response;
  try {
    response = await fetch(targetUrl, {
      method,
      headers,
      body,
      redirect: 'manual',
    });
  } catch (error) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
    res.end(JSON.stringify({
      error: 'Proxy request to Supabase failed',
      message: error instanceof Error ? error.message : String(error),
      targetUrl,
    }));
    return;
  }

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (!hopByHopHeaders.has(key.toLowerCase())) {
      res.setHeader(key, value);
    }
  });
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');

  const contentType = response.headers.get('content-type') || '';
  if (response.status >= 400 && contentType.includes('application/json')) {
    const text = await response.text();
    res.end(text);
    return;
  }

  const arrayBuffer = await response.arrayBuffer();
  res.end(Buffer.from(arrayBuffer));
}

module.exports = proxy;
module.exports.default = proxy;
