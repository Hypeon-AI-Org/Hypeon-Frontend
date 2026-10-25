import type { ContentPart } from './openrouter';

/*
 * Claude on Amazon Bedrock, paid from the AWS account's credits. Uses a
 * Bedrock API key (AWS_BEARER_TOKEN_BEDROCK, created in Bedrock → API keys)
 * against the Converse API with plain fetch, so no AWS SDK is needed.
 *
 * Converse has no JSON-schema response mode, so a structured reply is forced
 * by offering one tool whose input schema is the reply schema and requiring
 * the model to call it.
 */

export function isBedrockConfigured(): boolean {
  return Boolean(process.env.AWS_BEARER_TOKEN_BEDROCK?.trim() && process.env.BEDROCK_MODEL_ID?.trim());
}

type ConverseBlock =
  | { text: string }
  | { image: { format: 'jpeg' | 'png' | 'webp'; source: { bytes: string } } };

type ConverseResponse = {
  output?: { message?: { content?: { text?: string; toolUse?: { name?: string; input?: unknown } }[] } };
  message?: string;
};

/** OpenRouter-style content parts → Converse blocks (data: URLs become raw base64 image bytes). */
function toBlocks(parts: ContentPart[]): ConverseBlock[] {
  return parts.map((p) => {
    if (p.type === 'text') return { text: p.text };
    const m = p.image_url.url.match(/^data:image\/(jpeg|png|webp);base64,(.+)$/);
    if (!m) throw new Error('Bedrock images must be base64 data URLs');
    return { image: { format: m[1] as 'jpeg' | 'png' | 'webp', source: { bytes: m[2] } } };
  });
}

/** Asks Claude on Bedrock for a reply matching `schema`; returns the parsed object. */
export async function bedrockStructured(
  content: ContentPart[],
  schema: { name: string; schema: Record<string, unknown> },
  opts: { maxTokens?: number; timeoutMs?: number } = {}
): Promise<unknown> {
  const token = process.env.AWS_BEARER_TOKEN_BEDROCK?.trim();
  const modelId = process.env.BEDROCK_MODEL_ID?.trim();
  const region = process.env.AWS_REGION?.trim() || 'us-east-1';
  if (!token || !modelId) throw new Error('Bedrock is not configured');

  const res = await fetch(`https://bedrock-runtime.${region}.amazonaws.com/model/${encodeURIComponent(modelId)}/converse`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: toBlocks(content) }],
      // No temperature: Claude Haiku 5.5 on Bedrock rejects it as deprecated. The fixed grade definitions keep scores steady.
      inferenceConfig: { maxTokens: opts.maxTokens ?? 1500 },
      toolConfig: {
        tools: [{ toolSpec: { name: schema.name, description: 'Submit the review.', inputSchema: { json: schema.schema } } }],
        toolChoice: { tool: { name: schema.name } },
      },
    }),
    signal: AbortSignal.timeout(opts.timeoutMs ?? 25_000),
  });
  const data = (await res.json().catch(() => ({}))) as ConverseResponse;
  if (!res.ok) throw new Error(`Bedrock ${modelId} ${res.status}: ${data.message ?? 'request failed'}`);

  const call = data.output?.message?.content?.find((c) => c.toolUse?.name === schema.name)?.toolUse;
  if (!call?.input) throw new Error('Bedrock reply had no structured review');
  return call.input;
}
