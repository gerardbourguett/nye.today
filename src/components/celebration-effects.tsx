import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface CelebrationEffectsProps {
  progress: number;
}

export default function CelebrationEffects({
  progress,
}: CelebrationEffectsProps) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  // Milestones where we want to show confetti
  const milestones = [25, 50, 75, 100];

  useEffect(() => {
    const currentMilestone = milestones.find(
      (milestone) => progress >= milestone && lastMilestone < milestone
    );

    if (currentMilestone) {
      setShowConfetti(true);
      setLastMilestone(currentMilestone);

      // Stop confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [progress, lastMilestone]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.1}
      colors={[
        "#FFD700", // Gold
        "#87CEEB", // Sky Blue
        "#20B2AA", // Light Sea Green
        "#FF6347", // Tomato
        "#9370DB", // Medium Purple
        "#32CD32", // Lime Green
      ]}
    />
  );
}
