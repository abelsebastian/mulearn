import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Users, Info, Medal, X } from "lucide-react";
import styles from "./campusdetails.module.css";
import CLIcon from "../../assets/images/CampusLeadIcon.svg";
import CEIcon from "../../assets/images/CampusEnablerIcon.png";

// Define Campus type to match mockCampusData
interface Campus {
    id: string;
    college_name: string;
    campus_code: string;
    campus_zone: string;
    total_karma: string;
    grade: "A" | "B" | "C" | "N/A";
    lead: { campus_lead: string; enabler: string };
}

// Props interface for CampusDetails
interface CampusDetailsProps {
    campusData: Campus;
}

interface GradeRequirement {
    grade: "A" | "B" | "C";
    requirements: string[];
}

// Grade requirements (unchanged)
const gradeRequirements: GradeRequirement[] = [
    {
        grade: "A",
        requirements: ["Maintain 90% student engagement", "Complete 10 major projects", "Achieve 1000+ karma points"],
    },
    {
        grade: "B",
        requirements: ["Maintain 75% student engagement", "Complete 7 major projects", "Achieve 750+ karma points"],
    },
    {
        grade: "C",
        requirements: ["Maintain 60% student engagement", "Complete 5 major projects", "Achieve 500+ karma points"],
    },
];

// Utility function to generate random values
const getRandomActiveStudents = () => Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Random between 100-500
const getRandomOverallRank = () => Math.floor(Math.random() * (50 - 1 + 1)) + 1; // Random between 1-50

const CampusDetails: React.FC<CampusDetailsProps> = ({ campusData }) => {
    const getGradeIcon = (grade: "A" | "B" | "C" | "N/A"): JSX.Element | null => {
        switch (grade) {
            case "A":
                return <Trophy className="h-8 w-8" style={{ color: "#0066FF" }} />;
            case "B":
                return <Trophy className="h-8 w-8" style={{ color: "#94A3B8" }} />;
            case "C":
                return <Trophy className="h-8 w-8" style={{ color: "#B45309" }} />;
            case "N/A":
                return <Trophy className="h-8 w-8" style={{ color: "#64748B" }} />;
            default:
                return null; // Fallback, though not needed with type restriction
        }
    };

    // Map campusData to component fields, adding random values for missing fields
    const displayData = {
        name: campusData.college_name,
        code: campusData.campus_code,
        grade: campusData.grade,
        karmaPoints: parseInt(campusData.total_karma),
        activeStudents: getRandomActiveStudents(), // Random value since not in mockCampusData
        campusLead: campusData.lead.campus_lead,
        campusEnabler: campusData.lead.enabler,
        overallRank: getRandomOverallRank(), // Random value since not in mockCampusData
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            {displayData.name} ({displayData.code})
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
                            {getGradeIcon(displayData.grade)}
                            <span className={styles.gradeText}>Grade {displayData.grade}</span>
                        </div>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Karma Points</h3>
                            <Medal size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>{displayData.karmaPoints.toLocaleString()}</div>
                        <p className={styles.statsLabel}>Points earned this year</p>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Active Students</h3>
                            <Users size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>{displayData.activeStudents}</div>
                        <p className={styles.statsLabel}>Currently active</p>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Overall Rank</h3>
                            <Trophy size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>#{displayData.overallRank}</div>
                        <p className={styles.statsLabel}>Among all campuses</p>
                    </div>
                </div>

                <div className={styles.leadershipSection}>
                    <h3 className={styles.leadershipTitle}>Campus Leadership</h3>
                    <div className={styles.leadershipGrid}>
                        <div className={styles.leaderCard}>
                            <div className="flex items-center flex-col">
                                <img src={CLIcon} alt="Campus Lead" className={styles.leaderIcon} />
                                <div className={styles.leaderName}>{displayData.campusLead}</div>
                                <span className={styles.leaderRole}>Campus Lead</span>
                            </div>
                        </div>
                        {displayData.campusEnabler && (
                            <div className={styles.leaderCard}>
                                <div className="flex flex-col items-center">
                                    <img src={CEIcon} alt="Campus Enabler" className={styles.leaderIcon} />
                                    <div className={styles.leaderName}>{displayData.campusEnabler}</div>
                                    <span className={styles.leaderRole}>Campus Lead Enabler</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusDetails;