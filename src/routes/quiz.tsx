import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QuizShell } from "@/components/QuizShell";
import manImg from "@/assets/man.webp";
import womanImg from "@/assets/woman.webp";
import symptomsWoman from "@/assets/symptoms-woman.webp";
import news600 from "@/assets/news-v2-600.webp.asset.json";
import news900 from "@/assets/news-v2-900.webp.asset.json";
import { SmartImage } from "@/components/SmartImage";
import glucoseAntesAfter from "@/assets/glucose-before-after.webp.asset.json";

import avatarAna from "@/assets/avatar-ana.webp";
import avatarRita from "@/assets/avatar-rita.webp";
import avocadoImg from "@/assets/abacate-para-diabetes.webp.asset.json";
import audioAna from "@/assets/som-01.mp3.asset.json";
import audioProof from "@/assets/som-02.mp3.asset.json";
import audioOffer from "@/assets/som-03.mp3.asset.json";
import glucose14DaysV2 from "@/assets/glucose-255-118.webp.asset.json";
import slide588 from "@/assets/slide-588.webp.asset.json";
import slide198 from "@/assets/slide-198.webp.asset.json";
import slide108 from "@/assets/slide-108.webp.asset.json";
import remediesVsProtocol from "@/assets/remedies-vs-protocol-v2.webp.asset.json";
import ascarisPhoto from "@/assets/ascaris-lumbricoides.webp.asset.json";
import avocadoBg from "@/assets/avocado-bg.webp.asset.json";
import cartoonSick from "@/assets/cartoon-sick-man.webp.asset.json";
import cartoonHappy from "@/assets/cartoon-happy-man.webp.asset.json";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Avaliação Gratuita | Protocolo da Diabetes" },
      {
        name: "description",
        content:
          "Responda a algumas perguntas rápidas sobre os seus sintomas e conheça o protocolo de 14 dias para diabetes tipo 2.",
      },
      { property: "og:title", content: "Avaliação Gratuita | Protocolo da Diabetes" },
      {
        property: "og:description",
        content: "Teste rápido e gratuito sobre os sintomas da diabetes tipo 2.",
      },
    ],
  }),
  component: Quiz,
});

const TOTAL_STEPS = 17;

/* Replace with the real checkout link when the payment page is ready. */
const CHECKOUT_URL = "#";

const SYMPTOMS_LEFT = ["VISÃO TURVA", "SEDE EXCESSIVA", "CANSAÇO", "NÁUSEAS"];
const SYMPTOMS_RIGHT = ["DOR NAS PERNAS", "FORMIGAMENTO", "INSÓNIA", "FADIGA"];

const SYMPTOM_LIST = [
  { label: "INSÓNIA", emoji: "😴" },
  { label: "FADIGA", emoji: "🥱" },
  { label: "SEDE EXCESSIVA", emoji: "🥤" },
  { label: "FORMIGAMENTO", emoji: "🦶" },
  { label: "VISÃO TURVA", emoji: "👁️" },
  { label: "DORES NO CORPO", emoji: "💪" },
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
      {step === 16 && <StepProtocol onNext={next} />}
      {step === 17 && <StepOffer />}
    </QuizShell>
  );
}

/* ---------- Step 1 ---------- */

function StepGender({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>Vamos começar a sua avaliação</Heading>
      <Sub>Selecione uma das opções abaixo</Sub>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <GenderCard img={manImg} label="Sou homem" onClick={onNext} />
        <GenderCard img={womanImg} label="Sou mulher" onClick={onNext} />
      </div>
    </section>
  );
}

/* ---------- Step 2 ---------- */

