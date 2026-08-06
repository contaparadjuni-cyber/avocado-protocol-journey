import { createFileRoute, Link } from "@tanstack/react-router";
import heroMockup from "@/assets/hero-mockup.png.asset.json";

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
      { rel: "preload", as: "image", href: heroMockup.url, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="sr-only">
          Urgent: flush out a 14-day diabetes parasite and end type 2 diabetes
        </h1>

        <img
          src={heroMockup.url}
          alt="Before and after glucose readings and the diabetes parasite seen under a microscope"
          width={1024}
          height={1536}
          decoding="async"
          fetchPriority="high"
          className="block h-auto w-full rounded-xl"
        />

        <Link
          to="/quiz"
          className="mt-5 flex w-full items-center justify-center rounded-lg bg-brand-green px-5 py-4 text-center text-[0.95rem] font-bold uppercase leading-tight text-primary-foreground shadow-lg transition-transform hover:bg-primary-strong active:scale-[0.99] sm:mt-8 sm:py-5 sm:text-base"
        >
          I want to learn it too!
        </Link>
      </div>
    </main>
  );
}
