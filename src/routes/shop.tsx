import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Placeholder } from "@/components/site/Placeholder";
import { Newsletter } from "@/components/site/Newsletter";
import rinseWashRepeatCover from "@/assets/rinse-wash-repeat-cover.png";
import anchoredJournalCover from "@/assets/the-anchored-journal-cover.png";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Resources — Anchored By Allise" },
      { name: "description", content: "Downloadable PDF fitness and nutrition resources by Coach Allise." },
      { property: "og:title", content: "Shop Digital Fitness Resources" },
      { property: "og:description", content: "Self-paced PDF training and nutrition resources for every level." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const products = [
  {
    title: "Rinse. Wash. Repeat.",
    sub: "A No bullshit, complete guide to starting your fitness journey.",
    desc: "A complete beginner's guide to building strength, creating sustainable habits, and finally understanding what actually matters in fitness.",
    cover: rinseWashRepeatCover,
    price: "$18.99",
    purchaseUrl: "https://buy.stripe.com/test_3cIfZj1Nc5DHfAp8iPb7y03",
  },
  {
    title: "The Anchored Journal",
    sub: "100 days of guided reflection for mental health & fitness",
    desc: "Build a stronger mindset, healthier habits, and a more grounded relationship with fitness through 100 guided reflections designed to help you create lasting change from the inside out.",
    cover: anchoredJournalCover,
    price: "$10.99",
    purchaseUrl: "https://buy.stripe.com/test_6oU6oJ3Vk9TX2NDgPlb7y04",
  },
  {
    title: "The Travel Survival Guide",
    sub: "Your guide to navigating fitness while traveling.",
    desc: "Travel doesn't have to mean losing progress. Learn how to prioritize what matters most, stay active anywhere, and come home without feeling like you have to start over.",
    coverLabel: "Coming soon",
  },
];

function Shop() {
  return (
    <SiteShell>
      <header className="container-page pt-16 md:pt-24 pb-14 text-center max-w-3xl">
        <p className="eyebrow mb-5">Digital Resources</p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
          Resources designed for real life.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          These downloadable resources are built to simplify the process and help
          you create habits that last. More resources and training programs are
          always on the way.
        </p>
      </header>

      <section className="container-page pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {products.map((p) => (
            <article key={p.title} className="group grid sm:grid-cols-2 gap-6 border-t border-border pt-10">
              {p.cover ? (
                <div className="relative w-full overflow-hidden outline-1 -outline-offset-1 outline-foreground/5" style={{ aspectRatio: "4/5" }}>
                  <img src={p.cover} alt={`${p.title} cover`} className="absolute inset-0 size-full object-cover" />
                </div>
              ) : (
                <Placeholder label={p.coverLabel ?? p.title} aspect="4/5" />
              )}
              <div className="flex flex-col">
                <h2 className="font-serif text-2xl">{p.title}</h2>
                <p className="eyebrow mt-2">{p.sub}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  {p.price ? <span className="font-serif text-2xl">{p.price}</span> : <span />}
                  {p.purchaseUrl ? (
                    <a href={p.purchaseUrl} className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors">
                      Purchase
                    </a>
                  ) : (
                    <button className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors">
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Newsletter />
    </SiteShell>
  );
}
