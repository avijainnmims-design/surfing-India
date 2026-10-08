# Vercel AI Gateway setup

The chat endpoint always requests **`openai/gpt-6-luna`**. The browser cannot choose or change the model. The Gateway key is read only by the server function in `api/chat.js` and is never placed in client code.

## Vercel

1. In the Vercel dashboard, open the Surf India project and go to **Settings → Environment Variables**.
2. Add `AI_GATEWAY_API_KEY` using a key created in Vercel AI Gateway. Keep the value private; do not paste it into chat or commit it to the repository.
3. Apply it to the environments you use. A new deployment is needed before the function can read a newly added environment variable.

## Local development

Copy `.env.example` to `.env.local` and set the private key. Run the project through Vercel’s local development environment so `/api/chat` is available; opening `index.html` as a `file://` page will not run the function.

The endpoint sends requests to `https://ai-gateway.vercel.sh/v1/chat/completions` using the OpenAI-compatible Chat Completions API. It has no fallback model and accepts only chat messages, never a model ID from the browser.

