import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <div className="font-serif text-2xl uppercase tracking-tight">
              Anchored <span className="italic text-sage-deep">By Allise</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Sustainable strength and unbreakable confidence for women,
              built through realistic training and accountability-focused
              coaching.
            </p>
            <div className="mt-6 flex items-center gap-4 text-foreground/70">
              <a href="https://www.instagram.com/allisehelmes/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-sage-deep transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="mailto:Allisehelmes@gmail.com" aria-label="Email" className="hover:text-sage-deep transition-colors">
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li><Link to="/meet-your-coach" className="hover:text-foreground">Meet Your Coach</Link></li>
              <li><Link to="/coaching" className="hover:text-foreground">1:1 Coaching</Link></li>
              <li><Link to="/shop" className="hover:text-foreground">Shop Resources</Link></li>
              <li><Link to="/results" className="hover:text-foreground">Client Results</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get sustainable training and nutrition notes, twice a month.
            </p>
            <p className="text-sm text-muted-foreground">
              Sign up on the home or shop resources pages.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Anchored By Allise. All rights reserved.</p>
          <p>Built with intention.</p>
        </div>
      </div>
    </footer>
  );
}
