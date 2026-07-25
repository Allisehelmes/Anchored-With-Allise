import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Placeholder } from "@/components/site/Placeholder";
import { Newsletter } from "@/components/site/Newsletter";
import { ArrowUpRight, Quote } from "lucide-react";
import homeHeroAllise from "@/assets/home-hero-allise.jpg";
import rinseWashRepeatCover from "@/assets/rinse-wash-repeat-cover.png";
import anchoredJournalCover from "@/assets/the-anchored-journal-cover.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anchored By Allise — Sustainable Fitness Coaching for Women" },
      {
        name: "description",
        content:
          "1:1 online coaching and downloadable fitness resources. Build strength, confidence, and consistency with Coach Allise.",
      },
      { property: "og:title", content: "Anchored By Allise" },
      {
        property: "og:description",
        content: "Sustainable training, nutrition, and accountability-focused coaching for women.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const steps = [
  { n: "01", t: "Apply", d: "Share your goals, history, and lifestyle so we know it's a real fit." },
  { n: "02", t: "Consultation Call", d: "We connect for a 20-minute call to map out your path forward." },
  { n: "03", t: "Personalized Plan", d: "Training, nutrition, and habit work tailored to your body and your week." },
  { n: "04", t: "Ongoing Support", d: "Weekly check-ins, form reviews, and direct access — every step of the way." },
];

const guides = [
  {
    title: "Rinse. Wash. Repeat.",
    sub: "A No bullshit, complete guide to starting your fitness journey.",
    price: "$18.99",
    cover: rinseWashRepeatCover,
  },
  {
    title: "The Anchored Journal",
    sub: "100 days of guided reflection for mental health & fitness",
    price: "$10.99",
    cover: anchoredJournalCover,
  },
];

const clientStoriesPreview = [
  {
    name: "Rachel D.",
    preview: "When I started at the gym, I had zero experience. I never played any sports in school and felt uncomfortable being surrounded by people who seemed to already know everything.",
    full: "It was really daunting, so I decided to start with a personal trainer. Instead of looking up online at a bunch of sources with conflicting opinions, I started with Alli as my starting off point. At first, I was really nervous. I felt like everyone knew that I was a newbie. But as I spent more and more time with Alli, not only did I gain knowledge and valuable instruction, I also gained confidence as a fellow gym goer. She helped me see how we all might be on varying levels but at the end of the day, we are all focused on ourselves and trying to be better. Without her, I probably wouldn't have the discipline and the peace of mind that I needed to form a habit in a foreign place.",
  },
  {
    name: "Iana B.",
    preview: "When I first started working with Alli in late November of 2025, I had just moved to the area and was going through a lot of life changes. I knew I wanted something that would help me build consistency in a healthy way, and that's exactly what I found with her.",
    full: "As a former athlete, I knew I do best when someone pushes me and holds me accountable instead of trying to figure everything out on my own. Since Alli is also an ex-athlete, she understood exactly how to motivate me while making every workout challenging, fun, and tailored to my goals. When I started training with Alli, I weighed 186.6 lbs. At my most recent weigh-in, I'm down to 172.4 lbs—over 14 pounds lost! The best part is that I never felt like I had to give up living my life. Thanks to her workouts, nutrition tips, and realistic approach, I've been able to travel, enjoy my favorite foods and drinks in moderation, and still make consistent progress. Although we're not finished with my weight loss and muscle definition goals, I can already see how much our hard work has transformed my body. I've lost the majority of my back fat, built strength in my legs and arms that I haven't had in years, and have watched my body slim down to the point where many of my old clothes are now too big. I've also learned so many new exercises that I genuinely enjoy, which has made working out something I actually look forward to instead of feeling like a chore. More than anything, Alli has helped me build confidence, healthier habits, and a routine that fits my lifestyle. If you're looking for a trainer who truly cares about your success, knows how to challenge you, and helps you achieve realistic, sustainable results, I can't recommend Alli enough. I'm so excited to continue this journey with her and see what we're able to accomplish together.",
  },
  {
    name: "Tammy D.",
    preview: "Allise is so professional, patient and knowledgeable. She answers all my questions in regard to fitness and nutrition.",
    full: "She also makes the most awesome suggestions. Working with Allise is awesome because I'm learning form, while lifting and finally using the entire gym instead of just cardio and machines. I'm learning what exercises to do to target each muscle group. She is extremely patient. I left the gym today feeling really accomplished and finally understanding what I'm doing. Thank you, Alli, for being so awesome!!",
  },
];

