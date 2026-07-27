import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Check, Download } from "lucide-react";
import rinseWashRepeatGuide from "@/assets/rinse-wash-repeat.pdf";

export const Route = createFileRoute("/thank-you/rinse-wash-repeat")({
  head: () => ({
    meta: [
      { title: "Download Rinse. Wash. Repeat. — Anchored By Allise" },
      { name: "description", content: "Download your Rinse. Wash. Repeat. guide." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RinseWashRepeatThankYou,
});

function RinseWashRepeatThankYou() {
  return (
    <SiteShell>
      <section className="container-page py-32 text-center max-w-2xl">
        <div className="size-14 mx-auto grid place-items-center rounded-full bg-sage/20 text-sage-deep mb-8">
          <Check className="size-7" />
        </div>
        <p className="eyebrow mb-5">Purchase Complete</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Your guide is ready.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Thank you for purchasing Rinse. Wash. Repeat. Click below to download
          your guide, and be sure to save a copy to your device so you can come
          back to it anytime.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={rinseWashRepeatGuide}
            download="Rinse. Wash. Repeat.pdf"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
          >
            Download Rinse. Wash. Repeat. <Download className="size-4" />
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