function StepSymptomsIllustration({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Tem sentido algum destes sintomas{" "}
        <span className="text-brand-green">há mais de 1 ano?</span>
      </Heading>

      <div className="relative mx-auto mt-6 w-full max-w-[22rem]">
        <img
          src={symptomsWoman}
          alt="Mulher idosa sentada, com sintomas associados à diabetes"
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
          Sinto um ou mais sintomas
        </OptionButton>
        <OptionButton emoji="🤦" onClick={onNext}>
          Sinto dois ou mais sintomas
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
        Alguma vez já <span className="text-brand-green">feito desparasitação</span> in any way?
      </Heading>
      <Sub>Com medicamentos ou métodos naturais.</Sub>
      <div className="mt-6 space-y-3">
        {[
          { emoji: "😐", label: "Não, nunca fiz desparasitação." },
          { emoji: "😁", label: "Sim, já fiz desparasitação." },
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
          Se nunca fez uma desparasitação natural, tenha cuidado:
        </span>{" "}
        os vermes podem multiplicar-se no seu corpo e atingir órgãos vitais, como o cérebro, o coração e os pulmões.
        Don&apos;t ignore this risk —{" "}
        <span className="text-brand-green">
          fazer desparasitação pelo menos uma vez por ano é essencial!
        </span>
      </h2>

      <p className="mt-5 text-center text-sm font-bold underline sm:text-base">
        Veja esta notícia 👇
      </p>

      <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <SmartImage
          src={news900.url}
          srcSet={`${news600.url} 600w, ${news900.url} 900w`}
          sizes="(max-width: 640px) 100vw, 600px"
          alt="Notícia sobre um jovem que morreu após serem encontrados parasitas no cérebro"
          width={900}
          height={1350}
          className="object-contain"
          wrapperClassName="w-full"
        />
      </figure>



      <CtaButton onClick={onNext}>Continuar</CtaButton>
    </section>
  );
}

/* ---------- Step 5 ---------- */

function StepAwareness({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Sabia que{" "}
        <span className="text-brand-green">não tratar esta situação</span> pode agravar a diabetes
        e causar danos que podem ser irreversíveis?
      </Heading>
      <Sub>Seja sincero, por favor.</Sub>
      <div className="mt-6 space-y-3">
        <OptionButton emoji="🥵" onClick={onNext}>
          Sim, sei como é grave ter parasitas no intestino.
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
        Concorda que, muitas vezes,{" "}
        <span className="text-brand-green">comer demasiados doces e fazer escolhas alimentares pouco saudáveis</span>{" "}
        aren&apos;t our fault — that we get labelled as undisciplined when our body is actually
        a sofrer de inflamação causada por parasitas intestinais?
      </Heading>
      <Sub>Seja sincero. Quero ajudar!</Sub>
      <div className="mt-6 space-y-3">
        <OptionButton onClick={onNext}>Concordo totalmente!</OptionButton>
        <OptionButton onClick={onNext}>Concordo em parte.</OptionButton>
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
        Entre os <span className="text-brand-green">sintomas indicados abaixo</span>, quais o incomodam
        mais?
      </Heading>
      <Sub>Selecione uma ou mais opções.</Sub>

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
          ? "Selecione pelo menos um sintoma para continuar"
          : `${selected.length} sintoma(s) selecionado(s)`}
      </p>

      <ValidationMessage
        show={error}
        message="Selecione pelo menos um sintoma para continuar."
      />

      <CtaButton
        onClick={() => (selected.length === 0 ? setError(true) : onNext())}
        invalid={error}
      >
        Continuar
      </CtaButton>
    </section>
  );
}


/* ---------- Step 8 ---------- */

function StepImpact({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <Heading>
        Os sintomas que selecionou{" "}
        <span className="text-brand-green">têm afectado a sua vida?</span>
      </Heading>
      <div className="mt-6 space-y-3">
        <OptionButton emoji="☑️" onClick={onNext}>
          Sim, muito!
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
        <p className="text-sm font-black sm:text-base">⚠️ Os resultados não mentem:</p>
        <p className="mt-1.5 text-[0.85rem] font-semibold leading-relaxed sm:text-sm">
          Your symptoms point to something very dangerous —{" "}
          <span className="underline">ouça com atenção!</span>
        </p>
      </div>

      <p className="mt-6 text-center text-sm font-bold sm:text-base">
        Ouça esta breve explicação 👇
      </p>
      <p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
        Se o audio doesn&apos;t start, just tap it.
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
              aria-label={playing ? "Pausar a mensagem de áudio de Lerato" : "Reproduzir a mensagem de áudio de Lerato"}
              aria-pressed={playing}
              aria-controls="lerato-audio"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <audio id="lerato-audio" ref={audioRef} src={audioAna.url} preload="none" />
            <span className="sr-only" aria-live="polite">
              {playing ? "Áudio em reprodução" : "Áudio pausado"}
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
        Veja este caso
      </h3>
      <p className="mx-auto mt-1.5 max-w-[22rem] text-center text-xs leading-snug text-muted-foreground sm:text-sm">
        Uma semana após iniciar a desparasitação
      </p>

      <figure
        role="group"
        aria-labelledby="glucose-caption"
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <SmartImage
          src={glucoseAntesAfter.url}
          alt="Dois medidores de glicose Accu-Chek lado a lado: antes do protocolo, 240 mg/dL; uma semana depois, 105 mg/dL."
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
            aria-label="Antes do protocolo: 240 miligramas por decilitro"
            className="flex min-w-0 flex-col items-center gap-0.5 px-2 py-2.5 text-center"
          >
            <span className="text-[0.65rem] font-black uppercase tracking-[0.08em] text-muted-foreground sm:text-[0.7rem]">
              Antes
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
              Após 1 semana
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
            alt="Fotografia de perfil de Rachel Bennett"
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
                Thank you so much Lerato! I&apos;ve been deworming for 30 dias and my glucose levels
                are finally stable. I&apos;m so happy about this victory in my life 🎁 you were an
                anjo.
              </p>
            </div>
            <div className="mt-1.5 flex items-center gap-3 px-3 text-[0.7rem] font-semibold text-muted-foreground sm:text-xs">
              <span>2 h</span>
              <span className="text-brand-green">Gostar</span>
              <span className="text-brand-green">Responder</span>
              <span className="ml-auto flex items-center gap-1">
                <span aria-hidden="true">👍❤️</span>
                <span aria-label="47 reactions">47</span>
              </span>
            </div>
          </div>
        </div>
      </div>


      <CtaButton onClick={onNext}>Continuar</CtaButton>
    </section>
  );
}

/* ---------- Step 10 ---------- */

const MEDS = [
  "Metformina",
  "Glifage",
  "Gliclazida",
  "Glimepirida",
  "Insulina",
  "Tomo outros medicamentos",
  "Não estou a tomar nenhum medicamento neste momento",
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
        Está actualmente a tomar algum destes{" "}
        <span className="text-brand-green">estes medicamentos?</span>
      </Heading>
      <Sub>Selecione todas as opções aplicáveis.</Sub>
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
        message="Selecione pelo menos uma opção para continuar."
      />
      <CtaButton
        onClick={() => (picked.length === 0 ? setError(true) : onNext())}
        invalid={error}
      >
        Continuar
      </CtaButton>
    </section>
  );
}

