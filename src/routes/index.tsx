import { createFileRoute, Link } from "@tanstack/react-router";
import hero480 from "@/assets/hero-480.webp.asset.json";
import hero768 from "@/assets/hero-768.webp.asset.json";
import hero1024 from "@/assets/hero-1024.webp.asset.json";

const HERO_SRCSET = `${hero480.url} 480w, ${hero768.url} 768w, ${hero1024.url} 1024w`;
const HERO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 600px, 512px";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "14-Day Home Trick | Type 2 Diabetes Protocol" },
      {
        name: "description",
        content:
          "Take the free quick test and discover how to flush out the diabetes parasite and be free from type 2 diabetes.",
      },
      { property: "og:title", content: "14-Day Home Trick | Type 2 Diabetes Protocol" },
      {
        property: "og:description",
        content:
          "Free quick test: learn how to eliminate this parasite from your body and be free from diabetes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: hero768.url,
        imagesrcset: HERO_SRCSET,
        imagesizes: HERO_SIZES,
        fetchpriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background px-3 pb-8 pt-4 sm:px-5 sm:pt-6 md:pt-10">
      <div className="mx-auto w-full max-w-[34rem] md:max-w-[38rem]">
        <h1 className="sr-only">
          Urgent: flush out a 14-day diabetes parasite and end type 2 diabetes
        </h1>

        <img
          src={hero768.url}
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
          alt="Before and after glucose readings and the diabetes parasite seen under a microscope"
          width={1024}
          height={1536}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="mx-auto block h-auto w-full max-w-full rounded-xl"
        />

        <Link
          to="/quiz"
          className="btn-glow mt-5 flex w-full items-center justify-center rounded-xl bg-brand-green px-4 py-[1.15rem] text-center text-[1rem] font-black uppercase leading-tight tracking-tight text-primary-foreground shadow-lg hover:bg-primary-strong active:scale-[0.99] sm:mt-7 sm:py-5 sm:text-lg"
        >
          I want to learn it too!
        </Link>

        <p className="mt-3 text-center text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">
          Free quick test &middot; Takes less than 1 minute
        </p>
      </div>
    </main>
  );
}
