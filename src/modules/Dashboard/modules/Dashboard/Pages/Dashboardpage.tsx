import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { getDomainBasedInterestGroups, getKarmaFeed, KarmaFeedItem } from "../services/api";
import { useUserStore } from "/src/ZustandProvider";

const EVENTS = [
  {
    id: "evt-002",
    title: "Figma Advanced Prototyping Masterclass",
    link: "https://uiuxcommunity.com/events/figma-masterclass",
    venue: "Semarang Convention Center",
    eventType: "Offline" as const,
    date: "April 10, 2025",
    time: "09:00 - 12:00 WIB",
    image: "/assets/interestgroup_assets/Top100Desigers3.png",
  },
  {
    id: "evt-003",
    title: "User Research Techniques Webinar",
    link: "https://uiuxcommunity.com/events/user-research-webinar",
    venue: "Online via Microsoft Teams",
    eventType: "Online" as const,
    date: "May 5, 2025",
    time: "10:00 - 11:30 GMT",
    image: "/assets/interestgroup_assets/Top100Desigers2.png",
  },
  {
    id: "evt-004",
    title: "UI Design Trends 2025 Conference",
    link: "https://uiuxcommunity.com/events/ui-trends-2025",
    venue: "Jakarta Design Hub",
    eventType: "Offline" as const,
    date: "June 20, 2025",
    time: "13:00 - 17:00 WIB",
    image: "/assets/interestgroup_assets/Top100Desigers3.png",
  },
  {
    id: "evt-005",
    title: "Accessibility in UX Design Workshop",
    link: "https://uiuxcommunity.com/events/accessibility-workshop",
    venue: "Online via Google Meet",
    eventType: "Online" as const,
    date: "July 12, 2025",
    time: "15:00 - 16:30 GMT",
    image: "/assets/interestgroup_assets/Top100Desigers2.png",
  },
];

interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");

  if (!userName) {
    userName = storedUserInfo ? storedUserInfo?.full_name.split(" ")?.[0] : null;
  }

  const [karmaFeed, setKarmaFeed] = useState<KarmaFeedItem[]>([]);
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
            image: "/assets/IG/mobile_dev.jpg",
          }));
          setInterestGroups((prev) =>
            JSON.stringify(prev) === JSON.stringify(newGroups)
              ? prev
              : newGroups.slice(0, 5)
          );
        }
      } catch (error) {
        console.error("Failed to fetch interest groups:", error);
      }
    };
    fetchInterestGroups();
  }, [userDomains[0]]);

  const handleStartLearning = useCallback(() => {
    navigate('/dashboard/mujourney');
  }, [navigate]);

  const handleJoinLearning = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);

  useEffect(() => {
    async function fetchKarmaFeed() {
      try {
        const response = await getKarmaFeed();
        if (!response) return;
        setKarmaFeed(response);
      } catch (error) {
        console.error("Failed to fetch karma feed:", error);
      }
    }
    fetchKarmaFeed();
  }, []);

  const imageMap: { [key: string]: { src: string; alt: string } } = {
    coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
    maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
    creative: { src: "/assets/landing/creative.webp", alt: "Designer illustration" },
    manager: { src: "/assets/landing/manager.webp", alt: "Manager illustration" },
  };
  const defaultImage = { src: "/assets/landing/others.png", alt: "General illustration" };
  const { src, alt } = imageMap[userDomains[0]] || defaultImage;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div className={styles.leftColumn} initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.6 }}>
          <motion.section className={styles.welcomeSection} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                {!storedUserInfo.exist_in_guild ? 'Welcome' : 'Welcome back'} <span>{userName}</span> 👋
              </h1>
              <p className={styles.welcomeMessage}>
                This dashboard is being updated. Expect improvements and possible bugs. Thanks for your patience!
              </p>
              <div className={styles.buttons}>
                <motion.button
                  className={styles.button}
                  onClick={handleStartLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
                <motion.button
                  className={styles.button2}
                  onClick={handleJoinLearning}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Learning
                </motion.button>
                <motion.button
                  className={styles.button2}
                  onClick={() => window.open("https://app.formbricks.com/s/cm7ztbf2d0000l70365noohib", "_blank")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Report Issues
                </motion.button>
              </div>
            </div>
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              className={styles.dashboardImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.section>
          <LearningCirclesSection />
        </motion.div>

        <motion.aside 
          className={styles.rightWrapper}
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.section className={styles.slider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className={styles.happeningTitle}>Happening Now</h2>
            <motion.div 
              className={styles.happeningCardsContainer}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <SidebarBannerSlider events={EVENTS} />
            </motion.div>
          </motion.section>
          {karmaFeed.length > 1 && karmaFeed[0].user && karmaFeed[1].user && (
            <KarmaEarners highestStudent={karmaFeed[0]} highestCollege={karmaFeed[1]} />
          )}
          <InterestGroups title={userDomains[0]} groups={interestGroups} />
        </motion.aside>
      </motion.div>
    </motion.div>
  );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
