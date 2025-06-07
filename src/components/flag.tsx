import { cn } from "@/lib/utils";

interface FlagProps {
  code: string;
  size?: "s" | "m" | "l" | "xl";
  className?: string;
  useLocal?: boolean;
}

const Flag = ({ code, size = "m", className, useLocal = false }: FlagProps) => {
  const sizeClasses = {
    s: "w-4 h-3",
    m: "w-6 h-4",
    l: "w-8 h-6",
    xl: "w-12 h-9",
  };

  const flagCode = code.toLowerCase();

  if (useLocal) {
    // Usar assets locales
    const flagPath = `/src/assets/flags/4x3/${flagCode}.svg`;
    return (
      <img
        src={flagPath}
        alt={`Flag of ${code}`}
        className={cn(
          sizeClasses[size],
          "object-cover rounded shadow-sm",
          className
        )}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    );
  }

  // Usar flag-icons CSS
  return (
    <span
      className={cn(
        `fi fi-${flagCode}`,
        sizeClasses[size],
        "inline-block bg-cover bg-center rounded shadow-sm",
        className
      )}
      title={`Flag of ${code}`}
    />
  );
};

export default Flag;
