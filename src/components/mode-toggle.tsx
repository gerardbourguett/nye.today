import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme === "dark" ? "dark" : "light"}
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 90, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>

            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 rounded-md"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(59,130,246,0.1), transparent)",
                  "radial-gradient(circle, rgba(147,51,234,0.1), transparent)",
                  "radial-gradient(circle, rgba(59,130,246,0.1), transparent)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background/95 backdrop-blur-md border-border/50"
      >
        <AnimatePresence>
          {themes.map((themeOption, index) => {
            const IconComponent = themeOption.icon;
            return (
              <motion.div
                key={themeOption.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DropdownMenuItem
                  onClick={() => setTheme(themeOption.value)}
                  className="cursor-pointer flex items-center gap-2 hover:bg-accent/50 transition-colors duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.div>
                  <span>{themeOption.label}</span>
                  {theme === themeOption.value && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </DropdownMenuItem>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
