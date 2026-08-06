export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none text-center leading-none ${className}`}>
      <div className="text-[0.5rem] font-extrabold tracking-[0.24em] text-brand-green sm:text-[0.58rem]">
        THE
      </div>
      <div className="mt-0.5 text-lg font-black italic tracking-tight text-brand-green sm:text-xl">
        Diabetes Protocol
      </div>
    </div>
  );
}
