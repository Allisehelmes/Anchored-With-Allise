import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Check, ChevronDown } from "lucide-react";
import coachingGraduation from "@/assets/coaching-graduation.jpg";

export const Route = createFileRoute("/coaching")({
  head: () => ({
    meta: [
      { title: "1:1 Coaching — Anchored By Allise" },
      {
        name: "description",
        content:
          "Personalized 1:1 online fitness coaching with Allise — custom training, nutrition, and weekly accountability.",
      },
      { property: "og:title", content: "1:1 Coaching with Allise" },
      { property: "og:description", content: "Apply for personalized fitness coaching built around your life." },
      { property: "og:url", content: "/coaching" },
    ],
    links: [{ rel: "canonical", href: "/coaching" }],
  }),
  component: Coaching,
});

const included = [
  "Custom training program updated monthly",
  "Personalized nutrition strategy",
  "Weekly check-ins with detailed feedback",
  "Form-check video reviews",
  "Direct messaging access to Allise",
  "Habit and mindset coaching",
];

const forYou = [
  "You want to build strength and confidence that carries into everyday life.",
  "You believe fitness should support your life, not consume it.",
  "You're ready to commit to at least 8 weeks of showing up for yourself.",
  "You value mindset, consistency, and long-term progress over quick fixes.",
  "You want support, accountability, and a coach who meets you where you are.",
];

const faqs = [
  { q: "How long is the coaching commitment?", a: "I recommend minimum of 8 weeks to see meaningful change in both your body and mind. Most clients stay 6-12 months to experience a full fledged transformation." },
  { q: "Do I need a gym membership?", a: "Not necessarily. I program around the equipment you have access to, whether that's a full gym or a few dumbbells at home." },
  { q: "What if I'm a complete beginner?", a: "Perfect. Most of my clients are new or returning to strength training, and my programs are built to meet you exactly where you are." },
  { q: "How much does coaching cost?", a: "Investment is shared during your consultation call so we can recommend the right package for your goals and timeline." },
];

function Coaching() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    formData.set("_subject", "New 1:1 Coaching Application");
    formData.set("_replyto", String(formData.get("email") || ""));

    try {
      const response = await fetch("https://formspree.io/f/mzdnkbzz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      navigate({ to: "/thank-you" });
    } catch {
      setSubmitError("Something went wrong while submitting your application. Please try again or email me directly.");
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      {/* HERO */}
      <header className="container-page pt-16 md:pt-24 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">1:1 Online Coaching</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Personal coaching, built around <span className="italic text-sage-deep">your</span> life.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Fully customized training, nutrition, and accountability — designed
            to fit the way you actually live, work, and move.
          </p>
          <a
            href="#apply"
            className="mt-10 inline-flex bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
          >
            Start Your Application
          </a>
        </div>
        <div className="lg:col-span-5">
          <img src={coachingGraduation} alt="1:1 coaching" className="w-full aspect-[4/5] object-cover object-[50%_42%]" />
        </div>
      </header>

      {/* WHO + WHAT'S INCLUDED */}
      <section className="bg-sand/50 border-y border-border/60 py-20">
        <div className="container-page grid lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow mb-4">Who Coaching Is For</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              The right fit looks like this.
            </h2>
            <ul className="space-y-4">
              {forYou.map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="size-5 text-sage-deep shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">What's Included</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              Everything you need for success.
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {included.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm">
                  <Check className="size-4 text-sage-deep shrink-0 mt-1" />
                  <span className="text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-sand/50 border-y border-border/60">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4">Frequently Asked</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">Good questions, honest answers.</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-6 group"
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="font-serif text-lg md:text-xl">{f.q}</span>
                  <ChevronDown className={`size-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </div>
                {open === i && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">{f.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section id="apply" className="py-24 bg-primary text-primary-foreground scroll-mt-24">
        <div className="container-page grid lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-sage mb-5">Apply for 1:1 Coaching</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Take the first step.
            </h2>
            <p className="mt-6 text-primary-foreground/70 leading-relaxed max-w-md">
              Applications are reviewed personally. You'll hear back within the
              week with next steps.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-background text-foreground p-8 md:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" name="full_name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Age" name="age" type="number" required />
              <SelectField
                label="Fitness Experience"
                name="fitness_experience"
                options={["Beginner", "Some experience (1–2 yrs)", "Experienced (3+ yrs)"]}
              />
            </div>
            <SelectField
              label="Main Goal"
              name="main_goal"
              options={["Build Strength", "Fat Loss / Body Recomp", "Consistency & Habits", "Sports Performance"]}
            />
            <TextareaField label="Biggest Struggle" name="biggest_struggle" rows={2} />
            <SelectField
              label="Timeline to Start"
              name="timeline_to_start"
              options={["Immediately", "Within a month", "1–3 months", "Just exploring"]}
            />
            <TextareaField label="Why do you want coaching?" name="why_coaching" rows={3} />
            {submitError && (
              <p className="text-sm text-destructive leading-relaxed" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        </div>
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

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-sage-deep transition-colors"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextareaField({ label, name, rows = 3 }: { label: string; name: string; rows?: number }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <textarea
        name={name}
        rows={rows}
        required
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm resize-none focus:outline-none focus:border-sage-deep transition-colors"
      />
    </label>
  );
}
