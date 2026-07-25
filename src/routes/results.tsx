import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Client Stories — Anchored By Allise" },
      { name: "description", content: "Client reviews and success stories from women coached by Allise." },
      { property: "og:title", content: "Client Stories" },
      { property: "og:description", content: "Read client reviews from real women coached by Allise." },
      { property: "og:url", content: "/results" },
    ],
    links: [{ rel: "canonical", href: "/results" }],
  }),
  component: Results,
});

const testimonials = [
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
    name: "Susan R.",
    preview: "The personal attention I received from Alli was exceptional. She was able to take into consideration my individual needs.",
    full: "Alli worked with me both before and after a knee surgery. She was able to tailor my workout to accommodate this. Not only did she push me to reach higher levels, she also did it with so much kindness that I was able to reach my goals. As Alli pushed me to do this, I became the strongest I've ever been. I'm able to do things I never thought I could do! Her calm and steady personality enables her to engage with clients in a positive and supportive way. I'm very grateful for her contributions in helping to make me more confident, both physically and mentally.",
  },
  {
    name: "Heidi L.",
    preview: "If you're looking for a trainer who knows how to meet you where you are and help you reach your goals, I can't recommend Alli enough.",
    full: "After finishing physical therapy for a broken leg, I wanted to continue rebuilding my strength, but I knew I needed guidance. I've always been an active person, but lifting weights has never been my favorite way to work out. Working with Alli has completely changed my perspective. She makes every workout enjoyable, keeps me motivated, and has done an incredible job tailoring my training around my movement limitations while helping me steadily build strength and confidence. I always leave feeling challenged in the best way. I'm so grateful for Alli's knowledge, encouragement, and positive attitude.",
  },
  {
    name: "Mark M.",
    preview: "This is the first time I have worked with a trainer, but Alli makes it seem easy.",
    full: "I have an exercise program with Alli 3 times a week. She designed a program for me based on the muscles I need to strengthen. She shows me how to do the various exercises and raises the number of reps I need to do if needed based on my progress. But she brings something more than just good training. She jokes with me and we talk about sports and other news. It really makes the time fly by so that I look forward to each session. She is also very supportive when I complete a session. This makes me feel that I am making progress. Each session is really the highlight of my day.",
  },
  {
    name: "Tammy D.",
    preview: "Allise is so professional, patient and knowledgeable. She answers all my questions in regard to fitness and nutrition.",
    full: "She also makes the most awesome suggestions. Working with Allise is awesome because I'm learning form, while lifting and finally using the entire gym instead of just cardio and machines. I'm learning what exercises to do to target each muscle group. She is extremely patient. I left the gym today feeling really accomplished and finally understanding what I'm doing. Thank you, Alli, for being so awesome!!",
  },
];

function Results() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <SiteShell>
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl text-center mx-auto mb-14">
          <p className="eyebrow mb-5">Client Stories</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-balance">
            Real stories from people who finally started prioritizing themselves.
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Reviews from clients who built strength, confidence, and habits
            that support their real lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isExpanded = expanded === index;

            return (
              <article key={testimonial.name} className="bg-background border border-border p-7 flex flex-col">
                <p className="font-serif italic text-lg leading-snug">
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
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:text-sage-deep hover:border-sage-deep transition-colors"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container-page max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Your story could be next.</h2>
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
