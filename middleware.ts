import { NextResponse } from 'next/server';

export const config = {
  matcher: '/api/:path*',
};

const allowedOrigins = [
  'http://localhost:8081',
  'chrome-extension://ggfdeioihiohgoomdeghoeccgajbikgd',
  'https://example-2.com',
  'https://example-99.com',
];

export default function middleware(req: Request) {
  // Retrieve the current response
  const res = NextResponse.next();

  // Retrieve the HTTP "Origin" header from the incoming request
  const origin = req.headers.get('origin');

  // Handle Preflight Requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    // Add the necessary CORS headers for preflight requests
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT',
    );
    res.headers.append(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    ); // Add headers allowed in actual requests
    return res; // Respond to preflight request
  }

  // Check if the origin is not null
  if (origin !== null && allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin);
  }

  // Add the remaining CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT',
  );
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  );

  return res;
}
