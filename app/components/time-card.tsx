import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import NumberFlow, { continuous } from "@number-flow/react";
import { cn } from "~/lib/utils";

export default function TimeCard({
  title,
  value,
  theme,
}: {
  title: string;
  value: number;
  theme: "light" | "dark";
}) {
  const cardBg =
    theme === "dark"
      ? "bg-slate-800/30 border-slate-700/50"
      : "bg-white/60 border-slate-200";

  const textColor = theme === "dark" ? "text-white" : "text-slate-900";
  const titleColor = theme === "dark" ? "text-blue-200" : "text-blue-600";

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          theme === "dark"
            ? "0 0 15px rgba(59, 130, 246, 0.2)"
            : "0 0 15px rgba(59, 130, 246, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`overflow-hidden border backdrop-blur-sm ${cardBg}`}>
        <CardHeader className="pb-0 pt-3">
          <CardTitle
            className={`text-center text-base font-normal ${titleColor}`}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="py-4 text-3xl md:text-5xl font-bold text-center">
            <span className={cn(textColor, "tabular-nums")}>
              <NumberFlow
                value={value}
                format={{
                  minimumIntegerDigits: 2,
                }}
                plugins={[continuous]}
                willChange={true}
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
