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

interface FetchedDataState {
  student: {
    monthly: boolean;
    overall: boolean;
  };
  campus: {
    monthly: boolean;
    overall: boolean;
  };
}

const MuLeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<"monthly" | "overall">("monthly");
  const [activeCategory, setActiveCategory] = useState<"student" | "campus">("student");
  
  const [fetchedData, setFetchedData] = useState<FetchedDataState>({
    student: {
      monthly: false,
      overall: false
    },
    campus: {
      monthly: false,
      overall: false
    }
  });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);

        if (activeCategory === "student") {
          const apiRoute = activeFilter === "monthly" 
            ? dashboardRoutes.getMonthlyStudentLeaderBoard 
            : dashboardRoutes.getStudentLeaderBoard;
          
          const response = await publicGateway.get(apiRoute);
          
          if (response?.data?.response) {
            const mappedData = response.data.response.map((student: { 
              full_name: string; 
              total_karma: number 
            }) => ({
              name: student.full_name,
              [activeFilter]: student.total_karma,
              category: "student",
            }));

            if (activeFilter === "monthly") {
              setStudentMonthlyLeaderBoard(mappedData);
            } else {
              setStudentYearlyLeaderBoard(mappedData);
            }

            setFetchedData(prev => ({
              ...prev,
              student: {
                ...prev.student,
                [activeFilter]: true
              }
            }));
          }
        } else if (activeCategory === "campus") {
          const apiRoute = activeFilter === "monthly"
            ? dashboardRoutes.getCollegeMonthlyLeaderBoard
            : dashboardRoutes.getCollegeLeaderBoard;
          
          const response = await publicGateway.get(apiRoute);
          
          if (response?.data?.response) {
            const mappedData = response.data.response.map((campus: { 
              title?: string; 
              code?: string; 
              total_karma: number 
            }) => ({
              name: activeFilter === "monthly" ? campus.code : campus.title,
              [activeFilter]: campus.total_karma,
              category: "campus",
            }));

            if (activeFilter === "monthly") {
              setCampusMonthlyLeaderBoard(mappedData);
            } else {
              setCampusLeaderBoard(mappedData);
            }

            setFetchedData(prev => ({
              ...prev,
              campus: {
                ...prev.campus,
                [activeFilter]: true
              }
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }

    const shouldFetchData = !fetchedData[activeCategory][activeFilter];

    if (shouldFetchData) {
      fetchLeaderboardData();
    }
  }, [activeFilter, activeCategory, fetchedData]);


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
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
    </div>
  );
};

export default MuLeaderboardPage;