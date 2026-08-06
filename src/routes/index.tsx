import { createFileRoute, Link } from "@tanstack/react-router";
import glucoseHigh from "@/assets/glucose-high.jpg";
import glucoseNormal from "@/assets/glucose-normal.jpg";
import parasite from "@/assets/parasite.jpg";
import womanTest from "@/assets/woman-test.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Truque Caseiro de 14 Dias | Protocolo de Diabetes" },
      {
        name: "description",
        content:
          "Responda o teste gratuito e descubra o truque caseiro de 14 dias que está eliminando o parasita diabético e acabando com a diabetes tipo 2.",
      },
      { property: "og:title", content: "Truque Caseiro de 14 Dias | Protocolo de Diabetes" },
      {
        property: "og:description",
        content:
          "Teste gratuito: aprenda como eliminar esse parasita do seu corpo e ficar livre da diabetes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-center text-[1.65rem] font-black uppercase leading-[1.15] tracking-tight sm:text-3xl">
          <span className="mr-1 inline-block bg-foreground px-2 py-0.5 text-background">
            URGENTE:
          </span>
          <span className="text-brand-green"> TRUQUE CASEIRO DE 14 DIAS</span> ESTÁ ELIMINANDO{" "}
          <span className="text-brand-green">PARASITA DIABETICO</span> E ACABANDO COM A DIABETES
          TIPO 2.
        </h1>

        <p className="mt-5 text-center text-[0.8rem] font-bold uppercase leading-snug text-foreground">
          RESPONDA ESSE RÁPIDO TESTE GRATUITO E APRENDA COMO{" "}
          <span className="text-brand-green">ELIMINAR ESSE PARASITA DO SEU CORPO</span> E FICAR
          LIVRE DA DIABETES.
        </p>

        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-2 gap-3 rounded-xl border-4 border-brand-green-light p-1.5">
            <img
              src={glucoseHigh}
              alt="Medidor de glicose marcando 588 mg/dL"
              width={600}
              height={600}
              className="aspect-square w-full rounded-lg object-cover"
            />
            <img
              src={glucoseNormal}
              alt="Medidor de glicose marcando 107 mg/dL"
              width={600}
              height={600}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-xl border-4 border-brand-green-light p-1.5">
            <div className="relative">
              <img
                src={parasite}
                alt="Parasita visto no microscópio"
                width={600}
                height={600}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-wide text-foreground">
                ← Parasita
              </span>
            </div>
            <img
              src={womanTest}
              alt="Pessoa medindo a glicose com aparelho digital"
              width={600}
              height={600}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <Link
          to="/quiz"
          className="mt-8 flex w-full items-center justify-center rounded-lg bg-brand-green px-6 py-5 text-center text-base font-bold uppercase text-primary-foreground shadow-lg transition-transform hover:bg-primary-strong active:scale-[0.99]"
        >
          Quero aprender também !
        </Link>
      </div>
    </main>
  );
}
