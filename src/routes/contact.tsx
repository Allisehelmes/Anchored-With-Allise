import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Instagram, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anchored By Allise" },
      { name: "description", content: "Get in touch with Coach Allise. Questions, partnerships, or media inquiries." },
      { property: "og:title", content: "Contact Anchored By Allise" },
      { property: "og:description", content: "Reach out via email or social — Coach Allise typically responds within 48 hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.27z" />
    </svg>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <header className="container-page pt-16 md:pt-24 pb-14 text-center max-w-2xl">
        <p className="eyebrow mb-5">Contact</p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
          Let's <span className="italic text-sage-deep">talk</span>.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Questions about coaching, the resources, partnerships, or just want to
          say hi? I read every message personally.
        </p>
      </header>

      <section className="container-page pb-24 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          {sent ? (
            <div className="border border-border bg-background p-10 text-center">
              <h2 className="font-serif text-2xl">Message received.</h2>
              <p className="mt-3 text-muted-foreground">I'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="border border-border bg-background p-8 md:p-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Subject" name="subject" type="text" required />
              <label className="block">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm resize-none focus:outline-none focus:border-sage-deep transition-colors"
                />
              </label>
              <button className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-2 space-y-8">
          <div className="border border-border bg-background p-8">
            <p className="eyebrow mb-4">Email</p>
            <a href="mailto:hello@anchoredbyallise.com" className="font-serif text-2xl hover:text-sage-deep transition-colors">
              hello@anchoredbyallise.com
            </a>
            <p className="mt-3 text-sm text-muted-foreground">Responses within 48 hours.</p>
          </div>

          <div className="border border-border bg-background p-8">
            <p className="eyebrow mb-5">Follow Along</p>
            <div className="space-y-4">
              <a href="https://instagram.com" className="flex items-center gap-4 group">
                <span className="size-10 grid place-items-center border border-border group-hover:bg-sage-deep group-hover:text-cream group-hover:border-sage-deep transition-colors">
                  <Instagram className="size-4" />
                </span>
                <span className="font-serif text-lg">@anchoredbyallise</span>
              </a>
              <a href="https://tiktok.com" className="flex items-center gap-4 group">
                <span className="size-10 grid place-items-center border border-border group-hover:bg-sage-deep group-hover:text-cream group-hover:border-sage-deep transition-colors">
                  <TikTokIcon className="size-4" />
                </span>
                <span className="font-serif text-lg">@anchoredbyallise</span>
              </a>
              <a href="mailto:hello@anchoredbyallise.com" className="flex items-center gap-4 group">
                <span className="size-10 grid place-items-center border border-border group-hover:bg-sage-deep group-hover:text-cream group-hover:border-sage-deep transition-colors">
                  <Mail className="size-4" />
                </span>
                <span className="font-serif text-lg">Email me</span>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <input
        {...rest}
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-sage-deep transition-colors"
      />
    </label>
  );
}
