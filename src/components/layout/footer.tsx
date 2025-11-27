import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your AI-powered legal companion.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Features</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/chatbot"
                  className="text-muted-foreground hover:text-foreground"
                >
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/evidence"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Evidence Vault
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Helplines & NGOs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-background p-4">
            <h4 className="font-semibold">Disclaimer</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Legal Buddy provides information for educational purposes only and is
              not a substitute for professional legal advice. Always consult with
              a qualified lawyer for your specific situation.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Legal Buddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
