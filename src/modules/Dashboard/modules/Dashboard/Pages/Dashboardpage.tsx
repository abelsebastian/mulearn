import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import SidebarBannerSlider, { Event } from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { getDomainBasedInterestGroups, getKarmaFeed, KarmaFeedItem } from "../services/api";
import { useUserStore } from "/src/ZustandProvider";
import { notion } from "/src/modules/utils/notion";


interface InterestGroup {
  title: string;
  id: string;
  link: string;
  image: string;
}


const imageMap: { [key: string]: { src: string; alt: string } } = {
  coder: { src: "/assets/landing/coder2.webp", alt: "Coding illustration" },
  maker: { src: "/assets/landing/maker.webp", alt: "Maker illustration" },
  creative: { src: "/assets/landing/creative.webp", alt: "Designer illustration" },
  manager: { src: "/assets/landing/manager.webp", alt: "Manager illustration" },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  const [events, setEvents] = useState<Event[]>([]);

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

  
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const proxyUrl = "https://proxy.cors.sh/"; 
            const notionApiUrl = "https://api.notion.com/v1/databases/1b759e69b1bf80a3853afd0b09ef93ad/query";

            const response = await fetch(proxyUrl + notionApiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_NOTION_API_KEY}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filter: {
                        property: "IG Based",
                        select: {
                            equals: "False",
                        },
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setEvents(data.results.map((event: any) => ({
                name: event.properties.Name?.title?.[0]?.plain_text || "No Name",
                description: event.properties.Description?.rich_text?.[0]?.plain_text || "No Description",
                // igBased: event.properties["IG Based"]?.select?.name || "Unknown",
                // ig: event.properties.IG?.select?.name || "Not Provided",
                poster: event.properties.Poster?.files?.[0]?.file?.url || "",
                link: event.properties.URL?.url || "#",
                date: event.properties.Date?.date?.start || "No Date",
            })));

        } catch (error) {
            console.error("Error fetching data from Notion:", error);
        }
    };

    fetchEvents();
}, []);


  

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
                {/* <motion.button
                  className={styles.button2}
                  onClick={() => window.open("https://app.formbricks.com/s/cm7ztbf2d0000l70365noohib", "_blank")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Report Issues
                </motion.button> */}
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
           {events.length !==0 &&(
          <motion.section className={styles.slider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className={styles.happeningTitle}>Happening Now</h2>
            <motion.div 
              className={styles.happeningCardsContainer}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <SidebarBannerSlider events={events} />
            </motion.div>
          </motion.section>)}
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
