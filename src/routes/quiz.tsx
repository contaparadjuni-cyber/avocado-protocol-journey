import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QuizShell } from "@/components/QuizShell";
import manImg from "@/assets/man.webp";
import womanImg from "@/assets/woman.webp";
import symptomsWoman from "@/assets/symptoms-woman.webp";
import news600 from "@/assets/news-600.webp.asset.json";
import news900 from "@/assets/news-900.webp.asset.json";
import { SmartImage } from "@/components/SmartImage";
import glucoseBeforeAfter from "@/assets/glucose-before-after.webp.asset.json";

import avatarAna from "@/assets/avatar-ana.webp";
import avatarRita from "@/assets/avatar-rita.webp";
import parasiteIntestine from "@/assets/parasite-intestine.webp";
import avocadoImg from "@/assets/avocado.webp";
import audioAna from "@/assets/diabetes-protocol-audio.mp3.asset.json";
import audioProof from "@/assets/diabetes-protocol-audio-2.mp3.asset.json";
import glucose14DaysV2 from "@/assets/glucose-14days-v2.png.asset.json";
import slide588 from "@/assets/slide-588.webp.asset.json";
import slide198 from "@/assets/slide-198.webp.asset.json";
import slide108 from "@/assets/slide-108.webp.asset.json";
import remediesVsProtocol from "@/assets/remedies-vs-protocol.webp.asset.json";

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

const TOTAL_STEPS = 17;

const SYMPTOMS_LEFT = ["BLURRY VISION", "EXCESSIVE THIRST", "TIREDNESS", "NAUSEA"];
const SYMPTOMS_RIGHT = ["LEG PAIN", "TINGLING", "INSOMNIA", "FATIGUE"];

const SYMPTOM_LIST = [
  { label: "INSOMNIA", emoji: "😴" },
  { label: "FATIGUE", emoji: "🥱" },
  { label: "EXCESSIVE THIRST", emoji: "🥤" },
  { label: "TINGLING", emoji: "🦶" },
  { label: "BLURRY VISION", emoji: "👁️" },
  { label: "BODY ACHES", emoji: "💪" },
];


