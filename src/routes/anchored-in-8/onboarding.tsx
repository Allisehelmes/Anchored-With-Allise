import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";

const ONBOARDING_FORM_ENDPOINT = "https://formspree.io/f/mnjeoqnw";
const REQUEST_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export const Route = createFileRoute("/anchored-in-8/onboarding")({
  head: () => ({
    meta: [
      { title: "Anchored In 8 Onboarding — Anchored By Allise" },
      { name: "description", content: "Complete your Anchored In 8 onboarding questionnaire." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AnchoredIn8Onboarding,
});

function AnchoredIn8Onboarding() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitDiagnostic, setSubmitDiagnostic] = useState("");
  const [wantsNutritionTargets, setWantsNutritionTargets] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [verificationReason, setVerificationReason] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"checking" | "verified" | "unverified" | "submitted">("checking");

  const verifyPurchase = async (checkoutSessionId: string) => {
    const response = await fetchWithTimeout(
      `/.netlify/functions/verify-anchored-in-8-purchase?session_id=${encodeURIComponent(checkoutSessionId)}`,
      { headers: { Accept: "application/json" } }
    );

    if (!response.ok) return false;

    const data = await response.json();
    console.info("Anchored In 8 verification response", data);
    setVerificationReason(data.reason || "");
    return data.verified === true;
  };

  useEffect(() => {
    const checkoutSessionId = new URLSearchParams(window.location.search).get("session_id") || "";
    setSessionId(checkoutSessionId);

    if (!checkoutSessionId) {
      setVerificationReason("missing_session_id");
      setVerificationStatus("unverified");
      return;
    }

    const submittedSessions = JSON.parse(localStorage.getItem("anchoredIn8SubmittedSessions") || "[]") as string[];

    if (submittedSessions.includes(checkoutSessionId)) {
      setVerificationStatus("submitted");
      return;
    }

    verifyPurchase(checkoutSessionId)
      .then((verified) => setVerificationStatus(verified ? "verified" : "unverified"))
      .catch(() => setVerificationStatus("unverified"));
  }, []);

  const handleNutritionTargetsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setWantsNutritionTargets(value);

    if (value !== "Yes, I'd like calories and macros calculated.") {
      const form = e.currentTarget.form;
      form?.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
        "[name='nutrition_biological_sex'], [name='nutrition_height'], [name='nutrition_current_weight'], [name='nutrition_goal_weight'], [name='activity_level']"
      ).forEach((field) => {
        field.value = "";
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");
    setSubmitDiagnostic("");
    let shouldResetSubmitting = true;

    try {
      if (!sessionId || verificationStatus !== "verified") {
        setSubmitError("We couldn’t verify your Anchored In 8 purchase. Please return to checkout or contact Alli for help.");
        return;
      }

      const verified = await verifyPurchase(sessionId);

      if (!verified) {
        setVerificationStatus("unverified");
        return;
      }

      const wantsTargets = formData.get("nutrition_targets_preference") === "Yes, I'd like calories and macros calculated.";

      if (!wantsTargets) {
        formData.delete("nutrition_biological_sex");
        formData.delete("nutrition_height");
        formData.delete("nutrition_current_weight");
        formData.delete("nutrition_goal_weight");
        formData.delete("activity_level");
      }

      formData.set("submitted_at", new Date().toISOString());
      formData.set("stripe_checkout_session_id", sessionId);
      formData.set("_subject", "New Anchored In 8 Onboarding Questionnaire");
      formData.set("_replyto", String(formData.get("email") || ""));

      const submittedFieldNames = Array.from(formData.keys());
      let timedOut = false;
      let responseStatus: number | null = null;
      let responseBody = "";

      console.info("Anchored In 8 onboarding submit started", {
        endpoint: ONBOARDING_FORM_ENDPOINT,
        submittedFieldNames,
      });

      let response: Response;
      try {
        response = await fetchWithTimeout(ONBOARDING_FORM_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
      } catch (error) {
        timedOut = error instanceof DOMException && error.name === "AbortError";
        throw new Error(timedOut ? "Formspree submission timed out" : "Formspree request failed");
      }

      responseStatus = response.status;
      responseBody = await response.text();

      console.info("Anchored In 8 onboarding submit response", {
        endpoint: ONBOARDING_FORM_ENDPOINT,
        status: responseStatus,
        timedOut,
        responseBody,
      });

      if (!response.ok) {
        throw new Error(`Formspree submission failed with status ${responseStatus}: ${responseBody}`);
      }

      const localResponse = Object.fromEntries(formData.entries());

      try {
        const existing = JSON.parse(localStorage.getItem("anchoredIn8Responses") || "[]");
        const submittedSessions = JSON.parse(localStorage.getItem("anchoredIn8SubmittedSessions") || "[]") as string[];
        localStorage.setItem("anchoredIn8Responses", JSON.stringify([...existing, localResponse]));
        localStorage.setItem("anchoredIn8LatestResponse", JSON.stringify(localResponse));
        localStorage.setItem("anchoredIn8SubmittedSessions", JSON.stringify([...submittedSessions, sessionId]));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown local backup error";
        console.warn("Anchored In 8 local backup failed after Formspree success", {
          message,
        });
      }

      shouldResetSubmitting = false;
      navigate({ to: "/anchored-in-8/confirmation" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown onboarding submission error";
      console.error("Anchored In 8 onboarding submit failed", {
        endpoint: ONBOARDING_FORM_ENDPOINT,
        message,
      });
      setSubmitError("We couldn’t submit your onboarding form. Your answers have not been lost. Please try again or contact Alli for help.");
      setSubmitDiagnostic(`Submission diagnostic: ${message}`);
    } finally {
      if (shouldResetSubmitting) {
        setSubmitting(false);
      }
    }
  };

  const handleInvalid = () => {
    console.info("Anchored In 8 onboarding browser validation blocked submission", {
      endpoint: ONBOARDING_FORM_ENDPOINT,
    });
    setSubmitDiagnostic("Submission diagnostic: browser validation blocked the request. Please complete the highlighted required fields.");
  };

  return (
    <SiteShell>
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Anchored In 8 Onboarding</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Tell me what you need from your 8-week plan.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Your answers help shape a program that fits your goals, training
            history, equipment, schedule, and current season of life.
          </p>
        </div>

        {verificationStatus === "checking" && (
          <div className="mt-14 bg-sand/50 border border-border p-8 md:p-10">
            <p className="text-muted-foreground">Verifying your Anchored In 8 purchase...</p>
          </div>
        )}

        {verificationStatus === "unverified" && (
          <div className="mt-14 bg-sand/50 border border-border p-8 md:p-10">
            <p className="text-muted-foreground leading-relaxed">
              We couldn’t verify your Anchored In 8 purchase. Please return to
              checkout or contact Alli for help.
            </p>
            {verificationReason && (
              <p className="mt-4 text-xs text-muted-foreground">
                Verification reason: {verificationReason}
              </p>
            )}
          </div>
        )}

        {verificationStatus === "submitted" && (
          <div className="mt-14 bg-sand/50 border border-border p-8 md:p-10">
            <p className="text-muted-foreground leading-relaxed">
              This Anchored In 8 questionnaire has already been submitted for
              this purchase.
            </p>
          </div>
        )}

        {verificationStatus === "verified" && (
        <form onSubmit={handleSubmit} onInvalidCapture={handleInvalid} className="mt-14 bg-sand/50 border border-border p-8 md:p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full Name" name="full_name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>

          <TextareaField label="Primary Goals" name="primary_goals" rows={4} />

          <TextareaField label="Describe what your current diet looks like." name="current_diet" rows={4} />

          <SelectField
            label="Would you like nutrition targets included with your program?"
            name="nutrition_targets_preference"
            onChange={handleNutritionTargetsChange}
            options={[
              "Yes, I'd like calories and macros calculated.",
              "No, I'd prefer to focus on training only.",
              "Not sure — I'd like your recommendation.",
            ]}
          />

          {wantsNutritionTargets === "Yes, I'd like calories and macros calculated." && (
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="Biological Sex"
                name="nutrition_biological_sex"
                options={["Female", "Male"]}
              />
              <Field label="Height" name="nutrition_height" type="text" placeholder="Feet/Inches or centimeters" required />
              <Field label="Current Weight" name="nutrition_current_weight" type="text" required />
              <Field
                label="Goal Weight (if applicable)"
                name="nutrition_goal_weight"
                type="text"
                helper="Leave blank if your goal is not weight-related."
              />
              <div className="md:col-span-2">
                <SelectField
                  label="Activity Level"
                  name="activity_level"
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
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <SelectField
              label="Experience Level"
              name="experience_level"
              options={["Beginner", "Returning after a break", "Intermediate", "Advanced"]}
            />
            <SelectField
              label="Workout Days Per Week"
              name="workout_days_per_week"
              options={["2 days", "3 days", "4 days", "5 days", "6+ days"]}
            />
          </div>

          <TextareaField label="Injuries or Limitations" name="injuries_or_limitations" rows={3} />
          <TextareaField label="Available Equipment" name="available_equipment" rows={3} />
          <TextareaField label="Schedule Notes" name="schedule_notes" rows={3} />
          <TextareaField label="Workout Preferences" name="workout_preferences" rows={3} />
          <TextareaField label="Anything Else the Coach Should Know" name="anything_else_the_coach_should_know" rows={4} />

          {submitError && (
            <p className="text-sm text-destructive leading-relaxed" role="alert">
              {submitError}
            </p>
          )}
          {submitDiagnostic && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {submitDiagnostic}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Onboarding"}
          </button>
        </form>
        )}
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  helper,
  ...rest
}: { label: string; helper?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <input
        {...rest}
        className="w-full bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-sage-deep transition-colors"
      />
      {helper && <span className="mt-2 block text-xs text-muted-foreground">{helper}</span>}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">{label}</span>
      <select
        name={name}
        required
        defaultValue=""
        onChange={onChange}
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