/* ---------- Step 11 ---------- */

const MONITORING = [
  { label: "SEMPRE ANTES DE COMER", emoji: "⚠️" },
  { label: "UMA VEZ POR DIA", emoji: "✅" },
  { label: "VÁRIAS VEZES POR DIA", emoji: "😰" },
  { label: "ALGUMAS VEZES POR SEMANA", emoji: "🩸" },
  { label: "AINDA NÃO FAÇO ISSO", emoji: "😳" },
];

function StepMonitoring({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section>
      <Heading>
        How often do you <span className="text-brand-green">monitorizar a sua glicose?</span>
      </Heading>
      <Sub>Escolha a resposta que melhor se aplica a si.</Sub>
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
        Gostaria de receber um{" "}
        <span className="text-brand-green">protocolo personalizado</span> for Deworming in 14 days?
      </Heading>
      <div className="mx-auto mt-8 max-w-md space-y-4 sm:space-y-5">
        <OptionButton emoji="✅" onClick={onNext}>
          Sim, quero muito!
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
        Compromete-se a seguir o nosso{" "}
        <span className="text-brand-green">Protocolo de 14 dias</span> at home?
      </Heading>
      <Sub>Vou ajudar com tudo aquilo de que precisa.</Sub>
      <div className="mx-auto mt-8 max-w-md space-y-4 sm:space-y-5">
        <OptionButton emoji="😍" selected={choice === "commit"} onClick={() => pick("commit")}>
          Sim, comprometo-me!
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
    alt: "Leitura do medidor de glicose: 588 mg/dL antes do protocolo",
    caption: "Antes: 588 mg/dL",
  },
  {
    src: slide198.url,
    alt: "Mulher a mostrar um medidor de glicose com leitura de 198 mg/dL",
    caption: "Dia 7: 198 mg/dL",
  },
  {
    src: slide108.url,
    alt: "Leitura do medidor de glicose: 108 mg/dL após o protocolo",
    caption: "Dia 14: 108 mg/dL",
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
      aria-label="Galeria de resultados de glicose"
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
                aria-label={`Abrir a fotografia ${idx + 1} em ecrã inteiro`}
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
            aria-label={`Ver fotografia ${idx + 1}`}
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
          aria-label="Visualizador de fotografias"
          onClick={() => setFs(null)}
        >
          <button
            type="button"
            onClick={() => setFs(null)}
            aria-label="Fechar ecrã inteiro"
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
              aria-label="Fotografia anterior"
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
              aria-label="Fotografia seguinte"
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
        Ouça o áudio abaixo: <span aria-hidden="true">👇</span>
      </p>
      <p className="mt-1.5 text-center text-xs text-muted-foreground sm:text-sm">
        Se o AUDIO doesn&apos;t start, just tap it!
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
              aria-label={playing ? "Pausar a mensagem de áudio de Lerato" : "Reproduzir a mensagem de áudio de Lerato"}
              aria-pressed={playing}
              aria-controls="lerato-audio-proof"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <audio id="lerato-audio-proof" ref={audioRef} src={audioProof.url} preload="none" />
            <span className="sr-only" aria-live="polite">
              {playing ? "Áudio em reprodução" : "Áudio pausado"}
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
        Veja este caso
      </h3>
      <p className="mt-1.5 text-center text-xs leading-snug text-muted-foreground sm:text-sm">
        Uma semana após iniciar a desparasitação
      </p>

      <figure className="mt-4 overflow-hidden rounded-2xl border-2 border-brand-green bg-card shadow-md">
        <SmartImage
          src={glucose14DaysV2.url}
          alt="Dois medidores de glicose lado a lado: antes da desparasitação, 255 mg/dL; 14 dias depois, 118 mg/dL."
          width={1537}
          height={1023}
          sizes="(max-width: 640px) 92vw, 480px"
          className="object-contain"
          wrapperClassName="w-full bg-muted"
        />
      </figure>

      <CtaButton onClick={onNext}>Gerar protocolo personalizado! ✅</CtaButton>
    </section>
  );
}

