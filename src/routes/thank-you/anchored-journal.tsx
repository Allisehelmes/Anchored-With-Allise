import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Check, Download } from "lucide-react";
import anchoredJournal from "@/assets/the-anchored-journal.pdf";

export const Route = createFileRoute("/thank-you/anchored-journal")({
  head: () => ({
    meta: [
      { title: "Download The Anchored Journal — Anchored By Allise" },
      { name: "description", content: "Download your Anchored Journal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AnchoredJournalThankYou,
});

function AnchoredJournalThankYou() {
  return (
    <SiteShell>
      <section className="container-page py-32 text-center max-w-2xl">
        <div className="size-14 mx-auto grid place-items-center rounded-full bg-sage/20 text-sage-deep mb-8">
          <Check className="size-7" />
        </div>
        <p className="eyebrow mb-5">Purchase Complete</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Your journal is ready.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Thank you for purchasing The Anchored Journal. Click below to download
          your journal, and be sure to save a copy to your device so you can
          return to it whenever you need it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={anchoredJournal}
            download="The Anchored Journal.pdf"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
          >
            Download The Anchored Journal <Download className="size-4" />
          </a>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
          >
            Browse More Resources
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