function Quiz() {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  // Warm the heavy news image up one step before it is shown.
  useEffect(() => {
    if (step !== 3) return;
    const img = new Image();
    img.src = news900.url;
  }, [step]);



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
      {step === 9 && <StepResults onNext={next} />}
      {step === 10 && <StepInterest onNext={next} />}
      {step === 11 && <StepMedications onNext={next} />}
      {step === 12 && <StepMonitoring onNext={next} />}
      {step === 13 && <StepCommitment onNext={next} />}
      {step === 14 && <StepAudioProof onNext={next} />}
      {step === 15 && <StepAnalyzing onNext={next} />}
      {step === 16 && <StepComparison onNext={next} />}
      {step === 17 && <StepProtocol />}
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
          decoding="async"
          fetchPriority="high"
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
            className="btn-glow flex w-full items-center gap-3 rounded-xl bg-brand-green px-4 py-4 text-left text-primary-foreground shadow-md hover:bg-primary-strong active:scale-[0.99]"
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
        <SmartImage
          src={news900.url}
          srcSet={`${news600.url} 600w, ${news900.url} 900w`}
          sizes="(max-width: 640px) 100vw, 600px"
          alt="News report: young man dies after parasites are found in his brain, with MRI exam showing nodules caused by parasite eggs"
          width={900}
          height={1490}
          className="object-contain"
          wrapperClassName="w-full"
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
  const [error, setError] = useState(false);
  const toggle = (s: string) => {
    setError(false);
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  return (
    <section>
      <Heading>
        Among the <span className="text-brand-green">symptoms listed below</span>, which bother you
        the most?
      </Heading>
      <Sub>Select one or more.</Sub>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {SYMPTOM_LIST.map(({ label, emoji }) => {
          const active = selected.includes(label);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(label)}
              className={`btn-glow flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left active:scale-[0.99] ${
                active
                  ? "border-brand-green bg-brand-green text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-brand-green hover:bg-muted/40"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-lg ${
                  active ? "bg-primary-foreground/20" : "bg-muted"
                }`}
              >
                {emoji}
              </span>
              <span className="min-w-0 flex-1 text-[0.9rem] font-bold uppercase tracking-wide sm:text-[0.95rem]">
                {label}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-[0.7rem] font-black transition-colors ${
                  active
                    ? "border-primary-foreground bg-primary-foreground text-brand-green"
                    : "border-border text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[0.8rem] font-semibold text-muted-foreground sm:text-sm">
        {selected.length === 0
          ? "Select at least one symptom to continue"
          : `${selected.length} symptom${selected.length > 1 ? "s" : ""} selected`}
      </p>

      <ValidationMessage
        show={error}
        message="Please select at least one symptom to continue."
      />

      <CtaButton
        onClick={() => (selected.length === 0 ? setError(true) : onNext())}
        invalid={error}
      >
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

function StepResults({ onNext }: { onNext: () => void }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnd = () => setPlaying(false);
    el.addEventListener("ended", onEnd);
    return () => el.removeEventListener("ended", onEnd);
  }, []);

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
        <p className="text-xs font-bold sm:text-sm">Lerato</p>
        <div className="mt-2.5 flex items-center gap-3">
          <SmartImage
            src={avatarAna}
            alt="Lerato"
            width={160}
            height={160}
            wrapperClassName="h-10 w-10 shrink-0 rounded-full"
          />

          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-muted px-3 py-2">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={playing ? "Pause Lerato's audio message" : "Play Lerato's audio message"}
              aria-pressed={playing}
              aria-controls="lerato-audio"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <audio id="lerato-audio" ref={audioRef} src={audioAna.url} preload="none" />
            <span className="sr-only" aria-live="polite">
              {playing ? "Audio playing" : "Audio paused"}
            </span>
            <div
              aria-hidden="true"
              className="flex min-w-0 flex-1 items-end gap-[2px] overflow-hidden"
            >

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


      <h3 className="mt-8 text-balance text-center text-lg font-black leading-snug sm:text-xl">
        Just look at this case
      </h3>
      <p className="mx-auto mt-1.5 max-w-[22rem] text-center text-xs leading-snug text-muted-foreground sm:text-sm">
        1 week after starting the deworming
      </p>

      <figure
        role="group"
        aria-labelledby="glucose-caption"
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <SmartImage
          src={glucoseBeforeAfter.url}
          alt="Two Accu-Chek glucose meters side by side: the left one reads 240 mg/dL before the protocol, the right one reads 105 mg/dL one week after the deworming protocol."
          width={701}
          height={688}
          className="object-contain"
          wrapperClassName="w-full bg-muted"
        />
        <figcaption
          id="glucose-caption"
          className="grid grid-cols-2 divide-x divide-border border-t border-border"
        >
          <span
            aria-label="Before the protocol: 240 milligrams per deciliter"
            className="flex min-w-0 flex-col items-center gap-0.5 px-2 py-2.5 text-center"
          >
            <span className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-muted-foreground sm:text-[0.7rem]">
              Before
            </span>
            <span className="text-sm font-black leading-none text-destructive sm:text-base">
              240 mg/dL
            </span>
          </span>
          <span
            aria-label="One week after the protocol: 105 milligrams per deciliter"
            className="flex min-w-0 flex-col items-center gap-0.5 px-2 py-2.5 text-center"
          >
            <span className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-muted-foreground sm:text-[0.7rem]">
              After 1 week
            </span>
            <span className="text-sm font-black leading-none text-brand-green sm:text-base">
              105 mg/dL
            </span>
          </span>
        </figcaption>
      </figure>



      <div className="mt-5 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-2.5">
          <SmartImage
            src={avatarRita}
            alt="Profile photo of Rachel Bennett"
            width={160}
            height={160}
            wrapperClassName="h-10 w-10 shrink-0 rounded-full"
          />

          <div className="min-w-0 flex-1">
            <div className="rounded-2xl bg-muted px-3.5 py-2.5">
              <p className="truncate text-[0.85rem] font-bold leading-tight sm:text-sm">
                Rachel Bennett
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed sm:text-sm">
                Thank you so much Lerato! I&apos;ve been deworming for 30 days and my glucose levels
                are finally stable. I&apos;m so happy about this victory in my life 🎁 you were an
                angel.
              </p>
            </div>
            <div className="mt-1.5 flex items-center gap-3 px-3 text-[0.7rem] font-semibold text-muted-foreground sm:text-xs">
              <span>2 h</span>
              <span className="text-brand-green">Like</span>
              <span className="text-brand-green">Reply</span>
              <span className="ml-auto flex items-center gap-1">
                <span aria-hidden="true">👍❤️</span>
                <span aria-label="47 reactions">47</span>
              </span>
            </div>
          </div>
        </div>
      </div>


      <CtaButton onClick={onNext}>Continue</CtaButton>
    </section>
  );
}

/* ---------- Step 10 ---------- */

const MEDS = [
  "Metformin",
  "Glifage",
  "Gliclazide",
  "Glimepiride",
  "Insulin",
  "I take other medications",
  "I'm not taking anything right now",
];

function StepMedications({ onNext }: { onNext: () => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const toggle = (m: string) => {
    setError(false);
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  };

  return (
    <section>
      <Heading>
        Are you currently taking any of{" "}
        <span className="text-brand-green">these medications?</span>
      </Heading>
      <Sub>Select all that apply.</Sub>
      <div className="mt-6 space-y-3">
        {MEDS.map((m) => {
          const on = picked.includes(m);
          return (
            <button
              key={m}
              type="button"
              onClick={() => toggle(m)}
              aria-pressed={on}
              className={`btn-glow flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-4 text-left shadow-sm active:scale-[0.99] ${
                on
                  ? "border-brand-green bg-brand-green/10"
                  : "border-border bg-card hover:border-brand-green/60"
              }`}
            >
              <span className="min-w-0 text-[0.95rem] font-semibold leading-snug sm:text-base">
                {m}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 text-[0.75rem] font-black ${
                  on
                    ? "border-brand-green bg-brand-green text-primary-foreground"
                    : "border-border"
                }`}
              >
                {on ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
      <ValidationMessage
        show={error}
        message="Please select at least one option to continue."
      />
      <CtaButton
        onClick={() => (picked.length === 0 ? setError(true) : onNext())}
        invalid={error}
      >
        Continue
      </CtaButton>
    </section>
  );
}

/* ---------- Step 11 ---------- */

const MONITORING = [
  { label: "ALWAYS BEFORE EATING", emoji: "⚠️" },
  { label: "ONCE A DAY", emoji: "✅" },
  { label: "SEVERAL TIMES A DAY", emoji: "😰" },
  { label: "A FEW TIMES A WEEK", emoji: "🩸" },
  { label: "I DON'T DO IT YET", emoji: "😳" },
];

function StepMonitoring({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section>
      <Heading>
        How often do you <span className="text-brand-green">monitor your glucose?</span>
      </Heading>
      <Sub>Pick the answer that fits you best.</Sub>
      <div className="mt-6 space-y-3">
        {MONITORING.map((o) => {
          const on = choice === o.label;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setChoice(o.label);
                window.setTimeout(onNext, 180);
              }}
              className={`btn-glow flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-4 text-left shadow-sm active:scale-[0.99] ${
                on
                  ? "border-brand-green bg-brand-green/10"
                  : "border-border bg-card hover:border-brand-green/60"
              }`}
            >
              <span className="min-w-0 text-[0.85rem] font-bold uppercase tracking-wide sm:text-[0.95rem]">
                {o.label}
              </span>
              <span aria-hidden="true" className="shrink-0 text-2xl">
                {o.emoji}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}


/* ---------- Step 12 ---------- */



/* ---------- Step 14 ---------- */

function StepInterest({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Would you be interested in receiving a{" "}
        <span className="text-brand-green">personalized protocol</span> for Deworming in 14 days?
      </Heading>
      <div className="mx-auto mt-8 max-w-md space-y-4 sm:space-y-5">
        <OptionButton emoji="✅" onClick={onNext}>
          Yes, I want it badly!
        </OptionButton>
        <OptionButton emoji="😍" onClick={onNext}>
          I&apos;m interested, but I have questions.
        </OptionButton>
      </div>
    </section>
  );
}

/* ---------- Step 13 ---------- */

function StepCommitment({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  const pick = (v: string) => {
    setChoice(v);
    window.setTimeout(onNext, 180);
  };

  return (
    <section>
      <Heading>
        Do you commit to following our{" "}
        <span className="text-brand-green">14-Day Protocol</span> at home?
      </Heading>
      <Sub>I&apos;ll help you with everything you need.</Sub>
      <div className="mx-auto mt-8 max-w-md space-y-4 sm:space-y-5">
        <OptionButton emoji="😍" selected={choice === "commit"} onClick={() => pick("commit")}>
          Yes, I commit!
        </OptionButton>
        <OptionButton emoji="🤪" selected={choice === "try"} onClick={() => pick("try")}>
          I&apos;ll try!
        </OptionButton>
      </div>

      <PhotoCarousel />
    </section>
  );
}

const COMMIT_SLIDES = [
  {
    src: slide588.url,
    alt: "Glucose meter reading 588 mg/dL before the protocol",
    caption: "Before: 588 mg/dL",
  },
  {
    src: slide198.url,
    alt: "Woman showing a glucose meter reading 198 mg/dL",
    caption: "Day 7: 198 mg/dL",
  },
  {
    src: slide108.url,
    alt: "Glucose meter reading 108 mg/dL after the protocol",
    caption: "Day 14: 108 mg/dL",
  },
];

function PhotoCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fs, setFs] = useState<number | null>(null);
  const startX = useRef<number | null>(null);

  const go = (n: number) => setI((n + COMMIT_SLIDES.length) % COMMIT_SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % COMMIT_SLIDES.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  // lock body scroll while the fullscreen lightbox is open
  useEffect(() => {
    if (fs === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFs(null);
      else if (e.key === "ArrowRight") setFs((p) => ((p ?? 0) + 1) % COMMIT_SLIDES.length);
      else if (e.key === "ArrowLeft") setFs((p) => ((p ?? 0) - 1 + COMMIT_SLIDES.length) % COMMIT_SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fs]);

  return (
    <div
      className="mx-auto mt-7 w-full max-w-[19rem] sm:max-w-sm"
      aria-roledescription="carousel"
      aria-label="Real glucose results gallery"
      onPointerDown={(e) => {
        startX.current = e.clientX;
        setPaused(true);
      }}
      onPointerUp={(e) => {
        const s = startX.current;
        startX.current = null;
        if (s === null) return;
        const dx = e.clientX - s;
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        setPaused(false);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border-2 border-brand-green/30 bg-muted shadow-md">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {COMMIT_SLIDES.map((s, idx) => (
            <div key={s.alt} className="w-full shrink-0">
              <button
                type="button"
                onClick={() => setFs(idx)}
                aria-label={`Open photo ${idx + 1} fullscreen`}
                className="group relative block w-full bg-muted aspect-square sm:aspect-[5/6]"
              >
                <SmartImage
                  src={s.src}
                  alt={s.alt}
                  width={800}
                  height={800}
                  priority={idx === 0}
                  sizes="(max-width: 640px) 90vw, 384px"
                  className="h-full w-full object-contain"
                  wrapperClassName="absolute inset-0 h-full w-full"
                  draggable={false}
                />
                <span className="pointer-events-none absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
              <p className="bg-brand-green/10 px-3 py-2 text-center text-[0.8rem] font-extrabold uppercase tracking-wide text-foreground sm:text-sm">
                {s.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {COMMIT_SLIDES.map((s, idx) => (
          <button
            key={s.alt}
            type="button"
            aria-label={`View photo ${idx + 1}`}
            aria-pressed={i === idx}
            onClick={() => go(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === idx ? "w-7 bg-brand-green" : "w-2.5 bg-border"}`}
          />
        ))}
      </div>

      {fs !== null && (() => {
        const activeSlide = COMMIT_SLIDES[fs];
        if (!activeSlide) return null;
        return (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setFs(null)}
        >
          <button
            type="button"
            onClick={() => setFs(null)}
            aria-label="Close fullscreen"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative flex w-full max-w-3xl items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFs((p) => ((p ?? 0) - 1 + COMMIT_SLIDES.length) % COMMIT_SLIDES.length)}
              aria-label="Previous photo"
              className="absolute left-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <SmartImage
              src={activeSlide?.src}
              alt={activeSlide?.alt}
              width={800}
              height={1000}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="max-h-[80vh] w-auto max-w-full object-contain"
              wrapperClassName="max-h-[80vh] w-auto max-w-full"
              draggable={false}
            />

            <button
              type="button"
              onClick={() => setFs((p) => ((p ?? 0) + 1) % COMMIT_SLIDES.length)}
              aria-label="Next photo"
              className="absolute right-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <p className="mt-4 px-4 text-center text-sm font-extrabold uppercase tracking-wide text-white">
            {activeSlide.caption}
          </p>
        </div>
        );
      })()}
    </div>
  );
}

/* ---------- Step 14: audio + 14-day proof ---------- */

function StepAudioProof({ onNext }: { onNext: () => void }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnd = () => setPlaying(false);
    el.addEventListener("ended", onEnd);
    return () => el.removeEventListener("ended", onEnd);
  }, []);

  return (
    <section>
      <p className="text-center text-base font-black sm:text-lg">
        Listen to the audio below: <span aria-hidden="true">👇</span>
      </p>
      <p className="mt-1.5 text-center text-xs text-muted-foreground sm:text-sm">
        If the AUDIO doesn&apos;t start, just tap it!
      </p>

      <div className="mt-4 rounded-xl border border-border bg-card p-3.5 shadow-sm sm:p-4">
        <p className="text-xs font-bold sm:text-sm">Lerato</p>
        <div className="mt-2.5 flex items-center gap-3">
          <SmartImage
            src={avatarAna}
            alt="Lerato"
            width={160}
            height={160}
            wrapperClassName="h-10 w-10 shrink-0 rounded-full"
          />
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-muted px-3 py-2">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={playing ? "Pause Lerato's audio message" : "Play Lerato's audio message"}
              aria-pressed={playing}
              aria-controls="lerato-audio-proof"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <audio id="lerato-audio-proof" ref={audioRef} src={audioProof.url} preload="none" />
            <span className="sr-only" aria-live="polite">
              {playing ? "Audio playing" : "Audio paused"}
            </span>
            <div aria-hidden="true" className="flex min-w-0 flex-1 items-end gap-[2px] overflow-hidden">
              {Array.from({ length: 34 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] shrink-0 rounded-full bg-muted-foreground/60"
                  style={{ height: `${6 + ((i * 7) % 16)}px` }}
                />
              ))}
            </div>
            <span className="shrink-0 text-[0.7rem] font-semibold text-muted-foreground">00:33</span>
          </div>
        </div>
      </div>

      <h3 className="mt-7 text-center text-lg font-black leading-snug sm:text-xl">
        Just look at this case
      </h3>
      <p className="mt-1.5 text-center text-xs leading-snug text-muted-foreground sm:text-sm">
        1 week after starting the deworming
      </p>

      <figure className="mt-4 overflow-hidden rounded-2xl border-2 border-brand-green bg-card shadow-md">
        <SmartImage
          src={glucose14DaysV2.url}
          alt="Two glucose meters side by side, labelled Before Deworming reading 255 mg/dL and 14 Days After Deworming reading 118 mg/dL."
          width={1537}
          height={1023}
          sizes="(max-width: 640px) 92vw, 480px"
          className="object-contain"
          wrapperClassName="w-full bg-muted"
        />
      </figure>

      <CtaButton onClick={onNext}>Generate Personalized Protocol! ✅</CtaButton>
    </section>
  );
}

