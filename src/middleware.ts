import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const headers = new Headers(req.headers)
  const searchParam = queryParams.get('search');
  const pageParam = queryParams.get('page');
  const checkedParam = queryParams.get('checked');
  const themeParam = queryParams.get('theme');
  if (searchParam) headers.set('search', searchParam);
  if (pageParam) headers.set('page', pageParam);
  if (checkedParam) headers.set('checked', checkedParam);
  if (themeParam) headers.set('theme', themeParam);
  
  const res = NextResponse.next({
    request: {
      headers
    }
  });
  

  return res;
}
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}