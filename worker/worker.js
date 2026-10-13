/**
 * Cloudflare Worker - Groq API Proxy
 *
 * This worker proxies requests to Groq API server-side
 * The API key is stored securely in Cloudflare environment variables
 * Browser never sees the API key
 *
 * Deployed manually via the Cloudflare dashboard (groq-api-proxy).
 * Keep this file in sync with what's deployed.
 */

// Must be a model your Groq project has access to: https://console.groq.com/docs/models
const MODEL = 'openai/gpt-oss-120b';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight (must come before the POST-only check,
    // otherwise browsers get a 405 and block the real request)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    try {
      // Parse the incoming request from the portfolio
      const body = await request.json();
      const { messages } = body;

      if (!messages) {
        return new Response(JSON.stringify({ error: 'Missing messages' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }

      // Forward to Groq API with the secret API key
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      // Return the response with CORS headers
      return new Response(groqResponse.body, {
        status: groqResponse.status,
        headers: {
          'Content-Type': groqResponse.ok ? 'text/event-stream' : 'application/json',
          'Cache-Control': 'no-cache',
          ...CORS_HEADERS,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }
  },
};
