import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizShell } from "@/components/QuizShell";
import manImg from "@/assets/man.webp";
import womanImg from "@/assets/woman.webp";
import symptomsWoman from "@/assets/symptoms-woman.webp";
import brainScan from "@/assets/brain-scan.webp";
import glucoseHigh from "@/assets/glucose-high.webp";
import glucoseNormal from "@/assets/glucose-normal.webp";
import avatarAna from "@/assets/avatar-ana.webp";
import avatarRita from "@/assets/avatar-rita.webp";

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

const TOTAL_STEPS = 9;

const SYMPTOMS_LEFT = ["BLURRY VISION", "EXCESSIVE THIRST", "TIREDNESS", "NAUSEA"];
const SYMPTOMS_RIGHT = ["LEG PAIN", "TINGLING", "INSOMNIA", "FATIGUE"];

const SYMPTOM_LIST = [
  "INSOMNIA",
  "FATIGUE",
  "EXCESSIVE THIRST",
  "TINGLING",
  "BLURRY VISION",
  "BODY ACHES",
];

function Quiz() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  return (
    <QuizShell progress={(step / TOTAL_STEPS) * 100}>
      {step === 1 && <StepGender onNext={next} />}
      {step === 2 && <StepSymptomsIllustration onNext={next} />}
      {step === 3 && <StepDeworming onNext={next} />}
      {step === 4 && <StepNewsWarning onNext={next} />}
      {step === 5 && <StepAwareness onNext={next} />}
      {step === 6 && <StepSweets onNext={next} />}
      {step === 7 && <StepSymptomPicker onNext={next} />}
      {step === 8 && <StepImpact onNext={next} />}
      {step === 9 && <StepResults />}
    </QuizShell>
  );
}

/* ---------- Step 1 ---------- */

function StepGender({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>Let&apos;s start your assessment</Heading>
      <Sub>Select your option below</Sub>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <GenderCard img={manImg} label="I'm a man" onClick={onNext} />
        <GenderCard img={womanImg} label="I'm a woman" onClick={onNext} />
      </div>
    </section>
  );
}

/* ---------- Step 2 ---------- */

