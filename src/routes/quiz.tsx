import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizShell } from "@/components/QuizShell";
import manImg from "@/assets/man.jpg";
import womanImg from "@/assets/woman.jpg";
import symptomsWoman from "@/assets/symptoms-woman.png";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Avaliação Gratuita | Protocolo de Diabetes" },
      {
        name: "description",
        content:
          "Responda algumas perguntas rápidas sobre seus sintomas e descubra o protocolo de 14 dias para a diabetes tipo 2.",
      },
      { property: "og:title", content: "Avaliação Gratuita | Protocolo de Diabetes" },
      {
        property: "og:description",
        content: "Teste rápido e gratuito sobre seus sintomas de diabetes tipo 2.",
      },
    ],
  }),
  component: Quiz,
});

const TOTAL_STEPS = 3;

const SYMPTOMS_LEFT = ["VISÃO EMBAÇADA", "SEDE EXCESSIVA", "CANSAÇO", "NÁUSEA E VÔMITO"];
const SYMPTOMS_RIGHT = ["DORES NAS PERNAS", "FORMIGAMENTO", "INSONIA", "FADIGA"];

function Quiz() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  return (
    <QuizShell progress={(step / (TOTAL_STEPS + 1)) * 100}>
      {step === 1 && (
        <section>
          <h1 className="text-center text-2xl font-black sm:text-3xl">
            Vamos iniciar sua avaliação
          </h1>
          <p className="mt-4 text-center text-lg font-bold">Selecione sua opção abaixo!</p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <GenderCard img={manImg} label="Sou Homem" onClick={next} />
            <GenderCard img={womanImg} label="Sou mulher" onClick={next} />
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1 className="text-center text-xl font-black uppercase leading-tight sm:text-2xl">
            Você sente algum desses sintomas{" "}
            <span className="text-brand-green">a mais de 1 ano ?</span>
          </h1>

          <div className="relative mt-6 flex items-end justify-center">
            <img
              src={symptomsWoman}
              alt="Mulher idosa sentada com sintomas de diabetes"
              width={700}
              height={800}
              loading="lazy"
              className="h-64 w-auto object-contain sm:h-72"
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-3">
              <div className="flex flex-col items-start gap-3">
                {SYMPTOMS_LEFT.map((s, i) => (
                  <Pill key={s} style={{ marginLeft: `${i % 2 === 0 ? 0 : 4}px` }}>
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-end justify-center gap-3">
              {SYMPTOMS_RIGHT.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <BigButton onClick={next}>Sinto mais de 1 🤧</BigButton>
            <BigButton onClick={next}>Sinto 2 ou mais 🤦</BigButton>
          </div>
        </section>
      )}

      {step === 3 && <StepDesparasitou />}
    </QuizShell>
  );
}

function StepDesparasitou() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section>
      <h1 className="text-center text-2xl font-black leading-tight sm:text-[1.7rem]">
        Você já <span className="text-brand-green">Desparasitou</span> de alguma maneira?
      </h1>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Utilizando remédios ou formas naturais.
      </p>
      <div className="mt-7 space-y-4">
        {[
          { emoji: "😐", label: "Não, eu nunca desparasitei." },
          { emoji: "😁", label: "Sim, eu já desparasitei." },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setChoice(opt.label)}
            className="flex w-full items-center gap-4 rounded-xl bg-brand-green px-4 py-4 text-left text-primary-foreground shadow-md transition-colors hover:bg-primary-strong"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span
              className={`h-5 w-5 shrink-0 rounded-full border-2 border-primary-foreground ${
                choice === opt.label ? "bg-primary-foreground" : ""
              }`}
            />
            <span className="text-sm font-bold sm:text-base">{opt.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function GenderCard({
  img,
  label,
  onClick,
}: {
  img: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="overflow-hidden rounded-xl border border-border bg-card p-2 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <img
        src={img}
        alt={label}
        width={600}
        height={700}
        className="aspect-[4/5] w-full rounded-lg object-cover"
      />
      <span className="block px-1 py-3 text-sm font-bold sm:text-base">{label}</span>
    </button>
  );
}

function Pill({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className="rounded-full bg-brand-green px-3 py-1.5 text-[0.6rem] font-bold uppercase text-primary-foreground shadow sm:text-xs"
    >
      {children}
    </span>
  );
}

function BigButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl bg-brand-green px-6 py-5 text-base font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary-strong"
    >
      {children}
    </button>
  );
}
