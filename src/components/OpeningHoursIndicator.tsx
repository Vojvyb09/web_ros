import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday?: string;
  sunday?: string;
  closedOffice?: boolean;
  closedReason?: string;
  closedUntil?: string;
  replacements?: unknown[];
}

const DAY_KEYS: (keyof OpeningHours)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function parseTimeRange(value: string): { start: number; end: number } | null {
  const m = value.trim().match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const start = parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  const end = parseInt(m[3], 10) * 60 + parseInt(m[4], 10);
  return { start, end };
}

function isOfficeOpenNow(hours: OpeningHours | null): boolean {
  if (!hours) return false;

  const closedUntilStr = (hours.closedUntil ?? "").trim();
  if (closedUntilStr) {
    const until = new Date(closedUntilStr);
    until.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (today > until) {
      // closedUntil vypršelo, řídíme se podle dnů
    } else if (hours.closedOffice && ((hours.closedReason ?? "").trim() || (hours.replacements?.length ?? 0) > 0)) {
      return false;
    }
  } else if (hours.closedOffice && ((hours.closedReason ?? "").trim() || (hours.replacements?.length ?? 0) > 0)) {
    return false;
  }

  const now = new Date();
  const dayIndex = now.getDay();
  const key = DAY_KEYS[dayIndex];
  const value = (hours[key] ?? "") as string;
  const trimmed = value.trim().toLowerCase();

  if (trimmed === "zavřeno") return false;

  const range = parseTimeRange(value);
  if (!range) return false;

  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= range.start && minutes < range.end;
}

interface OpeningHoursIndicatorProps {
  onOpenModal: () => void;
}

export function OpeningHoursIndicator({ onOpenModal }: OpeningHoursIndicatorProps) {
  const [hours, setHours] = useState<OpeningHours | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/hours")
      .then((res) => res.json())
      .then((data) => {
        setHours(data);
        setOpen(isOfficeOpenNow(data));
      })
      .catch(() => setOpen(null));
  }, []);

  if (open === null && !hours) return null;

  const isOpen = open === true;

  return (
    <button
      type="button"
      onClick={onOpenModal}
      className="fixed right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 sm:right-4 rounded-full shadow-lg flex items-center justify-center border-2 border-white/80 transition-transform active:scale-95 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 touch-manipulation min-w-[48px] min-h-[48px]"
      style={{
        backgroundColor: isOpen ? "#16a34a" : "#dc2626",
        boxShadow: isOpen
          ? "0 0 20px rgba(22, 163, 74, 0.6)"
          : "0 0 20px rgba(220, 38, 38, 0.6)",
      }}
      title={isOpen ? "Ordinace je nyní otevřená – klikněte pro detail" : "Ordinace je nyní zavřená – klikněte pro detail"}
      aria-label={isOpen ? "Otevřeno, zobrazit ordinační dobu" : "Zavřeno, zobrazit ordinační dobu"}
    >
      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none" />
    </button>
  );
}
