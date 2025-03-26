"use client";
import { useEffect, useRef, useState } from "react";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import Leaderboard from "../components/Leaderboard";
import styles from "./leaderboard.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

interface LeaderboardEntry {
  name: string;
  monthly?: number;
  overall?: number;
  category?: string;
}

const MuLeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<"monthly" | "overall">("monthly");
  const [activeCategory, setActiveCategory] = useState<"student" | "campus">("student");

  // Cache for storing API results
  const cache = useRef<{ [key: string]: LeaderboardEntry[] }>({});

  const fetchLeaderboardData = async () => {
    setIsLoading(true);

    // Generate a unique cache key based on the active filter and category
    const cacheKey = `${activeCategory}-${activeFilter}`;

    // Check if the data is already cached
    if (cache.current[cacheKey]) {
      setLeaderboardData(cache.current[cacheKey]); // Use cached data
      setIsLoading(false);
      return;
    }

    try {
      let apiUrl = "";

      // Determine the API URL based on the active filter and category
      if (activeCategory === "student" && activeFilter === "monthly") {
        apiUrl = dashboardRoutes.getMonthlyStudentLeaderBoard;
      } else if (activeCategory === "student" && activeFilter === "overall") {
        apiUrl = dashboardRoutes.getStudentLeaderBoard;
      } else if (activeCategory === "campus" && activeFilter === "monthly") {
        apiUrl = dashboardRoutes.getCollegeMonthlyLeaderBoard;
      } else if (activeCategory === "campus" && activeFilter === "overall") {
        apiUrl = dashboardRoutes.getCollegeLeaderBoard;
      }

      // Fetch data from the determined API
      const response = await publicGateway.get(apiUrl);

      if (response?.data?.response) {
        const transformedData = response.data.response.map((item: any) => ({
          name: activeCategory === "student" ? item.full_name : item.title || item.code,
          [activeFilter]: item.total_karma,
          category: activeCategory,
        }));

        // Cache the result
        cache.current[cacheKey] = transformedData;

        setLeaderboardData(transformedData);
      } else {
        setLeaderboardData([]);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data whenever the active filter or category changes
  useEffect(() => {
    fetchLeaderboardData();
  }, [activeFilter, activeCategory]);

  return (
    <div className={styles.pageWrapper}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <MuLoader />
        </div>
      ) : (
        <Leaderboard
          leaderboards={{
            student: {
              overall: activeCategory === "student" && activeFilter === "overall" ? leaderboardData : [],
              monthly: activeCategory === "student" && activeFilter === "monthly" ? leaderboardData : [],
            },
            campus: {
              overall: activeCategory === "campus" && activeFilter === "overall" ? leaderboardData : [],
              monthly: activeCategory === "campus" && activeFilter === "monthly" ? leaderboardData : [],
            },
          }}
          filterOptions={["monthly", "overall"]}
          categoryOptions={[
            { label: "Student", value: "student" },
            { label: "Campus", value: "campus" },
          ]}
          defaultFilter={activeFilter}
          defaultCategory={activeCategory}
          topPlayerCount={3}
          setActiveFilter={setActiveFilter}
          setActiveCategory={setActiveCategory}
        />
      )}
    </div>
  );
};

export default MuLeaderboardPage;