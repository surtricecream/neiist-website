"use client";

import { useRouter } from "next/navigation";
import { locales, Locale } from "@/lib/i18n-config";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    // Update the cookie (1 year expiry)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    // Refresh the router to fetch the new Server Components translating
    router.refresh();
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLanguage(e.target.value as Locale)}
      style={{
        background: "transparent",
        color: "var(--foreground-colour)",
        border: "none",
        cursor: "pointer",
        outline: "none",
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "1rem",
      }}>
      {locales.map((locale) => (
        <option key={locale} value={locale} style={{ color: "black" }}>
          {locale}
        </option>
      ))}
    </select>
  );
}
