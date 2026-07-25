import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/client-portal")({
  head: () => ({
    meta: [
      { title: "Client Portal — Anchored By Allise" },
      { name: "description", content: "A dedicated Anchored By Allise client portal is coming soon." },
      { property: "og:title", content: "Client Portal — Coming Soon" },
      { property: "og:description", content: "A dedicated coaching client portal is currently in development." },
      { property: "og:url", content: "/client-portal" },
    ],
    links: [{ rel: "canonical", href: "/client-portal" }],
  }),
  component: ClientPortal,
});

const features = [
  {
    title: "Wins Wall For All Clients to Post and See Each Others Successes",
    description:
      "Clients will have a shared space to celebrate progress and support each other. It is being designed to make the coaching experience feel more connected.",
  },
  {
    title: "Mindset Corner With Journal Prompts and Notes on Mental Wellbeing",
    description:
      "This space will support the mental side of the process with prompts, notes, and reflection. It is meant to help you build strength from the inside out.",
  },
  {
    title: "Individualized log in",
    description:
      "Each client will have a private space to access their coaching tools. This keeps your program, progress, and resources organized in one secure place.",
  },
  {
    title: "Access to Your Program",
    description:
      "Your training plan will be easy to find and follow whenever you need it. The goal is to make showing up feel simpler and more structured.",
  },
  {
    title: "Weekly Coaching Call Calendar",
    description:
      "A built-in calendar will help you keep track of coaching calls and important check-ins. You will always know what is coming next.",
  },
  {
    title: "Progress Tracking",
    description:
      "Track wins, habits, and physical progress over time in a way that feels clear. This will help you see how far you have come beyond the day-to-day.",
  },
  {
    title: "Nutrition Resources",
    description:
      "Nutrition guidance, tools, and reminders will live in one easy-to-access spot. This makes it easier to build habits without constantly searching for information.",
  },
  {
    title: "Exercise Video Library",
    description:
      "Exercise demos will help you feel more confident with your form. You will be able to reference movements whenever you need a quick reminder.",
  },
];

function ClientPortal() {
  return (
    <SiteShell>
      <header className="container-page pt-16 md:pt-24 pb-16 text-center max-w-3xl">
        <div className="mb-5 flex justify-center">
          <span className="border border-sage-deep text-sage-deep px-4 py-2 text-[10px] uppercase tracking-[0.22em]">
            Coming Soon
          </span>
        </div>
        <p className="eyebrow mb-5">Client Portal</p>
        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
          Client Portal <span className="italic text-sage-deep">Coming Soon</span>
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          I'm building a dedicated client portal to make your coaching
          experience even better. Every client who joins 1:1 coaching will
          automatically receive access once it's released.
        </p>
      </header>

      <section className="container-page pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <article key={feature.title} className="border border-border bg-background p-7">
              <h2 className="font-serif text-2xl leading-tight">{feature.title}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand/50 border-y border-border/60 py-20">
        <div className="container-page max-w-3xl text-center">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            The portal is currently in development. My goal is to create a
            space that fosters community, is more organized, and even more
            supportive. Stay tuned.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
