import { cn } from "@/lib/utils"

export function SelectNative({
  options,
  value,
  onChange,
  placeholder,
  className,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-10 w-full rounded-xl bg-white/4 border border-white/[0.08] hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/[0.06] px-3 py-2 text-sm text-white placeholder:text-white/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}