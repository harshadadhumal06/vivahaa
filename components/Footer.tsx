import { Instagram, Facebook, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <a href="#home" className="font-display text-2xl italic text-ivory">
          Evermore <span className="text-gold">&amp;</span> Co.
        </a>

        <p className="font-body text-xs text-ivory/45">
          &copy; {new Date().getFullYear()} Evermore &amp; Co. Wedding
          Planning Studio. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {[Instagram, Facebook, Music2].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social link"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/60 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
