import { verifyAccessToken } from '@/lib/firebase-service';

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore[ip];

  if (!record) {
    rateLimitStore[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }

  if (now > record.resetTime) {
    rateLimitStore[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return Response.json(
        { valid: false, error: 'Token parameter is required' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return Response.json(
        { valid: false, error: 'Too many verification attempts. Try again later.' },
        { status: 429 }
      );
    }

    // Verify token
    const result = await verifyAccessToken(token);

    if (!result.valid) {
      return Response.json(
        { valid: false, error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    // Return success with subscriber data (no accessToken returned)
    return Response.json({
      valid: true,
      subscriber: result.subscriber,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return Response.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