/* ---------- Step 16 ---------- */


const ANALYZING_TASKS = [
  "A analisar as suas respostas",
  "A verificar os seus sintomas",
  "A identificar possíveis parasitas",
  "A calcular o seu nível de risco",
  "A preparar o seu protocolo personalizado",
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
    }, 50);
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
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em]">O Protocolo da</p>
        <p className="mt-1 text-4xl font-black italic leading-none sm:text-5xl">Diabetes</p>
        <p className="mx-auto mt-5 max-w-[18rem] text-balance text-sm font-bold leading-snug sm:text-base">
          I&apos;m analyzing your answers and building your{" "}
          <span className="rounded bg-white/25 px-1.5 py-0.5">protocolo personalizado!</span>
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

/* ---------- Step 16: Remedies vs Protocol + analysis + protocol ---------- */

const ANALYSIS_ROWS: { label: string; value: number; tone: "red" | "green" }[] = [
  { label: "Probabilidade de ter parasitas no organismo", value: 95, tone: "red" },
  { label: "Risco para a vida", value: 66, tone: "red" },
  { label: "Probabilidade de doenças autoimunes se não houver tratamento em breve", value: 77, tone: "red" },
  { label: "Probabilidade de sucesso da desparasitação", value: 100, tone: "green" },
  { label: "Probabilidade de eliminar completamente a diabetes", value: 100, tone: "green" },
];

