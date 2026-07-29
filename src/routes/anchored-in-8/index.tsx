import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowUpRight, Check } from "lucide-react";
import anchoredIn8Squat from "@/assets/anchored-in-8-squat.jpg";

export const Route = createFileRoute("/anchored-in-8/")({
  head: () => ({
    meta: [
      { title: "Anchored In 8 — Anchored By Allise" },
      {
        name: "description",
        content:
          "A personalized 8-week fitness program built around your goals, schedule, equipment, and experience level with no ongoing coaching.",
      },
      { property: "og:title", content: "Anchored In 8" },
      {
        property: "og:description",
        content: "A custom 8-week fitness program without ongoing coaching.",
      },
      { property: "og:url", content: "/anchored-in-8" },
    ],
    links: [{ rel: "canonical", href: "/anchored-in-8" }],
  }),
  component: AnchoredIn8,
});

const included = [
  "Personalized 8-week training program",
  "Programming built around your equipment and schedule",
  "Goal-focused structure for strength, fat loss, or consistency",
  "Exercise guidance and progression notes",
  "Delivered to your email within 3 business days after onboarding",
];

const bestFor = [
  "You want a custom plan but do not need ongoing coaching",
  "You are ready to train independently with clear structure",
  "You want a realistic routine for the next 8 weeks",
  "You need a plan that fits your current season of life",
];

function AnchoredIn8() {
  return (
    <SiteShell>
      <header className="container-page pt-16 md:pt-24 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Anchored In 8</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Your custom 8-week plan, built to fit <span className="italic text-sage-deep">your</span> life.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Anchored In 8 is a personalized fitness program for individuals who want
            structure, confidence, and a realistic plan without ongoing
            coaching.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://buy.stripe.com/eVqfZj4Zo5DH73T9mTb7y02"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] opacity-70"
            >
              Purchase Anchored In 8 — $135 <ArrowUpRight className="size-4" />
            </a>
            <Link
              to="/anchored-in-8/preview"
              className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
            >
              Preview Onboarding
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <img src={anchoredIn8Squat} alt="Anchored In 8" className="w-full aspect-[4/5] object-cover object-center" />
        </div>
      </header>

      <section className="bg-sand/50 border-y border-border/60 py-20">
        <div className="container-page grid lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow mb-4">What's Included</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              A complete plan for your next 8 weeks.
            </h2>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="size-5 text-sage-deep shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Best For You If</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              You want guidance without a coaching container.
            </h2>
            <ul className="space-y-4">
              {bestFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="size-5 text-sage-deep shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">How It Works</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Checkout, complete onboarding, receive your plan.
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
              After you checkout, you will complete a short questionnaire so I
              have what I need to build your entire program. The finished
              product will be sent to your email within 3 business days.
            </p>
          </div>
          <div className="lg:col-span-5 border border-border bg-background p-8">
            <p className="eyebrow mb-4">Investment</p>
            <p className="font-serif text-5xl">$135</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Placeholder price for the 8-week program. Final pricing can be
              adjusted before connecting Stripe.
            </p>
            <a
              href="https://buy.stripe.com/eVqfZj4Zo5DH73T9mTb7y02"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] opacity-70"
            >
              Purchase Anchored In 8 — $135 <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
