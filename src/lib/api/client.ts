import { appConfig } from '@/app/config';

import { ApiError, apiErrorFromResponse } from './errors';

const DEFAULT_TIMEOUT_MS = 15_000;

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  /** JSON-serializable request body. Do not pass FormData here. */
  body?: unknown;
  timeoutMs?: number;
}

function resolveUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(`${appConfig.apiBaseUrl}${normalizedPath}`, window.location.origin).toString();
}

/**
 * The single HTTP gateway for the app. Feature modules should call typed
 * functions in their own api.ts, never fetch directly.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, timeoutMs = DEFAULT_TIMEOUT_MS, headers: inputHeaders, signal, ...init } = options;

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
  const headers = new Headers(inputHeaders);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;
  try {
    response = await fetch(resolveUrl(path), {
      ...init,
      signal: requestSignal,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ApiError('The request timed out. Please try again.', {
        status: 0,
        code: 'timeout',
        cause: error,
      });
    }
    throw new ApiError('Unable to reach the API. Check your connection and try again.', {
      status: 0,
      code: 'network_error',
      cause: error,
    });
  }

  if (!response.ok) {
    throw await apiErrorFromResponse(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw new ApiError('The API returned an invalid JSON response.', {
      status: response.status,
      code: 'invalid_response',
      cause: error,
    });
  }
}
