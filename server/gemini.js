import { GoogleGenAI } from '@google/genai';

export const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash';
export const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL || 'gemini-embedding-001';

// Two supported auth modes:
//  1. Vertex AI (Google Cloud)  — service account / ADC. Set GOOGLE_GENAI_USE_VERTEXAI=true.
//  2. AI Studio                 — a single GEMINI_API_KEY string.
const USE_VERTEX =
  String(process.env.GOOGLE_GENAI_USE_VERTEXAI).toLowerCase() === 'true';

let client = null;

export function getAuthMode() {
  return USE_VERTEX ? 'vertex' : 'api_key';
}

export function isGeminiConfigured() {
  if (USE_VERTEX) {
    // Vertex needs a project + credentials. Credentials come from
    // GOOGLE_APPLICATION_CREDENTIALS (a service-account JSON path) or ambient ADC.
    return Boolean(process.env.GOOGLE_CLOUD_PROJECT);
  }
  return Boolean(process.env.GEMINI_API_KEY);
}

export function getAI() {
  if (!isGeminiConfigured()) {
    const err = new Error(
      USE_VERTEX
        ? 'Vertex AI is not configured. Set GOOGLE_CLOUD_PROJECT (and GOOGLE_CLOUD_LOCATION) in .env, then run: gcloud auth application-default login.'
        : 'GEMINI_API_KEY is not set. Create a key at https://aistudio.google.com/apikey and add it to .env.'
    );
    err.status = 503;
    throw err;
  }
  if (!client) {
    client = USE_VERTEX
      ? new GoogleGenAI({
          vertexai: true,
          project: process.env.GOOGLE_CLOUD_PROJECT,
          location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
          // Credentials are resolved by google-auth-library from
          // GOOGLE_APPLICATION_CREDENTIALS or Application Default Credentials.
        })
      : new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}
