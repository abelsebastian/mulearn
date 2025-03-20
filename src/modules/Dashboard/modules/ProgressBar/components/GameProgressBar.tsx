"use client";
import { motion } from "framer-motion";
import { Img } from "@chakra-ui/react";
import style from "./GameProgressBar.module.css";
import Level1 from "../../Profile/components/MuVoyage/assets/images/Level1.webp";
import Level2 from "../../Profile/components/MuVoyage/assets/images/Level2.webp";
import Level3 from "../../Profile/components/MuVoyage/assets/images/Level3.webp";
import Level4 from "../../Profile/components/MuVoyage/assets/images/Level4.webp";
import Level5 from "../../Profile/components/MuVoyage/assets/images/Level5.webp";
import Level6 from "../../Profile/components/MuVoyage/assets/images/Level6.webp";
import Level7 from "../../Profile/components/MuVoyage/assets/images/Level7.webp";

interface Task {
  completed: boolean;
  karma?: number;
}

interface Level {
  name?: string;
  tasks?: Task[];
  karma: number;
}

interface LevelDataResult {
  currentLevel: number;
  currentPoints: number;
  karmaRequired: number;
  progress?: number;
}

const ImageMap = [
  { level: 1, image: Level1 },
  { level: 2, image: Level2 },
  { level: 3, image: Level3 },
  { level: 4, image: Level4 },
  { level: 5, image: Level5 },
  { level: 6, image: Level6 },
  { level: 7, image: Level7 },
];

export default function GameProgressBar({
  levelData = [],
  userLevel
}: {
  levelData: Level[],
  userLevel?: string
}) {
  function transformToLevelData(levelData: Level[], userLevel: string = "lvl1"): LevelDataResult | string {
    const cleanedUserLevel = (userLevel || "lvl1").replace("lvl", "");

    if (!levelData || !Array.isArray(levelData) || levelData.length === 0) {
      // console.error('Invalid or empty levelData provided:', levelData);
      return {
        currentLevel: 1,
        currentPoints: 0,
        karmaRequired: 0
      };
    }

    for (const level of levelData) {
      if (!level.name || level.name.replace("lvl", "") !== cleanedUserLevel) {
        continue;
      }

      const currentLevel = Number(cleanedUserLevel) || 1;
      if (currentLevel === 7) {
        return "You've Made it!";
      }

      const karmaRequired = level.karma;
      const currentLevelKarma = level.tasks
        ?.filter(task => task.completed === true)
        .reduce((sum, task) => sum + (task.karma ?? 0), 0) || 0;

      return {
        currentLevel,
        currentPoints: currentLevelKarma,
        karmaRequired,
        progress: (currentLevelKarma / karmaRequired) * 100
      };
    }

    return {
      currentLevel: 1,
      currentPoints: 0,
      karmaRequired: 0
    };
  }

  if (!levelData || levelData.length === 0) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
            <Img src={ImageMap[0].image} className={style.image} />
          </motion.div>
          <div className={style.progressContainer}>
            <div className={style.progressTitle}>Loading...</div>
            <div className={`${style.progressBar} ${style.progressBarLarge}`}>
              <motion.div
                className={style.progressFill}
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  if (!userLevel) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
            <Img src={ImageMap[0].image} className={style.image} />
          </motion.div>
          <div className={style.progressContainer}>
            <div className={style.progressTitle}>Loading...</div>
            <div className={`${style.progressBar} ${style.progressBarLarge}`}>
              <motion.div
                className={style.progressFill}
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const result = transformToLevelData(levelData, userLevel);

  if (typeof result === "string") {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
            <Img src={ImageMap[6].image} className={style.image} />
          </motion.div>
          <div className={style.progressContainer}>
            <div className={style.progressTitle}>Level 7</div>
            <div className={`${style.progressBar} ${style.progressBarLarge}`} style={{ background: "#22c55e" }}>
              <span className={style.progressText}>You've Made it!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { currentLevel, currentPoints, karmaRequired, progress } = result;
  const imageIndex = Math.min(Math.max(currentLevel - 1, 0), 6);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
          <Img src={ImageMap[imageIndex].image} className={style.image} />
        </motion.div>
        <div className={style.progressContainer}>
          <div className={style.progressTitle}>Level {currentLevel}</div>
          <div className={`${style.progressBar} ${style.progressBarLarge}`}>
            <motion.div className={style.progressFill} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
            <div className={style.progressText}>
              {currentPoints}/{karmaRequired}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

