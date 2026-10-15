# Vercel AI Gateway setup

The chat endpoint always requests **`openai/gpt-6-luna`**. The browser cannot choose or change the model. Authentication uses Vercel OIDC when available; a Gateway key is a server-side fallback only and is never placed in client code.

## Vercel production

The function prefers Vercel's short-lived OIDC token (`x-vercel-oidc-token`, with `VERCEL_OIDC_TOKEN` as a fallback). This is the recommended production authentication method because it avoids storing a long-lived Gateway key in project settings.

1. In the Vercel dashboard, open the Surf India project and go to **Settings → Security**.
2. Find **Secure backend access with OIDC federation** and enable it for the project if it is off.
3. Once the code is deployed, Vercel supplies the OIDC token to the function at runtime.

For local development outside `vercel dev`, `AI_GATEWAY_API_KEY` remains a supported fallback. Store it only in `.env.local`, never in browser code, GitHub, or chat. Revoke any key that has been shared.

## Local development

Copy `.env.example` to `.env.local` and set the private key. Run the project through Vercel’s local development environment so `/api/chat` is available; opening `index.html` as a `file://` page will not run the function.

The endpoint sends requests to `https://ai-gateway.vercel.sh/v1/chat/completions` using the OpenAI-compatible Chat Completions API. It has no fallback model and accepts only chat messages, never a model ID from the browser. On upstream errors, Vercel function logs record the status plus the Gateway's error type and a short message, without logging credentials.

