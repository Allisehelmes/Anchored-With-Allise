import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Anchored By Allise" },
      { name: "description", content: "Your coaching application has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <SiteShell>
      <section className="container-page py-32 text-center max-w-2xl">
        <div className="size-14 mx-auto grid place-items-center rounded-full bg-sage/20 text-sage-deep mb-8">
          <Check className="size-7" />
        </div>
        <p className="eyebrow mb-5">Application Received</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Thank you — I can't wait to read it.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          I personally review each and every application. You'll hear back
          within the week for all the next steps. Keep an eye on your inbox!!
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
          >
            Browse Guides
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
