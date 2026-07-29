import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/anchored-in-8/confirmation")({
  head: () => ({
    meta: [
      { title: "Anchored In 8 Confirmation — Anchored By Allise" },
      { name: "description", content: "Your Anchored In 8 onboarding questionnaire has been submitted." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AnchoredIn8Confirmation,
});

function AnchoredIn8Confirmation() {
  return (
    <SiteShell>
      <section className="container-page py-32 text-center max-w-2xl">
        <div className="size-14 mx-auto grid place-items-center rounded-full bg-sage/20 text-sage-deep mb-8">
          <Check className="size-7" />
        </div>
        <p className="eyebrow mb-5">Onboarding Submitted</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          Thank you, your program will be delivered to your email within 3 business days.
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Your onboarding questionnaire has been received successfully. I'll
          review everything you've shared and use it to build a program that's
          tailored to your goals, experience, schedule, and available equipment.
          If I need any additional information, I'll reach out by email.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
          >
            Back Home
          </Link>
          <Link
            to="/anchored-in-8"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
          >
            View Anchored In 8
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