function StepProtocol({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* Background image with overlay for readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${avocadoBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/70 to-background/85"
      />

      <div className="relative z-10">
        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <SmartImage
            src={remediesVsProtocol.url}
            alt="Tabela comparativa: remédios tradicionais e o nosso protocolo para diabetes"
            width={1426}
            height={1103}
            wrapperClassName="w-full bg-muted"
          />
        </figure>

        <p className="mt-7 text-balance text-center text-[1rem] font-black leading-snug sm:text-lg">
          Abaixo está a análise da sua situação actual,{" "}
          <span className="text-brand-green">com base nas suas respostas.</span> 👇
        </p>

        <div className="mt-5 space-y-4">
          {ANALYSIS_ROWS.map((r) => (
            <Meter key={r.label} label={r.label} value={r.value} tone={r.tone} />
          ))}
        </div>

        <p className="mt-12 text-balance text-center text-[1.05rem] font-black leading-snug sm:text-xl">
          <span className="text-brand-green">Possível agente parasitário</span> according to your
          sintomas:
        </p>
        <p className="mt-4 text-center text-base italic underline sm:text-lg">
          Ascaris lumbricoides
        </p>

        <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <SmartImage
            src={ascarisPhoto.url}
            alt="Imagem endoscópica de vermes Ascaris lumbricoides no intestino"
            width={350}
            height={275}
            wrapperClassName="w-full bg-muted"
          />
        </figure>

        {/* Warning + deworming intro */}
        <div className="mt-10 rounded-xl border border-border bg-card/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <p className="text-sm font-black sm:text-base">⚠️ Atenção!</p>
          <p className="mt-2.5 text-[0.85rem] font-semibold leading-relaxed sm:text-sm">
            With our Protocol you can relax —{" "}
            <span className="text-brand-green">nenhum verme ou parasita sairá vivo</span> in an
            de forma desconfortável. São eliminados{" "}
            <span className="text-brand-green">já morto e decomposto</span>, almost
            imperceptible. ☺️
          </p>
          <p className="mt-3 text-[0.85rem] font-semibold leading-relaxed sm:text-sm">
            The deworming will start first with an avocado smoothie plus a secret ingredient that is
            easy to find at any market and rarely used.
          </p>
        </div>

        {/* Final protocol CTA block */}
        <div className="mt-6 rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <p className="text-balance text-center text-[0.95rem] font-bold leading-relaxed sm:text-base">
            <span className="text-brand-green">A desparasitação começa</span> with an avocado smoothie
            plus a secret ingredient that is easy to find at any market and rarely used.
          </p>
        </div>

        <figure className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <SmartImage
            src={avocadoImg.url}
            alt="Mãos a segurar um abacate cortado ao meio sobre uma mesa de madeira"
            width={760}
            height={475}
            wrapperClassName="w-full bg-muted"
          />
        </figure>

        <CtaButton onClick={onNext}>Gerar protocolo de tratamento! ✅</CtaButton>
      </div>
    </section>
  );
}

function Meter({
  label,
  value,
  tone = "green",
}: {
  label: string;
  value: number;
  tone?: "green" | "red";
}) {
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
          className={`h-full rounded-full transition-[width] duration-100 ${
            tone === "red" ? "bg-destructive" : "bg-brand-green"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ---------- Shared UI ---------- */

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

/* ---------- Step 17: Offer ---------- */

function CtaLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={CHECKOUT_URL}
      className="btn-glow mt-6 block w-full rounded-xl bg-brand-green px-5 py-[1.1rem] text-center text-[1.05rem] font-black tracking-tight text-primary-foreground shadow-lg hover:bg-primary-strong active:scale-[0.99] sm:text-lg"
    >
      {children}
    </a>
  );
}

const OFFER_ITEMS = [
  { label: "Preparação para a desparasitação", price: "$37.90" },
  { label: "Protocolo completo de desparasitação", price: "$57.00" },
  { label: "Acompanhamento individual", price: "$97.00" },
  { label: "Guia alimentar antiparasitário", price: "$27.00" },
  { label: "3 sessões de perguntas e respostas com a nossa equipa", price: "$17.00" },
  { label: "Acompanhamento anual do protocolo", price: "$37.00" },
];

function StepOffer() {
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
      {/* Success banner */}
      <p className="flex items-center justify-center gap-2 text-center text-sm font-black sm:text-base">
        <span aria-hidden="true">🎉</span> Protocol generated with{" "}
        <span className="underline">SUCESSO!</span>
      </p>

      <div className="mt-4 rounded-2xl bg-brand-green px-4 py-5 text-center text-primary-foreground shadow-md sm:px-5">
        <h1 className="text-balance text-xl font-black leading-tight sm:text-2xl">
          Your <span className="text-brand-green-light">protocolo exclusivo</span> is ready!
        </h1>
      </div>

      {/* Antes / After cartoons */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
        <figure className="text-center">
          <figcaption className="text-[0.75rem] font-black uppercase tracking-[0.08em] text-muted-foreground sm:text-sm">
            Antes
          </figcaption>
          <div className="mt-2 rounded-xl border border-border bg-card p-2 shadow-sm">
            <SmartImage
              src={cartoonSick.url}
              alt="Ilustração de um homem cansado, com dores de cabeça"
              width={420}
              height={520}
              className="object-contain"
              wrapperClassName="w-full"
            />
          </div>
          <p className="mt-2 text-[0.75rem] font-semibold leading-snug text-muted-foreground sm:text-sm">
            This is you suffering with the parasites.
          </p>
          <div
            role="progressbar"
            aria-label="Progress antes do protocolo"
            aria-valuenow={30}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div className="h-full w-[30%] rounded-full bg-destructive/70" />
          </div>
        </figure>

        <figure className="text-center">
          <figcaption className="text-[0.75rem] font-black uppercase tracking-[0.08em] text-brand-green sm:text-sm">
            After
          </figcaption>
          <div className="mt-2 rounded-xl border-2 border-brand-green/50 bg-card p-2 shadow-sm">
            <SmartImage
              src={cartoonHappy.url}
              alt="Ilustração de um homem feliz e saudável a fazer sinal positivo com os dois polegares"
              width={420}
              height={520}
              className="object-contain"
              wrapperClassName="w-full"
            />
          </div>
          <p className="mt-2 text-[0.75rem] font-semibold leading-snug text-muted-foreground sm:text-sm">
            This is you, <span className="text-brand-green">livre da diabetes</span>.
          </p>
          <div
            role="progressbar"
            aria-label="Progress after the protocol"
            aria-valuenow={95}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div className="h-full w-[95%] rounded-full bg-brand-green" />
          </div>
        </figure>
      </div>

      {/* Audio explainer */}
      <p className="mt-8 text-balance text-center text-sm font-bold leading-snug sm:text-base">
        Listen to the audio. I&apos;ll explain{" "}
        <span className="text-brand-green">como funciona o Protocolo da Diabetes</span>. 👇
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
              aria-label={playing ? "Pausar a explicação do protocolo" : "Reproduzir a explicação do protocolo"}
              aria-pressed={playing}
              aria-controls="offer-audio"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-green text-xs text-primary-foreground transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <audio id="offer-audio" ref={audioRef} src={audioOffer.url} preload="none" />
            <span className="sr-only" aria-live="polite">
              {playing ? "Áudio em reprodução" : "Áudio pausado"}
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

      {/* Everything you'll get — price box */}
      <div className="mt-8 rounded-2xl border-2 border-brand-green/60 bg-gradient-to-b from-brand-green/10 to-background p-4 shadow-md sm:p-6">
        <p className="text-center text-[0.7rem] font-black uppercase tracking-[0.2em] text-brand-green sm:text-xs">
          The Diabetes Protocol
        </p>
        <h2 className="mt-1.5 text-balance text-center text-lg font-black leading-snug sm:text-xl">
          Everything you <span className="text-brand-green-light">irá receber</span>
        </h2>

        <ul className="mt-5 space-y-3">
          {OFFER_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-[0.85rem] sm:text-sm">
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/15 text-brand-green"
              >
                ✓
              </span>
              <span className="min-w-0 flex-1 font-semibold leading-snug">{item.label}</span>
              <span className="shrink-0 font-black text-muted-foreground">{item.price}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-border pt-4 text-center">
          <p className="text-sm font-bold text-muted-foreground sm:text-base">
            Valor total:{" "}
            <span className="text-lg font-black text-destructive sm:text-xl">$272.90</span>
          </p>
          <p className="mt-1 text-base font-black sm:text-lg">Hoje, por apenas</p>
          <p className="text-4xl font-black leading-none text-brand-green sm:text-5xl">
            $37<span className="text-2xl sm:text-3xl">.90</span>
          </p>
        </div>
      </div>

      <CtaLink>Aceder agora ao meu protocolo! ✅</CtaLink>

      {/* Payment reassurance */}
      <div className="mt-5 space-y-3 text-center">
        <div>
          <p className="text-sm font-black sm:text-base">
            <span aria-hidden="true">💰</span> Pagamento único
          </p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground sm:text-sm">
            Sem mensalidades.
          </p>
        </div>
        <div>
          <p className="text-sm font-black sm:text-base">
            <span aria-hidden="true">✅</span> Acesso imediato
          </p>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground sm:text-sm">
            Acesso logo após o pagamento.
          </p>
        </div>
      </div>

      {/* 30-day de garantia seal */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-gradient-to-r from-amber-100/70 to-amber-50/60 p-4 shadow-sm sm:p-5">
        <div
          aria-hidden="true"
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-amber-600/70 bg-gradient-to-b from-amber-400 to-amber-600 text-center text-primary-foreground shadow-inner sm:h-20 sm:w-20"
        >
          <span className="text-[0.55rem] font-black uppercase leading-tight tracking-wide sm:text-[0.65rem]">
            30 dias
            <br />
            de garantia
          </span>
        </div>
        <div>
          <p className="text-base font-black leading-tight sm:text-lg">Experimente com segurança — 30 dias</p>
          <p className="mt-1 text-[0.8rem] font-semibold leading-snug text-muted-foreground sm:text-sm">
            Se não ficar satisfeito, devolvemos o seu dinheiro.
          </p>
        </div>
      </div>

      {/* Video testimonial */}
      <figure
        role="group"
        aria-label="Video testimonial from Maria"
        className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="relative">
          <SmartImage
            src={womanImg}
            alt="Maria, a doctor from Brazil, sharing her results with the protocol"
            width={600}
            height={750}
            className="object-cover"
            wrapperClassName="w-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-red-600/90 pl-1 text-2xl text-white shadow-lg">
              ▶
            </span>
          </div>
          <figcaption className="absolute bottom-2 left-3 right-3 text-left">
            <p className="text-sm font-black text-white drop-shadow sm:text-base">
              Testemunho — Maria
            </p>
            <p className="text-[0.7rem] font-semibold text-white/90 drop-shadow sm:text-xs">
              Médica, Brasil
            </p>
          </figcaption>
        </div>
      </figure>

      {/* 30-day trial box */}
      <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm sm:p-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide sm:text-base">Teste de 30 dias</p>
          <p className="mt-0.5 text-[0.8rem] font-semibold text-muted-foreground sm:text-sm">
            Sem compromisso
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.7rem] font-semibold text-muted-foreground sm:text-xs">
            por apenas 3 pagamentos de
          </p>
          <p className="text-lg font-black leading-tight text-brand-green sm:text-xl">$8.27</p>
        </div>
      </div>

      <CtaLink>Aceder agora ao meu protocolo! ✅</CtaLink>

      {/* Facebook-style comment */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-2.5">
          <SmartImage
            src={manImg}
            alt="Fotografia de perfil de Sipho Dlamini"
            width={600}
            height={750}
            className="object-cover"
            wrapperClassName="h-10 w-10 shrink-0 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="rounded-2xl bg-muted px-3.5 py-2.5">
              <p className="truncate text-[0.85rem] font-bold leading-tight sm:text-sm">
                Sipho Dlamini
              </p>
              <p className="text-[0.7rem] font-semibold text-muted-foreground sm:text-xs">
                Johannesburg, ZA
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed sm:text-sm">
                Thank you so much Lerato. I did everything exactly as you showed me, and it&apos;s
                been 3 months now without any medication. I&apos;m free of diabetes and much
                saudável. 🎁
              </p>
            </div>
            <div className="mt-1.5 flex items-center gap-3 px-3 text-[0.7rem] font-semibold text-muted-foreground sm:text-xs">
              <span>1 h</span>
              <span className="text-brand-green">Gostar</span>
              <span className="text-brand-green">Responder</span>
              <span className="ml-auto flex items-center gap-1">
                <span aria-hidden="true">👍❤️</span>
                <span aria-label="32 reactions">32</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <CtaLink>Aceder agora ao meu protocolo! ✅</CtaLink>

      {/* Zero risk box */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center shadow-sm sm:p-6">
        <span
          aria-hidden="true"
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green/15 text-2xl text-brand-green"
        >
          🛡️
        </span>
        <p className="mt-3 text-base font-black sm:text-lg">O seu risco é zero!</p>
        <p className="mt-3 text-[0.8rem] font-semibold leading-relaxed text-muted-foreground sm:text-sm">
          Ao abrigo do <span className="text-foreground">Código de Defesa do Consumidor</span>, todas as compras
          estão protegidas por uma <span className="text-foreground">30-day de garantia</span>. If the
          protocolo não <span className="text-foreground">NÃO</span> corresponder às suas expectativas e não
          obtiver resultados no prazo de{" "}
          <span className="text-foreground">30 dias</span>, devolveremos o seu dinheiro —{" "}
          <span className="text-foreground">sem perguntas</span> and no bureaucracy.
        </p>
        <p className="mt-3 text-[0.8rem] font-black leading-relaxed sm:text-sm">
          Experimente sem risco!
        </p>
      </div>

      <CtaLink>Aceder agora ao meu protocolo! ✅</CtaLink>
    </section>
  );
}
