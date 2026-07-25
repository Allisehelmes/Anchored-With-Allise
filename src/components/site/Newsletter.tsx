import { useEffect, useRef } from "react";

export function Newsletter() {
  const kitFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = kitFormRef.current;

    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = "4ee7d5cfa6";
    script.src = "https://anchored-with-allise.kit.com/4ee7d5cfa6/index.js";
    container.appendChild(script);
  }, []);

  return (
    <section className="bg-sand/60 border-y border-border/60">
      <div className="container-page py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow mb-4">Stay Anchored</p>
          <h2 className="font-serif text-3xl md:text-4xl text-balance leading-tight">
            Twice-monthly notes on training, nutrition, and the mindset behind real results.
          </h2>
        </div>
        <div ref={kitFormRef} className="w-full max-w-md md:justify-self-end" />
      </div>
    </section>
  );
}
