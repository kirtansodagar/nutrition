const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
  images?: string[];
}

export async function chatCompletion(
  model: string,
  messages: OllamaMessage[],
  options?: {
    temperature?: number;
    num_ctx?: number;
  }
): Promise<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      options: {
        temperature: options?.temperature ?? 0.1,
        num_ctx: options?.num_ctx ?? 4096,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown");
    throw new Error(`Ollama API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  return data.message?.content ?? "";
}

export function parseJsonResponse<T>(raw: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      return JSON.parse(match[1]) as T;
    }
    throw new Error(`Failed to parse JSON from: ${raw}`);
  }
}