function StepSymptomsIllustration({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Have you felt any of these symptoms{" "}
        <span className="text-brand-green">for more than 1 year?</span>
      </Heading>

      <div className="relative mx-auto mt-6 w-full max-w-[22rem]">
        <img
          src={symptomsWoman}
          alt="Older woman sitting with diabetes symptoms"
          width={768}
          height={896}
          loading="lazy"
          className="mx-auto h-56 w-auto object-contain sm:h-64"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-2">
          {SYMPTOMS_LEFT.map((s, i) => (
            <div key={s} className={i % 2 === 0 ? "flex" : "flex pl-2"}>
              <Pill>{s}</Pill>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-2">
          {SYMPTOMS_RIGHT.map((s, i) => (
            <div key={s} className={i % 2 === 0 ? "flex justify-end" : "flex justify-end pr-2"}>
              <Pill>{s}</Pill>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-3">
        <OptionButton emoji="🤧" onClick={onNext}>
          I feel 1 or more
        </OptionButton>
        <OptionButton emoji="🤦" onClick={onNext}>
          I feel 2 or more
        </OptionButton>
      </div>
    </section>
  );
}

/* ---------- Step 3 ---------- */

function StepDeworming({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section>
      <Heading>
        Have you ever <span className="text-brand-green">dewormed</span> in any way?
      </Heading>
      <Sub>Using medication or natural methods.</Sub>
      <div className="mt-6 space-y-3">
        {[
          { emoji: "😐", label: "No, I have never dewormed." },
          { emoji: "😁", label: "Yes, I have dewormed before." },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => {
              setChoice(opt.label);
              onNext();
            }}
            className="flex w-full items-center gap-3 rounded-xl bg-brand-green px-4 py-4 text-left text-primary-foreground shadow-md transition-colors hover:bg-primary-strong"
          >
            <span className="shrink-0 text-xl">{opt.emoji}</span>
            <span
              className={`h-5 w-5 shrink-0 rounded-full border-2 border-primary-foreground ${
                choice === opt.label ? "bg-primary-foreground" : ""
              }`}
            />
            <span className="min-w-0 text-sm font-bold leading-snug sm:text-[0.95rem]">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Step 4 ---------- */

function StepNewsWarning({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <h2 className="text-center text-[1.05rem] font-black leading-snug sm:text-xl">
        <span className="text-destructive">
          If you have never done a Natural Deworming, be careful:
        </span>{" "}
        worms can multiply in your body and reach vital organs like the brain, heart and lungs.
        Don&apos;t ignore this risk —{" "}
        <span className="text-brand-green">
          deworming at least once a year is essential!
        </span>
      </h2>

      <p className="mt-5 text-center text-sm font-bold underline sm:text-base">
        See this news report 👇
      </p>

      <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={newsArticle.url}
          alt="News report: young man dies after parasites are found in his brain, with MRI exam showing nodules caused by parasite eggs"
          width={900}
          height={1489}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </figure>


      <CtaButton onClick={onNext}>Continue</CtaButton>
    </section>
  );
}

/* ---------- Step 5 ---------- */

function StepAwareness({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Are you aware that{" "}
        <span className="text-brand-green">not taking care of this</span> can worsen your diabetes
        and leave damage that may be irreversible?
      </Heading>
      <Sub>Please be honest.</Sub>
      <div className="mt-6 space-y-3">
        <OptionButton emoji="🥵" onClick={onNext}>
          Yes, I know how serious it is to have parasites living in my gut.
        </OptionButton>
        <OptionButton emoji="😨" onClick={onNext}>
          I didn&apos;t know it was serious, but I want to take care of it.
        </OptionButton>
      </div>
    </section>
  );
}

/* ---------- Step 6 ---------- */

function StepSweets({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Do you agree that most of the time{" "}
        <span className="text-brand-green">eating too many sweets and poor food choices</span>{" "}
        aren&apos;t our fault — that we get labelled as undisciplined when our body is actually
        inflamed by intestinal parasites?
      </Heading>
      <Sub>Please be sincere, I want to help!</Sub>
      <div className="mt-6 space-y-3">
        <OptionButton onClick={onNext}>I totally agree!</OptionButton>
        <OptionButton onClick={onNext}>I partly agree.</OptionButton>
      </div>
    </section>
  );
}

/* ---------- Step 7 ---------- */

function StepSymptomPicker({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <section>
      <Heading>
        Among the <span className="text-brand-green">symptoms listed below</span>, which bother you
        the most?
      </Heading>
      <Sub>Select one or more.</Sub>
      <div className="mt-6 space-y-2.5">
        {SYMPTOM_LIST.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                active
                  ? "border-brand-green bg-brand-green text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-brand-green"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-[0.7rem] font-black ${
                  active ? "border-primary-foreground" : "border-border"
                }`}
              >
                {active ? "✓" : ""}
              </span>
              <span className="min-w-0 text-sm font-semibold tracking-wide sm:text-[0.95rem]">
                {s}
              </span>
            </button>
          );
        })}
      </div>
      <CtaButton onClick={onNext} disabled={selected.length === 0}>
        Continue
      </CtaButton>
    </section>
  );
}

/* ---------- Step 8 ---------- */

function StepImpact({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Have the symptoms you selected{" "}
        <span className="text-brand-green">been disrupting your life?</span>
      </Heading>
      <div className="mt-6 space-y-3">
        <OptionButton emoji="☑️" onClick={onNext}>
          Yes, a lot!
        </OptionButton>
        <OptionButton emoji="😅" onClick={onNext}>
          Yes, it&apos;s so normal in my life that I got used to it.
        </OptionButton>
        <OptionButton emoji="🤯" onClick={onNext}>
          If you hadn&apos;t told me, I wouldn&apos;t even know it could be parasites.
        </OptionButton>
        <OptionButton emoji="😌" onClick={onNext}>
          No, it doesn&apos;t bother me.
        </OptionButton>
      </div>
    </section>
  );
}

/* ---------- Step 9 ---------- */

function StepResults() {
  const [playing, setPlaying] = useState(false);

  return (
    <section>
      <div className="rounded-xl bg-brand-green px-4 py-4 text-primary-foreground shadow-md sm:px-5">
        <p className="text-sm font-black sm:text-base">⚠️ The results don&apos;t lie:</p>
        <p className="mt-1.5 text-[0.85rem] font-semibold leading-relaxed sm:text-sm">
          Your symptoms point to something very dangerous —{" "}
          <span className="underline">listen carefully!</span>
        </p>
      </div>

      <p className="mt-6 text-center text-sm font-bold sm:text-base">
        Listen to this quick explanation 👇
      </p>
      <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
        If the audio doesn&apos;t start, just tap it.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-card p-3.5 shadow-sm sm:p-4">
        <p className="text-xs font-bold sm:text-sm">Ana Lima</p>
        <div className="mt-2.5 flex items-center gap-3">
          <img
            src={avatarAna}
            alt="Ana Lima"
            width={160}
            height={160}
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-muted px-3 py-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause audio" : "Play audio"}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div className="flex min-w-0 flex-1 items-end gap-[2px] overflow-hidden">
              {Array.from({ length: 34 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] shrink-0 rounded-full bg-muted-foreground/60"
                  style={{ height: `${6 + ((i * 7) % 16)}px` }}
                />
              ))}
            </div>
            <span className="shrink-0 text-[0.7rem] font-semibold text-muted-foreground">
              00:33
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-center text-lg font-black sm:text-xl">Just look at this case</h3>
      <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
        1 week after starting the deworming
      </p>

      <div className="mt-4 grid grid-cols-2 gap-1.5 overflow-hidden rounded-xl">
        <img
          src={glucoseHigh}
          alt="Glucose meter reading 240 mg/dL before the protocol"
          width={600}
          height={600}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />
        <img
          src={glucoseNormal}
          alt="Glucose meter reading 105 mg/dL after the protocol"
          width={600}
          height={600}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />
      </div>

      <div className="mt-5 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={avatarRita}
            alt="Rita Lima"
            width={160}
            height={160}
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Rita Lima</p>
            <p className="truncate text-xs text-brand-green">Porto Alegre, BR</p>
          </div>
        </div>
        <p className="mt-3 text-[0.85rem] leading-relaxed text-muted-foreground sm:text-sm">
          Thank you so much Ana, I&apos;ve been deworming for 30 days and my glucose levels are
          stable. I&apos;m so happy about this victory in my life 🎁 you were an angel.
        </p>
      </div>

      <CtaButton>Continue</CtaButton>
    </section>
  );
}

/* ---------- Shared UI ---------- */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-balance text-center text-[1.15rem] font-black leading-snug sm:text-[1.45rem]">
      {children}
    </h1>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2.5 text-center text-[0.85rem] text-muted-foreground sm:text-[0.95rem]">
      {children}
    </p>
  );
}

function OptionButton({
  children,
  emoji,
  onClick,
}: {
  children: React.ReactNode;
  emoji?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-green px-4 py-3.5 text-center text-primary-foreground shadow-md transition-colors hover:bg-primary-strong active:scale-[0.99] sm:py-4"
    >
      {emoji ? <span className="shrink-0 text-lg">{emoji}</span> : null}
      <span className="min-w-0 text-sm font-bold leading-snug sm:text-[0.95rem]">{children}</span>
    </button>
  );
}

function CtaButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-7 w-full rounded-xl bg-brand-green px-5 py-4 text-base font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary-strong disabled:opacity-50 sm:text-lg"
    >
      {children}
    </button>
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
      className="overflow-hidden rounded-xl border border-border bg-card p-1.5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <img
        src={img}
        alt={label}
        width={600}
        height={750}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-lg object-cover"
      />
      <span className="block px-1 pb-1.5 pt-2.5 text-center text-[0.85rem] font-bold sm:text-[0.95rem]">
        {label}
      </span>
    </button>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-green px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-wide text-primary-foreground shadow sm:text-[0.65rem]">
      {children}
    </span>
  );
}
