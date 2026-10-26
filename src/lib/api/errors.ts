export interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  code?: string;
  message?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: { status: number; code: string; details?: unknown; cause?: unknown },
  ) {
    super(message, { cause: options.cause });
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function errorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export async function apiErrorFromResponse(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | null = null;

  try {
    const parsed: unknown = await response.json();
    body = isRecord(parsed) ? (parsed as ApiErrorBody) : null;
  } catch {
    // The response body is not JSON; use the status-based fallback below.
  }

  const errorPayload = isRecord(body?.error) ? body.error : undefined;
  const fallbackMessage =
    response.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : `Request failed with status ${response.status}.`;

  return new ApiError(
    readString(errorPayload?.message) ?? readString(body?.message) ?? fallbackMessage,
    {
      status: response.status,
      code: readString(errorPayload?.code) ?? readString(body?.code) ?? 'http_error',
      details: errorPayload?.details,
    },
  );
}
