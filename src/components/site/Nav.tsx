import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/meet-your-coach", label: "Meet Your Coach", hash: undefined },
  { to: "/coaching", label: "1:1 Coaching", hash: undefined },
  { to: "/anchored-in-8", label: "Anchored In 8", hash: undefined },
  { to: "/shop", label: "Shop Resources", hash: undefined },
  { to: "/results", label: "Client Stories", hash: undefined },
  { to: "/client-portal", label: "Client Portal", hash: undefined },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-tight uppercase">
          Anchored <span className="italic text-sage-deep">By Allise</span>
        </Link>

        <div className="hidden lg:flex items-center gap-9 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70">
          {links.slice(1).map((l) => (
            <Link
              key={`${l.to}-${l.hash ?? l.label}`}
              to={l.to}
              hash={l.hash}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/coaching"
            hash="apply"
            className="hidden sm:inline-flex bg-primary text-primary-foreground px-5 py-3 text-[10px] uppercase tracking-[0.22em] hover:bg-sage-deep transition-colors"
          >
            Apply Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container-page py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.hash ?? l.label}`}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.18em] text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/coaching"
              hash="apply"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex justify-center bg-primary text-primary-foreground px-5 py-3 text-[10px] uppercase tracking-[0.22em]"
            >
              Apply for 1:1 Coaching
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
