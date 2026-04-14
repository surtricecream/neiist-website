import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (!cookieLocale || !locales.includes(cookieLocale)) {
    const acceptLanguage = request.headers.get("accept-language");
    let bestLocale = defaultLocale;

    if (acceptLanguage) {
      const parsedLocales = acceptLanguage
        .split(",")
        .map((l) => {
          const [locale, q] = l.split(";q=");
          return { locale: locale.trim().split("-")[0], q: q ? parseFloat(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

      const match = parsedLocales.find((l) => locales.includes(l.locale));
      if (match) {
        bestLocale = match.locale;
      }
    }

    const response = NextResponse.next();
    response.cookies.set("locale", bestLocale, { path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
