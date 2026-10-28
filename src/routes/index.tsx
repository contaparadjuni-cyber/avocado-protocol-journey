import { createFileRoute, Link } from "@tanstack/react-router";
import hero480 from "@/assets/hero-v2-480.webp.asset.json";
import hero768 from "@/assets/hero-v2-768.webp.asset.json";
import hero1024 from "@/assets/hero-v2-1024.webp.asset.json";

const HERO_SRCSET = `${hero480.url} 480w, ${hero768.url} 768w, ${hero1024.url} 1024w`;
const HERO_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 600px, 512px";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método Caseiro de 14 Dias | Protocolo para Diabetes Tipo 2" },
      {
        name: "description",
        content:
          "Faça o teste rápido gratuito e conheça o protocolo de 14 dias para diabetes tipo 2.",
      },
      { property: "og:title", content: "Método Caseiro de 14 Dias | Protocolo para Diabetes Tipo 2" },
      {
        property: "og:description",
        content:
          "Teste rápido gratuito: conheça o protocolo de 14 dias para diabetes tipo 2.",
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
          Conheça o protocolo de 14 dias para diabetes tipo 2
        </h1>

        <img
          src={hero768.url}
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
          alt="Guia informativo sobre diabetes tipo 2, com leituras de glicose antes e depois e imagens ilustrativas"
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
          Também quero conhecer!
        </Link>

        <p className="mt-3 text-center text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">
          Teste rápido gratuito &middot; Demora menos de 1 minuto
        </p>
      </div>
    </main>
  );
}
