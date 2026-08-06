export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none text-center leading-none ${className}`}>
      <div className="text-[0.62rem] font-extrabold tracking-[0.22em] text-brand-green sm:text-xs">
        THE
      </div>
      <div className="-mt-0.5 text-3xl font-black italic tracking-tight text-brand-green sm:text-4xl">
        Diabetes Protocol
      </div>
    </div>
  );
}
