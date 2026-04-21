"use client";

import { useRouter } from "next/navigation";
import { locales, Locale } from "@/lib/i18n-config";
import styles from "@/styles/components/layout/navbar/LanguageSwitcher.module.css";

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
      className={styles.languageSwitcher}>
      {locales.map((locale) => (
        <option key={locale} value={locale} className={styles.languageOption}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
