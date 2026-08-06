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
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto w-full max-w-xl">
        <BrandLogo />
        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-brand-green-soft">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
