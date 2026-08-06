import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizShell } from "@/components/QuizShell";
import manImg from "@/assets/man.jpg";
import womanImg from "@/assets/woman.jpg";
import symptomsWoman from "@/assets/symptoms-woman.png";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Free Assessment | The Diabetes Protocol" },
      {
        name: "description",
        content:
          "Answer a few quick questions about your symptoms and discover the 14-day type 2 diabetes protocol.",
      },
      { property: "og:title", content: "Free Assessment | The Diabetes Protocol" },
      {
        property: "og:description",
        content: "Free quick test about your type 2 diabetes symptoms.",
      },
    ],
  }),
  component: Quiz,
});

const TOTAL_STEPS = 3;

const SYMPTOMS_LEFT = ["BLURRY VISION", "EXCESSIVE THIRST", "TIREDNESS", "NAUSEA & VOMITING"];
const SYMPTOMS_RIGHT = ["LEG PAIN", "TINGLING", "INSOMNIA", "FATIGUE"];

function Quiz() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  return (
    <QuizShell progress={(step / (TOTAL_STEPS + 1)) * 100}>
      {step === 1 && (
        <section>
          <h1 className="text-center text-2xl font-black sm:text-3xl">
            Let's start your assessment
          </h1>
          <p className="mt-4 text-center text-lg font-bold">Select your option below!</p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <GenderCard img={manImg} label="I'm a man" onClick={next} />
            <GenderCard img={womanImg} label="I'm a woman" onClick={next} />
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1 className="text-center text-xl font-black uppercase leading-tight sm:text-2xl">
            Do you feel any of these symptoms{" "}
            <span className="text-brand-green">for more than 1 year?</span>
          </h1>

          <div className="relative mt-6 flex items-end justify-center">
            <img
              src={symptomsWoman}
              alt="Older woman seated with diabetes symptoms"
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
            <BigButton onClick={next}>I feel 1 or more 🤧</BigButton>
            <BigButton onClick={next}>I feel 2 or more 🤦</BigButton>
          </div>
        </section>
      )}

      {step === 3 && <StepDeworming />}
    </QuizShell>
  );
}

function StepDeworming() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section>
      <h1 className="text-center text-2xl font-black leading-tight sm:text-[1.7rem]">
        Have you ever <span className="text-brand-green">dewormed</span> in any way?
      </h1>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Using medication or natural methods.
      </p>
      <div className="mt-7 space-y-4">
        {[
          { emoji: "😐", label: "No, I have never dewormed." },
          { emoji: "😁", label: "Yes, I have dewormed before." },
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
