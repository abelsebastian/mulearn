import { useNavigate } from "react-router-dom";
import SidebarBannerSlider from "../../InterestGroups/components/SideBannerSlider/SideBannerSlider";
import InterestGroups from "../Components/InterestGroups";
import KarmaEarners from "../Components/KarmaEarners";
import LearningCirclesSection from "../Components/LearningCirclesSection";
import styles from "./DashboardPage.module.css";

const Dashboardpage = () => {

    const navigate = useNavigate()

    const creativeGroups = [
        {
            title: "Video Editing",
            image: "https://via.placeholder.com/50?text=Video", // Replace with an illustration URL
            link: "/interest-groups/video-editing",
        },
        {
            title: "UI/UX Design",
            image: "https://via.placeholder.com/50?text=UIUX", // Replace with an illustration URL
            link: "/interest-groups/ui-ux",
        },
        {
            title: "Comics & Illustration",
            image: "https://via.placeholder.com/50?text=Comics", // Replace with an illustration URL
            link: "/interest-groups/comics",
        },
        {
            title: "Creative Writing",
            image: "https://via.placeholder.com/50?text=Writing", // Replace with an illustration URL
            link: "/interest-groups/creative-writing",
        },
    ];

    const karmaData = {
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

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.welcomeSection}>
                    <div className={styles.welcomeText}>
                        <span className={styles.welcomeTitle}>
                            Welcome back <span>Ashwant</span> 👋
                        </span>
                        <p className={styles.welcomeMessage}>
                            You have grown 240% from past week, Keep it up and improve your progress
                        </p>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={() => navigate('/dashboard/learn')}>Start Learning</button>
                            <button className={styles.button2} onClick={() => navigate('/dashboard/learningcircle')}>Join Learning</button>
                        </div>
                    </div>
                    <img
                        src="/assets/landing/dashboard.png"
                        alt="Dashboard"
                        className={styles.dashboardImage}
                    />
                </div>
                <div className={styles.slider}>
                    <span className={styles.happeningTitle}>Happening Now</span>
                    <div className={styles.happeningCardsContainer}>
                        <SidebarBannerSlider />
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <LearningCirclesSection />
                <div className={styles.rightWrapper}>
                    <KarmaEarners
                        highestStudent={karmaData.highestStudent}
                        highestCollege={karmaData.highestCollege}
                        longestStreak={karmaData.longestStreak}
                    />
                    <InterestGroups title="Creative" groups={creativeGroups} />
                </div>
                {/* <CourseSection title="Upcoming" courses={upcomingCourses} isUpcoming /> */}
            </div>
        </div>
    );
};

export default Dashboardpage;
