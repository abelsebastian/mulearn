// TODO fix responsive design

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { getDomainBasedInterestGroups } from "../services/api";

// Move static data outside component to prevent recreation
const DOMAIN_IMAGES = {
  "coder": "https://via.placeholder.com/50?text=UIUX",
  "hardware": "https://via.placeholder.com/50?text=Video",
  "manager": "https://via.placeholder.com/50?text=Comics",
  "creative": "https://via.placeholder.com/50?text=Writing",
  "others": "https://via.placeholder.com/50?text=Others",
}

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


interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}

// Define the type expected from getDomainBasedInterestGroups
interface ApiInterestGroup {
  id: string;
  name: string;
  icon: string;
  code: string;
  category: string;
  members: number;
  updated_by: string;
  updated_at: string;
  created_by: string;
  created_at: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  const userDomains: string[] = fetchLocalStorage<UserInfo>("userInfo")?.user_domains || [];


  useEffect(() => {
    const fetchInterestGroups = async () => {
      try {
        const response = await getDomainBasedInterestGroups(userDomains[0]);
        if (response) {
          const newGroups = response.map((group) => ({
            title: group.name,
            id: group.id,
            link: `interestgroups/${group.id}`,
            image: "https://via.placeholder.com/50?text=Writing",
          }));
          setInterestGroups((prev) =>
            JSON.stringify(prev) === JSON.stringify(newGroups) ? prev : newGroups
          );
        }
      } catch (error) {
        console.error("Failed to fetch interest groups:", error);
      }
    };
    fetchInterestGroups();
  }, [userDomains[0]]);

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
          {/* TODO: Add image based on user domain */}
          {userDomains[0] === "coder" ? (
            <img
              src="/assets/landing/dashboard.png"
              alt="Coding illustration"
              loading="lazy"
              className={styles.codingImage}
              width={400}
              height={300}
            />
          ):(userDomains[0] === "hardware" ? (
            <img
              src="/assets/landing/maker.png"
              alt="Maker illustration"
              loading="lazy"
              className={styles.codingImage}
              width={400}
              height={300}
            />
          ):(userDomains[0] === "creative" ? (
            <img
              src="/assets/landing/designer.png"
              alt="Designer illustration"
              loading="lazy"
              className={styles.codingImage}
              width={400}
              height={300}
            />
          ):(userDomains[0] === "manager" ? (
            <img
              src="/assets/landing/manager.png"
              alt="Manager illustration"
              loading="lazy"
              className={styles.codingImage}
              width={400}
              height={300}
            />
          ):
            <img
              src="/assets/landing/others.png"
              alt="General illustration"
              loading="lazy"
              className={styles.codingImage}
              width={400}
              height={300}
            />)))}
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
            <InterestGroups title={userDomains[0]} groups={interestGroups} />
          <KarmaEarners
            highestStudent={KARMA_DATA.highestStudent}
            highestCollege={KARMA_DATA.highestCollege}
            longestStreak={KARMA_DATA.longestStreak}
          />
        </aside>
      </div>
    </div>
  );
};

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;