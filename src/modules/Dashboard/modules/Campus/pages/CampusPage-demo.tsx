import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Trophy, Users, Info, Medal, X } from 'lucide-react';
import styles from './campusdetails.module.css';
import CLIcon from '../assets/images/CampusLeadIcon.svg';
import CEIcon from '../assets/images/CampusEnablerIcon.png';

// Define types for the data structures
interface CampusDetails {
  name: string;
  code: string;
  grade: 'A' | 'B' | 'C'; // Restrict grade to specific values
  karmaPoints: number;
  activeStudents: number;
  campusLead: string;
  campusEnabler: string;
  overallRank: number;
}

interface GradeRequirement {
  grade: 'A' | 'B' | 'C'; // Restrict grade to specific values
  requirements: string[];
}

// Type-safe dummy data
const dummyData: CampusDetails = {
  name: "St. Joseph's College of Engineering and Technology",
  code: "SJC",
  grade: "A",
  karmaPoints: 15000,
  activeStudents: 450,
  campusLead: "AwinDas R",
  campusEnabler: "Sarju S",
  overallRank: 5,
};

// Type-safe grade requirements
const gradeRequirements: GradeRequirement[] = [
  {
    grade: "A",
    requirements: [
      "Maintain 90% student engagement",
      "Complete 10 major projects",
      "Achieve 1000+ karma points",
    ],
  },
  {
    grade: "B",
    requirements: [
      "Maintain 75% student engagement",
      "Complete 7 major projects",
      "Achieve 750+ karma points",
    ],
  },
  {
    grade: "C",
    requirements: [
      "Maintain 60% student engagement",
      "Complete 5 major projects",
      "Achieve 500+ karma points",
    ],
  },
];

export default function CampusDetails() {
  // Type the getGradeIcon function return value as JSX.Element | null
  const getGradeIcon = (grade: 'A' | 'B' | 'C'): JSX.Element | null => {
    switch (grade) {
      case "A":
        return <Trophy className="h-8 w-8" style={{ color: '#0066FF' }} />;
      case "B":
        return <Trophy className="h-8 w-8" style={{ color: '#94A3B8' }} />;
      case "C":
        return <Trophy className="h-8 w-8" style={{ color: '#B45309' }} />;
      default:
        return null; // This won't happen due to type restriction, but satisfies switch exhaustiveness
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              {dummyData.name} ({dummyData.code})
            </h1>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.cardWithBorder}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Campus Grade</h3>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className={styles.iconButton}>
                    <Info size={16} />
                    <span className="sr-only">Grade requirements</span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className={styles.dialogOverlay} />
                  <Dialog.Content className={styles.dialogContent}>
                    <Dialog.Title className={styles.dialogTitle}>
                      Grade Requirements
                    </Dialog.Title>
                    <div className={styles.dialogBody}>
                      {gradeRequirements.map((req) => (
                        <div key={req.grade} className={styles.gradeRequirement}>
                          <div className={styles.gradeDisplay}>
                            {getGradeIcon(req.grade)}
                            <h3 className={styles.gradeText}>Grade {req.grade}</h3>
                          </div>
                          <ul className={styles.requirementsList}>
                            {req.requirements.map((requirement, index) => (
                              <li key={index}>{requirement}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Dialog.Close asChild>
                      <button className={styles.dialogCloseButton}>
                        <X size={16} />
                        <span className="sr-only">Close</span>
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <div className={styles.gradeDisplay}>
              {getGradeIcon(dummyData.grade)}
              <span className={styles.gradeText}>Grade {dummyData.grade}</span>
            </div>
          </div>

          <div className={styles.cardHover}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Karma Points</h3>
              <Medal size={16} style={{ color: '#0066FF' }} />
            </div>
            <div className={styles.statsValue}>{dummyData.karmaPoints.toLocaleString()}</div>
            <p className={styles.statsLabel}>Points earned this year</p>
          </div>

          <div className={styles.cardHover}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Active Students</h3>
              <Users size={16} style={{ color: '#0066FF' }} />
            </div>
            <div className={styles.statsValue}>{dummyData.activeStudents}</div>
            <p className={styles.statsLabel}>Currently active</p>
          </div>

          <div className={styles.cardHover}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Overall Rank</h3>
              <Trophy size={16} style={{ color: '#0066FF' }} />
            </div>
            <div className={styles.statsValue}>#{dummyData.overallRank}</div>
            <p className={styles.statsLabel}>Among all campuses</p>
          </div>
        </div>

        <div className={styles.leadershipSection}>
          <h3 className={styles.leadershipTitle}>Campus Leadership</h3>
          <div className={styles.leadershipGrid}>
            <div className={styles.leaderCard}>
              <div className="flex items-center flex-col">
                <img src={CLIcon} alt="Campus Lead" className={styles.leaderIcon} />
                <div className={styles.leaderName}>{dummyData.campusLead}</div>
                <span className={styles.leaderRole}>Campus Lead</span>
              </div>
            </div>
            <div className={styles.leaderCard}>
              <div className="flex flex-col items-center">
                <img src={CEIcon} alt="Campus Enabler" className={styles.leaderIcon} />
                <div className={styles.leaderName}>{dummyData.campusEnabler}</div>
                <span className={styles.leaderRole}>Campus Lead Enabler</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}