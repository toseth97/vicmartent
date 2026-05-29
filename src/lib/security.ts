import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Rate limiting store (in-memory, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const {
    maxRequests = parseInt(process.env.RATE_LIMIT_MAX || "100"),
    windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  } = options;

  return async function rateLimitMiddleware(
    req: NextRequest
  ): Promise<NextResponse | null> {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return null; // Continue
    }

    if (record.count >= maxRequests) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((record.resetTime - now) / 1000)),
            "X-RateLimit-Limit": String(maxRequests),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(record.resetTime),
          },
        }
      );
    }

    record.count++;
    return null; // Continue
  };
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Sanitize object recursively
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T
): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(
        sanitized[key] as string
      );
    } else if (
      typeof sanitized[key] === "object" &&
      sanitized[key] !== null &&
      !Array.isArray(sanitized[key])
    ) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(
        sanitized[key] as Record<string, unknown>
      );
    } else if (Array.isArray(sanitized[key])) {
      (sanitized as Record<string, unknown>)[key] = (
        sanitized[key] as unknown[]
      ).map((item) =>
        typeof item === "string"
          ? sanitizeInput(item)
          : typeof item === "object" && item !== null
          ? sanitizeObject(item as Record<string, unknown>)
          : item
      );
    }
  }
  return sanitized;
}

// Validate MongoDB ObjectId
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Security headers for responses
export function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; media-src 'self' https://www.youtube.com https://youtube.com; frame-src https://www.youtube.com https://youtube.com; connect-src 'self'"
  );
  return response;
}

// Check if user is authenticated admin
export async function requireAuth() {
  const session = await getServerSession();
  if (!session?.user) {
    return null;
  }
  return session;
}
