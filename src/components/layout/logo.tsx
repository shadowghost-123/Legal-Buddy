import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/home" className="flex items-center gap-2" aria-label="LegalBuddy Home">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 4L2 10L16 16L30 10L16 4Z" fill="hsl(var(--primary))" />
        <path d="M7 12V20L16 25L25 20V12L16 17L7 12Z" fill="hsl(var(--primary))" opacity="0.8" />
        <path d="M26 9L26 18" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 18H24" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <span className="text-xl font-bold tracking-tight font-headline">
        LegalBuddy
      </span>
    </Link>
  );
}