function Home() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  return (
    <SiteShell>
      {/* HERO */}
      <header className="relative pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 animate-fade-up">
            <p className="eyebrow mb-6">Strength through consistency</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
              Build a body you love, with a <span className="italic text-sage-deep">plan</span> you can keep.
            </h1>
            <p className="mt-8 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
              Anchored by Allise helps you build strength, confidence, and
              habits that last. It's about creating something you can come back
              to—on the good days, the hard days, and everything in between.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/coaching"
                hash="apply"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
              >
                Apply for 1:1 Coaching <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
              >
                Shop Resources
              </Link>
              <Link
                to="/anchored-in-8"
                className="inline-flex items-center justify-center gap-2 border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
              >
                Anchored In 8
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative animate-fade-up">
            <img src={homeHeroAllise} alt="Coach Allise" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-background px-6 py-5 shadow-xl border border-border max-w-[240px] hidden md:block">
              <Quote className="size-4 text-sage-deep mb-2" />
              <p className="font-serif italic text-lg leading-snug">
                Your potential is waiting.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="bg-sand/50 border-y border-border/60 py-24">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow mb-5">About Anchored By Allise</p>
          <h2 className="font-serif text-3xl md:text-5xl text-balance leading-tight">
            Stronger habits. Healthier mindset. <span className="italic">A lifestyle you can sustain.</span>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We don't do quick fixes. This journey will transform you both
            mentally and physically, and teach you how to fall in love with the
            process along the way.
          </p>
          <div className="grid sm:grid-cols-3 gap-10 mt-16 text-left">
            {[
              { t: "Sustainable", d: "Habits that fit your real life — not the other way around." },
              { t: "Strength-First", d: "Evidence-based programming focused on building lasting capacity." },
              { t: "Whole-Person", d: "Mind, body, and identity — all coached, all honored." },
            ].map((b) => (
              <div key={b.t}>
                <div className="size-10 grid place-items-center border border-sage-deep font-serif italic text-sage-deep mb-4">
                  ✦
                </div>
                <h3 className="font-medium text-base uppercase tracking-[0.16em] text-[12px]">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="container-page">
          <div className="flex justify-between items-end mb-16 gap-6 flex-wrap">
            <div>
              <p className="eyebrow mb-4">The Process</p>
              <h2 className="font-serif text-3xl md:text-4xl">How coaching works</h2>
            </div>
            <span className="text-xs text-muted-foreground tracking-widest">01 — 04</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="text-xs font-medium text-sage-deep tracking-widest">STEP {s.n}</span>
                <h3 className="font-serif text-xl mt-4">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT STORIES */}
      <section id="client-stories" className="bg-sand/50 border-y border-border/60 py-24 scroll-mt-24">
        <div className="container-page">
          <div className="flex justify-between items-end mb-16 gap-6 flex-wrap">
            <div>
              <p className="eyebrow mb-4">Client Victories</p>
              <h2 className="font-serif text-3xl md:text-4xl">Client Stories</h2>
            </div>
            <Link to="/results" className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1">
              View All Client Stories
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {clientStoriesPreview.map((testimonial, index) => {
              const isExpanded = expandedStory === index;

              return (
                <article key={testimonial.name} className="bg-background border border-border p-8 flex flex-col">
                  <p className="font-serif italic text-xl leading-snug">
                    "{testimonial.preview}"
                  </p>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-sm text-muted-foreground leading-relaxed">
                        {testimonial.full}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <p className="eyebrow mb-4">— {testimonial.name}</p>
                    <button
                      type="button"
                      onClick={() => setExpandedStory(isExpanded ? null : index)}
                      className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:text-sage-deep hover:border-sage-deep transition-colors"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED RESOURCES */}
      <section className="py-24">
        <div className="container-page">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">The Shop</p>
            <h2 className="font-serif text-3xl md:text-5xl">Featured Digital Resources</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {guides.map((g) => (
              <article key={g.title} className="group">
                {g.cover ? (
                  <div className="relative w-full overflow-hidden outline-1 -outline-offset-1 outline-foreground/5 mb-6 transition-transform duration-500 group-hover:scale-[0.99]" style={{ aspectRatio: "4/5" }}>
                    <img src={g.cover} alt={`${g.title} cover`} className="absolute inset-0 size-full object-cover" />
                  </div>
                ) : (
                  <Placeholder label={g.title} aspect="4/5" className="mb-6 transition-transform duration-500 group-hover:scale-[0.99]" />
                )}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-xl">{g.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{g.sub}</p>
                  </div>
                  <span className="font-medium text-sm">{g.price}</span>
                </div>
                <Link
                  to="/shop"
                  className="mt-5 inline-flex w-full justify-center border border-foreground/15 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
                >
                  View Resource
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/shop" className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1">
              Browse All Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ANCHORED IN 8 CTA */}
      <section className="bg-sand/50 border-y border-border/60 py-24">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Anchored In 8</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              A personalized 8-week plan without ongoing coaching.
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
              Get a custom training program built around your goals, schedule,
              equipment, and experience level so you can move forward with
              structure and confidence.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Link
              to="/anchored-in-8"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
            >
              Explore Anchored In 8 <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* FINAL CTA */}
      <section className="bg-primary text-primary-foreground py-28 text-center">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-sage mb-6">Ready when you are</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Your next chapter starts <span className="italic">here</span>.
          </h2>
          <p className="mt-6 text-primary-foreground/70 max-w-xl mx-auto">
            Applications are open for our next 1:1 coaching intake. Limited spots for dedicated individuals ready to commit to themselves.
          </p>
          <Link
            to="/coaching"
            hash="apply"
            className="mt-10 inline-flex items-center gap-2 bg-cream text-primary px-10 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage hover:text-primary-foreground transition-colors"
          >
            Apply for 1:1 Coaching <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
