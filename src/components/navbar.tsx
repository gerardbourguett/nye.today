import { Link } from "react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-xl bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-700/70 border-b border-sky-400/20 dark:border-sky-900/40 shadow-lg py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-8 xl:px-10 z-50 relative w-full">
      <div className="w-full max-w-none mx-auto">
        <div className="flex justify-between items-center w-full min-h-[48px] sm:min-h-[52px] lg:min-h-[56px]">
          {/* Logo animado */}
          <motion.div
            className="flex items-center gap-2 select-none flex-shrink-0"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <motion.img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-xl rounded-full border-2 border-sky-400/40 bg-white/10"
              whileHover={{ rotate: [0, 8, -8, 0], scale: 1.08 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <span className="ml-1 sm:ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-400 via-sky-500 to-slate-400 bg-clip-text text-transparent tracking-wide hidden xs:inline-block">
              NYE.LIVE
            </span>
          </motion.div>{" "}
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 flex-grow justify-center">
            {[
              "Home",
              "Road to 2026",
              "Map",
              "Watch Carousel",
              "Watch Stream",
            ].map((label) => (
              <motion.div
                key={label}
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                <Link
                  to={
                    label === "Home"
                      ? "/"
                      : `/${label.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="px-3 py-2 xl:px-4 xl:py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 bg-gradient-to-r from-sky-500/0 to-slate-500/0 hover:from-sky-500/20 hover:to-slate-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 text-white shadow-sm hover:shadow-lg relative overflow-hidden group"
                >
                  {/* Background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-slate-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Text with relative positioning */}
                  <span className="relative z-10">{label}</span>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-sky-500 to-slate-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          {/* Tablet Navigation - Shows main links with hamburger for others */}
          <div className="hidden md:flex lg:hidden items-center space-x-3 flex-grow justify-center">
            {["Home", "Road to 2026", "Map"].map((label) => (
              <motion.div
                key={label}
                whileHover={{ y: -2, scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                <Link
                  to={
                    label === "Home"
                      ? "/"
                      : `/${label.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="px-2 py-1.5 rounded-lg font-medium text-sm transition-all duration-300 bg-gradient-to-r from-sky-500/0 to-slate-500/0 hover:from-sky-500/20 hover:to-slate-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 text-white shadow-sm hover:shadow-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">{label}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-sky-500 to-slate-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          {/* Theme Toggle for desktop */}
          <motion.div
            className="hidden lg:flex flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ModeToggle />
          </motion.div>{" "}
          {/* Mobile/Tablet Navigation with Hamburger */}
          <div className="flex md:hidden lg:hidden items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Theme Toggle for mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ModeToggle />
            </motion.div>

            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="text-white hover:text-sky-300 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-200">
                    <HamburgerMenuIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-14 sm:top-16 right-0 sm:right-2 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl border border-sky-400/20 min-w-[180px] sm:min-w-[200px] z-50">
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      {[
                        "Home",
                        "Road to 2026",
                        "Map",
                        "Watch Carousel",
                        "Watch Stream",
                      ].map((label, index) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={
                              label === "Home"
                                ? "/"
                                : `/${label.toLowerCase().replace(/ /g, "-")}`
                            }
                            className="block px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-sky-500/0 to-slate-500/0 hover:from-sky-500/20 hover:to-slate-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 text-white shadow-sm hover:shadow-lg border border-transparent hover:border-sky-400/30"
                          >
                            {label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
          {/* Tablet Navigation with Hamburger for remaining items */}
          <div className="hidden md:flex lg:hidden items-center gap-3 flex-shrink-0">
            {/* Theme Toggle for tablet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ModeToggle />
            </motion.div>

            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="text-white hover:text-sky-300 p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-200">
                    <HamburgerMenuIcon className="h-6 w-6" />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-14 right-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-sky-400/20 min-w-[160px] z-50">
                    <div className="flex flex-col space-y-3">
                      {["Watch Carousel", "Watch Stream"].map(
                        (label, index) => (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={`/${label.toLowerCase().replace(/ /g, "-")}`}
                              className="block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 bg-gradient-to-r from-sky-500/0 to-slate-500/0 hover:from-sky-500/20 hover:to-slate-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 text-white shadow-sm hover:shadow-lg border border-transparent hover:border-sky-400/30"
                            >
                              {label}
                            </Link>
                          </motion.div>
                        )
                      )}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </div>
      </div>
    </nav>
  );
}
