import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className, showText = true, variant = "dark" }: LogoProps) {
  const isLight = variant === "light";
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
        <img
          src="/icon.png"
          alt="Logo ordinace"
          className="w-full h-full object-contain"
        />
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={cn(
            "text-xl font-serif font-bold leading-none tracking-tight",
            isLight ? "text-white" : "text-gray-900"
          )}>
            MUDr. Marta
          </span>
          <span className={cn(
            "text-xs font-bold uppercase tracking-[0.25em] leading-none mt-1.5",
            isLight ? "text-gray-400" : "text-primary"
          )}>
            Rösnerová
          </span>
        </div>
      )}
    </div>
  );
}
