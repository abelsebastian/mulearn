import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";

// Move static data outside component to prevent recreation
const CREATIVE_GROUPS = [
  {
    title: "Video Editing",
    image: "https://via.placeholder.com/50?text=Video",
    link: "/interest-groups/video-editing",
  },
  {
    title: "UI/UX Design",
    image: "https://via.placeholder.com/50?text=UIUX",
    link: "/interest-groups/ui-ux",
  },
  {
    title: "Comics & Illustration",
    image: "https://via.placeholder.com/50?text=Comics",
    link: "/interest-groups/comics",
  },
  {
    title: "Creative Writing",
    image: "https://via.placeholder.com/50?text=Writing",
    link: "/interest-groups/creative-writing",
  },
];

const KARMA_DATA = {
  highestStudent: {
    name: "John Doe",
    currentKarma: 1500,
    earnedYesterday: 50,
  },
  highestCollege: {
    name: "Tech University",
    currentKarma: 8000,
    earnedYesterday: 200,
  },
  longestStreak: {
    name: "Jane Smith",
    streakDays: 30,
  },
};


const DashboardPage = memo(() => {
  const navigate = useNavigate();

  const handleStartLearning = useCallback(() => {
    navigate('/dashboard/learn');
  }, [navigate]);

  const handleJoinLearning = useCallback(() => {
    navigate('/dashboard/learningcircle');
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>
              Welcome back <span>Ashwant</span> 👋
            </h1>
            <p className={styles.welcomeMessage}>
              You have grown 240% from past week, Keep it up and improve your progress
            </p>
            <div className={styles.buttons}>
              <button 
                className={styles.button} 
                onClick={handleStartLearning}
                aria-label="Start Learning"
              >
                Start Learning
              </button>
              <button 
                className={styles.button2} 
                onClick={handleJoinLearning}
                aria-label="Join Learning"
              >
                Join Learning
              </button>
            </div>
          </div>
          <img
            src="/assets/landing/dashboard.png"
            alt="Dashboard illustration"
            loading="lazy"
            className={styles.dashboardImage}
            width={400}
            height={300}
          />
        </section>

        <section className={styles.slider}>
          <h2 className={styles.happeningTitle}>Happening Now</h2>
          <div className={styles.happeningCardsContainer}>
            <SidebarBannerSlider />
          </div>
        </section>
      </div>

      <div className={styles.wrapper}>
        <LearningCirclesSection />
        <aside className={styles.rightWrapper}>
            <InterestGroups title="Creative" groups={CREATIVE_GROUPS} />
          <KarmaEarners
            highestStudent={KARMA_DATA.highestStudent}
            highestCollege={KARMA_DATA.highestCollege}
            longestStreak={KARMA_DATA.longestStreak}
          />
        </aside>
      </div>
    </div>
  );
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;