/* ---------- Step 16 ---------- */


const ANALYZING_TASKS = [
  "Analyzing your answers",
  "Checking your symptoms",
  "Identifying possible parasites",
  "Calculating your risk level",
  "Building your custom protocol",
];

function StepAnalyzing({ onNext }: { onNext: () => void }) {
  const [pcts, setPcts] = useState<number[]>(() => ANALYZING_TASKS.map(() => 0));
  const done = pcts.every((p) => p >= 100);

  useEffect(() => {
    const id = setInterval(() => {
      setPcts((prev) => {
        const i = prev.findIndex((p) => p < 100);
        if (i === -1) return prev;
        const nextArr = [...prev];
        nextArr[i] = Math.min(100, (prev[i] ?? 0) + 5);
        return nextArr;
      });
    }, 45);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onNext, 700);
    return () => clearTimeout(t);
  }, [done, onNext]);

  return (
    <section>
      <div className="rounded-2xl bg-brand-green px-5 py-8 text-center text-primary-foreground shadow-lg">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em]">The Protocol of</p>
        <p className="mt-1 text-4xl font-black italic leading-none sm:text-5xl">Diabetes</p>
        <p className="mx-auto mt-5 max-w-[18rem] text-balance text-sm font-bold leading-snug sm:text-base">
          I&apos;m analyzing your answers and building your{" "}
          <span className="rounded bg-white/25 px-1.5 py-0.5">custom Protocol!</span>
        </p>
      </div>

      <div className="mt-7 space-y-5">
        {ANALYZING_TASKS.map((label, i) => (
          <Meter key={label} label={label} value={pcts[i] ?? 0} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Step 16: Remedies vs Protocol + analysis ---------- */

const ANALYSIS_ROWS: { label: string; value: number; tone: "red" | "green" }[] = [
  { label: "Chances of having parasites in your body", value: 95, tone: "red" },
  { label: "Life risk", value: 66, tone: "red" },
  { label: "Chances of autoimmune diseases if untreated soon", value: 77, tone: "red" },
  { label: "Chances of successful deworming", value: 100, tone: "green" },
  { label: "Chances of fully eliminating diabetes", value: 100, tone: "green" },
];

function StepComparison({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <SmartImage
          src={remediesVsProtocol.url}
          alt="Comparison table: traditional remedies versus our diabetes protocol"
          width={1426}
          height={1103}
          wrapperClassName="w-full bg-muted"
        />
      </figure>

      <p className="mt-7 text-balance text-center text-[1rem] font-black leading-snug sm:text-lg">
        Below is the analysis of your current situation,{" "}
        <span className="text-brand-green">based on your answers.</span> 👇
      </p>

      <div className="mt-5 space-y-4">
        {ANALYSIS_ROWS.map((r) => (
          <Meter key={r.label} label={r.label} value={r.value} tone={r.tone} />
        ))}
      </div>

      <CtaButton onClick={onNext}>Continue</CtaButton>
    </section>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-black sm:text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-brand-green transition-[width] duration-100"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ---------- Step 15 ---------- */

function StepProtocol() {
  return (
    <section>
      <div className="space-y-4">
        <Meter label="Chances of worsening soon" value={77} />
        <Meter label="Chances of deworming" value={100} />
        <Meter label="Chances of fully reversing diabetes" value={100} />
      </div>

      <p className="mt-8 text-balance text-center text-[1.05rem] font-black leading-snug sm:text-xl">
        <span className="text-brand-green">Possible parasitic agent</span> based on your symptoms:
      </p>
      <p className="mt-2 text-center text-sm italic underline sm:text-base">
        Ascaris lumbricoides
      </p>

      <figure className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <SmartImage
          src={parasiteIntestine}
          alt="Endoscopic image of Ascaris lumbricoides roundworms inside the intestine"
          width={760}
          height={591}
          wrapperClassName="w-full bg-muted"
        />
      </figure>

      <div className="mt-5 rounded-xl border border-border bg-card p-4 shadow-sm">
        <p className="text-sm font-black sm:text-base">⚠️ Heads up!</p>
        <p className="mt-2 text-[0.85rem] font-semibold leading-relaxed sm:text-sm">
          With our Protocol you can relax —{" "}
          <span className="text-brand-green">no worm or parasite will come out alive</span> in an
          uncomfortable way. They are eliminated{" "}
          <span className="text-brand-green">already dead and broken down</span>, almost unnoticed.
          🤗
        </p>
      </div>

      <p className="mt-7 text-balance text-center text-[0.95rem] font-bold leading-relaxed sm:text-base">
        <span className="text-brand-green">The deworming starts</span> with an avocado smoothie plus
        a secret ingredient that is easy to find at any market and rarely used.
      </p>

      <figure className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <SmartImage
          src={avocadoImg}
          alt="Hands holding a halved avocado on a wooden table"
          width={760}
          height={506}
          wrapperClassName="w-full bg-muted"
        />
      </figure>

      <CtaButton>Generate Treatment Protocol! ✅</CtaButton>
    </section>
  );
}

/* ---------- Shared UI ---------- */

function ValidationMessage({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <p
      role="alert"
      className="shake mt-5 flex items-center justify-center gap-2 rounded-xl border-2 border-destructive/40 bg-destructive/10 px-4 py-3 text-center text-[0.85rem] font-bold leading-snug text-destructive sm:text-[0.95rem]"
    >
      <span aria-hidden="true">⚠️</span>
      {message}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-balance text-center text-[1.25rem] font-black leading-[1.25] tracking-tight sm:text-[1.6rem]">
      {children}
    </h1>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-3 max-w-[24rem] text-balance text-center text-[0.9rem] leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

function OptionButton({
  children,
  emoji,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  emoji?: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`btn-glow flex w-full items-center justify-center gap-3 rounded-xl px-4 py-4 text-center text-primary-foreground shadow-md active:scale-[0.99] sm:py-[1.15rem] ${
        selected
          ? "bg-primary-strong ring-2 ring-brand-green-light ring-offset-2 ring-offset-background"
          : "bg-brand-green hover:bg-primary-strong"
      }`}
    >
      {emoji ? (
        <span aria-hidden="true" className="shrink-0 text-xl">
          {emoji}
        </span>
      ) : null}
      <span className="min-w-0 text-[0.95rem] font-bold leading-snug sm:text-base">{children}</span>
    </button>
  );
}

function CtaButton({
  children,
  onClick,
  disabled,
  invalid,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-invalid={invalid}
      className="btn-glow mt-7 w-full rounded-xl bg-brand-green px-5 py-[1.1rem] text-[1.05rem] font-black tracking-tight text-primary-foreground shadow-lg hover:bg-primary-strong active:scale-[0.99] disabled:opacity-50 sm:text-lg"
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
      className="btn-glow overflow-hidden rounded-xl border-2 border-border bg-card p-1.5 text-left shadow-sm hover:border-brand-green/60 hover:shadow-md active:scale-[0.99]"
    >
      <SmartImage
        src={img}
        alt={label}
        width={600}
        height={750}
        priority
        wrapperClassName="w-full rounded-lg"
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
