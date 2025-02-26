import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";

// Move static data outside component to prevent recreation
const EVENTS =  [
  { id: "evt-001", title: "UI/UX Design Sprint Workshop", link: "https://uiuxcommunity.com/events/design-sprint", venue: "Online via Zoom", eventType: "Online" as "Online", date: "March 15, 2025", time: "14:00 - 17:00 GMT", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" },
  { id: "evt-002", title: "Figma Advanced Prototyping Masterclass", link: "https://uiuxcommunity.com/events/figma-masterclass", venue: "Semarang Convention Center", eventType: "Offline" as "Offline", date: "April 10, 2025", time: "09:00 - 12:00 WIB", image: '/assets/interestgroup_assets/Top100Desigers3.png' },
  { id: "evt-003", title: "User Research Techniques Webinar", link: "https://uiuxcommunity.com/events/user-research-webinar", venue: "Online via Microsoft Teams", eventType: "Online" as "Online", date: "May 5, 2025", time: "10:00 - 11:30 GMT", image: '/assets/interestgroup_assets/Top100Desigers2.png' },
  { id: "evt-004", title: "UI Design Trends 2025 Conference", link: "https://uiuxcommunity.com/events/ui-trends-2025", venue: "Jakarta Design Hub", eventType: "Offline" as "Offline", date: "June 20, 2025", time: "13:00 - 17:00 WIB", image: '/assets/interestgroup_assets/Top100Desigers3.png' },
  { id: "evt-005", title: "Accessibility in UX Design Workshop", link: "https://uiuxcommunity.com/events/accessibility-workshop", venue: "Online via Google Meet", eventType: "Online" as "Online", date: "July 12, 2025", time: "15:00 - 16:30 GMT", image: '/assets/interestgroup_assets/Top100Desigers2.png' },
]
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
            <SidebarBannerSlider events={EVENTS} />
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