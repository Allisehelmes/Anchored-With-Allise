import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/anchored-in-8/preview")({
  head: () => ({
    meta: [
      { title: "Anchored In 8 Onboarding Preview — Anchored By Allise" },
      { name: "description", content: "Preview the Anchored In 8 onboarding questionnaire." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AnchoredIn8Preview,
});

function AnchoredIn8Preview() {
  return (
    <SiteShell>
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Anchored In 8 Onboarding Preview</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Tell me what you need from your 8-week plan.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            This preview shows the questionnaire customers complete after
            checkout. Responses cannot be submitted from this page.
          </p>
        </div>

        <div className="mt-14 bg-sand/50 border border-border p-8 md:p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <PreviewField label="Full Name" />
            <PreviewField label="Email" type="email" />
          </div>

          <PreviewTextarea label="Primary Goals" rows={4} />

          <PreviewTextarea label="Describe what your current diet looks like." rows={4} />

          <PreviewSelect
            label="Would you like nutrition targets included with your program?"
            options={[
              "Yes, I'd like calories and macros calculated.",
              "No, I'd prefer to focus on training only.",
              "Not sure — I'd like your recommendation.",
            ]}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewSelect label="Biological Sex" options={["Female", "Male"]} />
            <PreviewField label="Height" placeholder="Feet/Inches or centimeters" />
            <PreviewField label="Current Weight" />
            <PreviewField
              label="Goal Weight (if applicable)"
              helper="Leave blank if your goal is not weight-related."
            />
            <div className="md:col-span-2">
              <PreviewSelect
                label="Activity Level"
                options={[
                  "Sedentary (little to no exercise)",
                  "Lightly Active (1–3 workouts/week)",
                  "Moderately Active (3–5 workouts/week)",
                  "Very Active (6–7 workouts/week)",
                  "Extremely Active (physical job and/or multiple training sessions/day)",
                ]}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewSelect
              label="Experience Level"
              options={["Beginner", "Returning after a break", "Intermediate", "Advanced"]}
            />
            <PreviewSelect
              label="Workout Days Per Week"
              options={["2 days", "3 days", "4 days", "5 days", "6+ days"]}
            />
          </div>

          <PreviewTextarea label="Injuries or Limitations" rows={3} />
          <PreviewTextarea label="Available Equipment" rows={3} />
          <PreviewTextarea label="Schedule Notes" rows={3} />
          <PreviewTextarea label="Workout Preferences" rows={3} />
          <PreviewTextarea label="Anything Else the Coach Should Know" rows={4} />

          <div className="border-t border-border pt-8">
            <Link
              to="/anchored-in-8"
              className="inline-flex w-full items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
            >
              Purchase Anchored In 8 — $135
            </Link>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Placeholder Stripe Payment Link. This will redirect to the real
              checkout once the Stripe Payment Link is ready.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PreviewField({
  label,
  helper,
  type = "text",
  placeholder,
}: {
  label: string;
  helper?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        disabled
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-sage-deep transition-colors"
      />
      {helper && <span className="mt-2 block text-xs text-muted-foreground">{helper}</span>}
    </label>
  );
}

function PreviewSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <select
        disabled
        defaultValue=""
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-sage-deep transition-colors"
      >
        <option value="" disabled>Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function PreviewTextarea({ label, rows = 3 }: { label: string; rows?: number }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <textarea
        rows={rows}
        disabled
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm resize-none focus:outline-none focus:border-sage-deep transition-colors"
      />
    </label>
  );
}
