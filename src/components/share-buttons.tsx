import React from "react";
import { motion } from "motion/react";
import {
  BlueskyIcon,
  BlueskyShareButton,
  FacebookIcon,
  FacebookShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface ShareButtonsProps {
  value: string;
}

export default function ShareButtons({ value }: ShareButtonsProps) {
  const shareUrl = "https://nye.today";
  const title = `⛵ Our galleon has sailed ${value}% through 2025! Join the journey at`;

  const buttons = [
    { Component: TwitterShareButton, Icon: XIcon, name: "X/Twitter" },
    { Component: FacebookShareButton, Icon: FacebookIcon, name: "Facebook" },
    { Component: TelegramShareButton, Icon: TelegramIcon, name: "Telegram" },
    { Component: RedditShareButton, Icon: RedditIcon, name: "Reddit" },
    { Component: ThreadsShareButton, Icon: ThreadsIcon, name: "Threads" },
    { Component: BlueskyShareButton, Icon: BlueskyIcon, name: "Bluesky" },
    { Component: WhatsappShareButton, Icon: WhatsappIcon, name: "WhatsApp" },
    { Component: PocketShareButton, Icon: PocketIcon, name: "Pocket" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className="text-sm font-medium text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Share the voyage 🌊
      </motion.h3>

      <motion.div
        className="flex flex-wrap justify-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/30 dark:to-purple-950/30 backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/20"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {buttons.map(({ Component, Icon, name }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4 + index * 0.05,
              type: "spring",
              stiffness: 300,
            }}
            whileHover={{
              scale: 1.1,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <Component
              url={shareUrl}
              title={title}
              className="transition-all duration-200"
            >
              <div className="relative">
                <Icon
                  size={36}
                  round={true}
                  className="drop-shadow-md group-hover:drop-shadow-lg transition-all duration-200"
                />
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(59,130,246,0.4), transparent)",
                    filter: "blur(8px)",
                  }}
                />
              </div>
            </Component>

            {/* Tooltip */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              Share on {name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Help others track their journey through 2025! ⚓
      </motion.p>
    </motion.div>
  );
}
