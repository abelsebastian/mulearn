import React from "react";
import styles from "./KarmaEarners.module.css";
import { FaFire } from "react-icons/fa";

type KarmaEarnersProps = {
  highestStudent: {
    name: string;
    currentKarma: number;
    earnedYesterday: number;
  };
  highestCollege: {
    name: string;
    currentKarma: number;
    earnedYesterday: number;
  };
  longestStreak: {
    name: string;
    streakDays: number;
  };
};

const KarmaEarners: React.FC<KarmaEarnersProps> = ({
  highestStudent,
  highestCollege,
  longestStreak,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Karma Earners</h3>
      <div className={styles.earnersList}>
        <div className={`${styles.earnerItem} ${styles.studentCard}`}>
          <div className={styles.earnerTitle}>Highest Karma Earner (Student)</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>{highestStudent.name}</span>
            <span className={styles.currentKarma}>{highestStudent.currentKarma}</span>
            <span className={styles.earnedYesterday}>
              +{highestStudent.earnedYesterday} yesterday
            </span>
          </div>
        </div>
        <div className={`${styles.earnerItem} ${styles.collegeCard}`}>
          <div className={styles.earnerTitle}>Highest Karma Earner (College)</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>{highestCollege.name}</span>
            <span className={styles.currentKarma}>{highestCollege.currentKarma}</span>
            <span className={styles.earnedYesterday}>
              +{highestCollege.earnedYesterday} yesterday
            </span>
          </div>
        </div>
        <div className={`${styles.earnerItem} ${styles.streakCard}`}>
          <div className={styles.earnerTitle}>Longest Streak Holder</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>{longestStreak.name}</span>
            <span className={styles.streakDays}>
              {longestStreak.streakDays} days <FaFire className={styles.fireIcon} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarmaEarners;
