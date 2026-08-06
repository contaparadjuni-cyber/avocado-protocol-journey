import type { ReactNode } from "react";
import { BrandLogo } from "./BrandLogo";

export function QuizShell({
  progress,
  children,
}: {
  progress: number;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-5 sm:px-6 sm:pt-7">
      <div className="mx-auto w-full max-w-[30rem] sm:max-w-[34rem]">
        <BrandLogo />
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-brand-green-soft sm:h-2.5">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="mt-7 sm:mt-9">{children}</div>
      </div>
    </div>
  );
}
