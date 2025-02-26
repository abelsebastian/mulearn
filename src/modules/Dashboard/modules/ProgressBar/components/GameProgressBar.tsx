"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Zap } from "lucide-react";
import style from "./GameProgressBar.module.css";

interface Level {
  tasks?: { completed: boolean; karma?: number }[];
  karma?: number;
}

export default function GameProgressBar({ levelData = [] }: { levelData: Level[] }) {
  if (!levelData || levelData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-gray-500"></p>
      </div>
    );
  }

  const totalKarmaEarned = useMemo(() => {
    return levelData.reduce((acc, level) => {
      const levelKarma = level.tasks?.reduce((taskAcc, task) => {
        return task.completed ? taskAcc + (task.karma || 0) : taskAcc;
      }, 0) || 0;
      return acc + levelKarma;
    }, 0);
  }, [levelData]);

  const [localTotalKarma, setLocalTotalKarma] = useState(totalKarmaEarned);

  useEffect(() => {
    setLocalTotalKarma(totalKarmaEarned);
  }, [totalKarmaEarned]);

  const pointsPerLevel = useMemo(() => levelData.map((level) => level.karma || 0), [levelData]);
  const maxLevel = levelData.length;

  const getLevelMetrics = useMemo(() => {
    let currentLevel = 1;
    let karmaInLevel = localTotalKarma;

    while (currentLevel < maxLevel && karmaInLevel >= pointsPerLevel[currentLevel - 1]) {
      karmaInLevel -= pointsPerLevel[currentLevel - 1];
      currentLevel += 1;
    }

    const totalRequired = pointsPerLevel[currentLevel - 1] || 100;
    let progress = totalRequired > 0 ? (karmaInLevel / totalRequired) * 100 : 0;

    if (currentLevel === maxLevel && karmaInLevel >= totalRequired) {
      progress = 100;
      karmaInLevel = totalRequired;
    }

    return { level: currentLevel, currentPoints: karmaInLevel, totalRequired, progress };
  }, [localTotalKarma, pointsPerLevel, maxLevel]);

  const { level: displayLevel, currentPoints: displayPoints, totalRequired, progress } = getLevelMetrics;
  const roundedPoints = Math.round(displayPoints);
  
  const icons: { [key: number]: JSX.Element } = {
    1: <Flame className="w-8 h-8 text-yellow-400" />, 
    2: <Star className="w-8 h-8 text-yellow-400" />, 
    3: <Zap className="w-8 h-8 text-yellow-400" />
  };
  
  const icon = icons[Math.min(displayLevel, 3)] || icons[1];

  return (
    <div className="">
      <div className="flex items-center w-full max-w-2xl h-9 mx-auto px-4 relative">
        <motion.div
          className={`${style.iconContainer} w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700`}
          animate={{ scale: [1, 1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {icon}
        </motion.div>

        <div className="flex flex-col flex-grow items-start justify-center !z-0">
          <div className="text-white text-base md:text-xs font-bold bg-blue-500 !px-6 py-1 rounded-tr-sm">
            Level {displayLevel}
          </div>
          <div
            className="relative h-6 w-44 rounded-full overflow-hidden mt-1"
            style={{ background: "rgba(30, 41, 59, 0.8)" }}
            role="progressbar"
            aria-valuenow={roundedPoints}
            aria-valuemin={0}
            aria-valuemax={totalRequired}
            aria-label={`Progress towards level ${displayLevel + 1}`}
          >
            <motion.div
              className="h-full w-xl rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-2 flex items-center justify-end pr-4">
              <span className="text-white font-medium text-xs md:text-xs">
                {roundedPoints}/{totalRequired}
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Level {displayLevel}, {roundedPoints} out of {totalRequired} karma towards level {displayLevel + 1}
      </span>
    </div>
  );
}
