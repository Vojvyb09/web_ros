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
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="irisGradient" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" /> {/* Sky blue */}
              <stop offset="1" stopColor="#2563EB" /> {/* Royal blue */}
            </linearGradient>
            <linearGradient id="scleraGradient" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F3F4F6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Eye Shape (Sclera) */}
          <path
            d="M10 50C10 50 30 20 50 20C70 20 90 50 90 50C90 50 70 80 50 80C30 80 10 50 10 50Z"
            fill={isLight ? "rgba(255,255,255,0.1)" : "white"}
            stroke={isLight ? "white" : "#111827"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Iris */}
          <circle
            cx="50"
            cy="50"
            r="18"
            fill="url(#irisGradient)"
            stroke={isLight ? "white" : "none"}
            strokeWidth="1"
          />

          {/* Pupil */}
          <circle cx="50" cy="50" r="7" fill="#111827" />

          {/* Reflection / Glint */}
          <circle cx="42" cy="42" r="3" fill="white" opacity="0.8" />
          <circle cx="56" cy="54" r="1.5" fill="white" opacity="0.6" />

          {/* Medical Cross Detail (Subtle overlay) */}
          <path
            d="M50 45V55M45 50H55"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
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
