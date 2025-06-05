import { useState, useEffect } from "react";

interface SpecialDate {
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
}

export function useSpecialDates() {
  const [specialDate, setSpecialDate] = useState<SpecialDate | null>(null);

  useEffect(() => {
    const checkSpecialDates = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // getMonth() returns 0-11
      const day = now.getDate();

      // Debug: Log current date check
      console.log(
        `Checking special dates for: ${month}-${day} (${now.toDateString()})`
      );

      // Special dates throughout the year
      const specialDates: { [key: string]: Omit<SpecialDate, "isActive"> } = {
        "1-1": {
          name: "New Year's Day",
          emoji: "🎊",
          color: "from-yellow-400 to-pink-500",
        },
        "2-14": {
          name: "Valentine's Day",
          emoji: "💕",
          color: "from-pink-400 to-red-500",
        },
        "3-17": {
          name: "St. Patrick's Day",
          emoji: "🍀",
          color: "from-green-400 to-emerald-500",
        },
        "4-1": {
          name: "April Fools' Day",
          emoji: "🤡",
          color: "from-purple-400 to-pink-500",
        },
        "4-22": {
          name: "Earth Day",
          emoji: "🌍",
          color: "from-green-400 to-blue-500",
        },
        "5-5": {
          name: "Cinco de Mayo",
          emoji: "🌮",
          color: "from-red-400 to-green-500",
        },
        "6-21": {
          name: "Summer Solstice",
          emoji: "☀️",
          color: "from-yellow-400 to-orange-500",
        },
        "7-4": {
          name: "Independence Day",
          emoji: "🎆",
          color: "from-red-400 to-blue-500",
        },
        "10-31": {
          name: "Halloween",
          emoji: "🎃",
          color: "from-orange-400 to-purple-500",
        },
        "11-24": {
          name: "Thanksgiving",
          emoji: "🦃",
          color: "from-orange-400 to-amber-500",
        },
        "12-25": {
          name: "Christmas",
          emoji: "🎄",
          color: "from-red-400 to-green-500",
        },
        "12-31": {
          name: "New Year's Eve",
          emoji: "🎉",
          color: "from-purple-400 to-pink-500",
        },
      };

      const dateKey = `${month}-${day}`;
      const special = specialDates[dateKey];

      if (special) {
        setSpecialDate({
          ...special,
          isActive: true,
        });
      } else {
        // No special date today, clear any existing special date
        setSpecialDate(null);
      }
    };

    checkSpecialDates();
    // Check every day at midnight
    const interval = setInterval(checkSpecialDates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return specialDate;
}
