import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_40%,rgba(201,169,106,0.10),transparent_70%)]" />
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-[22vw] font-light leading-none text-pearl/90 md:text-[12rem]">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg text-mist">
        This address doesn&apos;t exist in our collection. Perhaps something more
        extraordinary awaits.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 font-medium text-ink transition-all hover:shadow-[0_0_40px_-8px_rgba(201,169,106,0.6)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Return home
      </Link>
    </div>
  );
}
