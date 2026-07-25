import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import coachRainbowWide from "@/assets/meet-your-coach-rainbow-wide.jpeg";

export const Route = createFileRoute("/meet-your-coach")({
  head: () => ({
    meta: [
      { title: "Meet Your Coach — Anchored By Allise" },
      { name: "description", content: "Get to know Coach Allise — her story, philosophy, certifications, and fitness journey." },
      { property: "og:title", content: "Meet Coach Allise" },
      { property: "og:description", content: "The story, philosophy, and credentials behind Anchored By Allise." },
      { property: "og:url", content: "/meet-your-coach" },
    ],
    links: [{ rel: "canonical", href: "/meet-your-coach" }],
  }),
  component: MeetYourCoach,
});

function MeetYourCoach() {
  return (
    <SiteShell>
      <header className="container-page pt-16 md:pt-24 pb-16 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Meet Your Coach</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Hi, I'm <span className="italic text-sage-deep">Allise</span>.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A strength coach and lifelong student of the human body.
            <br />
            <br />
            My goal is to help people build strength, confidence, and an
            overall healthier lifestyle through realistic habits that last.
            <br />
            <br />
            Taking care of yourself isn't just about changing your body — it's
            about respecting the person you're becoming.
          </p>
        </div>
        <div className="lg:col-span-7">
          <img src={coachRainbowWide} alt="Coach Allise" className="w-full aspect-[16/10] object-cover object-[50%_22%]" />
        </div>
      </header>

      {/* My Story */}
      <section className="py-20 border-t border-border/60">
        <div className="container-page grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">My Story</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Finding strength in something steady.
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I've had seasons of life where I have severely struggled with my
              mental health. Through every high and low, movement was the one
              thing that was a constant in my life. Training became something I
              could return to when everything else felt impossible. It was the
              one thing in my life that never changed and never let me down.
            </p>
            <p>
              That's why I coach the way I do. I believe fitness should support
              your life, not consume it. My goal is to help people find
              themselves through movement, and create lives that they never
              thought were possible.
            </p>
          </div>
        </div>
      </section>

      {/* Why I coach + Philosophy */}
      <section className="py-20 bg-sand/50 border-y border-border/60">
        <div className="container-page grid md:grid-cols-2 gap-12">
          <article>
            <p className="eyebrow mb-4">Why I Became A Coach</p>
            <h3 className="font-serif text-2xl md:text-3xl mb-5 leading-tight">
              Because movement should be an anchor
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Movement has saved my life on multiple occasions. I coach to give
              people what fitness gave to me: something to rely on. If I can
              help someone find peace within movement like I did, I am
              satisfied.
            </p>
          </article>
          <article>
            <p className="eyebrow mb-4">Coaching Philosophy</p>
            <h3 className="font-serif text-2xl md:text-3xl mb-5 leading-tight">
              Build something you can rely on
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              It was never just about fitness. It's about the mindset and
              habits that you build along the way that will drive you to be the
              most successful version of yourself.
            </p>
          </article>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container-page">
          <p className="eyebrow mb-6 text-center">Certifications</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "NASM Certified Personal Trainer",
              "NASM Certified Nutrition Coach",
              "NASM Certified Physique and Bodybuilding Coach",
            ].map((c) => (
              <div key={c} className="border border-border bg-background p-6 text-center">
                <p className="font-serif text-base leading-snug">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container-page max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Let's build something lasting.</h2>
          <Link
            to="/coaching"
            hash="apply"
            className="mt-10 inline-flex bg-cream text-primary px-10 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage hover:text-primary-foreground transition-colors"
          >
            Apply for 1:1 Coaching
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
