import { nextTheme, THEME_LABELS, type Theme } from './theme';
import { useTheme } from './theme-context';

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === 'light') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="size-4 shrink-0"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }

  if (theme === 'dark') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="size-4 shrink-0"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const label = THEME_LABELS[theme];

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme(theme))}
      title={`Theme: ${label}. Click to change.`}
      aria-label={`Theme: ${label}. Change theme.`}
      className="border-line bg-surface text-muted hover:bg-surface-raised hover:text-ink inline-flex h-9 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium transition-colors"
    >
      <ThemeIcon theme={theme} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
