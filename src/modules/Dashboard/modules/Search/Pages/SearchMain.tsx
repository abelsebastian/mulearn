import { useEffect, useState } from "react"
import styles from "./SearchMain.module.css"
import MuLearnersSearchPage from "./MulearnersSearchPage"
import MentorSearchPage from "../../Mentors/Pages/MentorPage"
import CampusSearchPage from "../../Campus/pages/CampusSearchPage"

const SearchMain = () => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Check if there's a history state on initial load
    const state = window.history.state;
    return state?.activeTab && ["mulearners", "mentors", "campuses"].includes(state.activeTab)
      ? state.activeTab
      : "mulearners";
  });

  const tabs = [
    { name: "µlearners", value: "mulearners" },
    { name: "Mentors", value: "mentors" },
    { name: "Campuses", value: "campuses" },
  ];

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    // Push new history state without changing URL
    window.history.pushState({ activeTab: tab }, "", "/dashboard/search");
  };

  // Listen for back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const tabFromState = event.state?.activeTab;
      if (tabFromState && tabFromState !== activeTab) {
        setActiveTab(tabFromState);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeTab]);

  return (
    <div className={styles.searchMain}>
      <div className={styles.tabs}>
        <ul className={styles.tabList}>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleTab(tab.value)}
              className={`${styles.tabItem} ${activeTab === tab.value ? styles.active : ""}`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "mulearners" && <MuLearnersSearchPage />}
        {activeTab === "mentors" && <MentorSearchPage />}
        {activeTab === "campuses" && <CampusSearchPage />}
      </div>
    </div>
  )
}

export default SearchMain

