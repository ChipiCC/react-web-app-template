function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseApiBaseUrl(value: string | undefined): string {
  const raw = readEnv(value) ?? '/api';

  if (raw.startsWith('/')) {
    return raw.replace(/\/+$/, '');
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      `VITE_API_BASE_URL must be a relative path or an absolute URL. Received: ${raw}`,
    );
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`VITE_API_BASE_URL must use http: or https:. Received: ${raw}`);
  }

  return raw.replace(/\/+$/, '');
}

function parseBoolean(value: string | undefined, fallback: boolean, name: string): boolean {
  const raw = readEnv(value);

  if (raw === undefined) {
    return fallback;
  }
  if (raw === 'true') {
    return true;
  }
  if (raw === 'false') {
    return false;
  }

  throw new Error(`${name} must be "true" or "false". Received: ${raw}`);
}

const mockApiRequested = parseBoolean(import.meta.env.VITE_USE_MOCK_API, true, 'VITE_USE_MOCK_API');

export const appConfig = Object.freeze({
  name: 'Web App Template',
  apiBaseUrl: parseApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  useMockApi: import.meta.env.DEV && mockApiRequested,
});
