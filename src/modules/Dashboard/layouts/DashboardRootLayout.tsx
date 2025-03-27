import styles from "../components/SideNavBar.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { Suspense, useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaMagnifyingGlass, FaMapLocationDot, FaHouse, FaRankingStar } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { roles, managementTypes } from "@/MuLearnServices/types";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { UserProfile, useUserStore } from "/src/ZustandProvider";

interface CrateType {
  navigate: (channelId: string) => void;
  toggle: (open?: boolean) => void;
}

declare global {
  interface Window {
    crate?: CrateType;
  }
}

const DashboardRootLayout = (props: { component?: any }) => {
  const navigate = useNavigate();
  const Management: ManagementTypes[] = Object.values(managementTypes).slice(2);
  const { setUserInfo, updateUserInfo, userProfile, setUserProfile, userInfo } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        setIsLoading(true)
        const profileResponse = await privateGateway.get(dashboardRoutes.getUserProfile);
        if (!profileResponse || !profileResponse.data) {
          throw new Error('Invalid user profile API response');
        }
        const fetchedUserProfile: UserProfile = profileResponse.data.response;
        if (!fetchedUserProfile || typeof fetchedUserProfile !== 'object') {
          throw new Error('Invalid userProfile data');
        }
        setUserProfile(fetchedUserProfile);
        const infoResponse = await privateGateway.get(dashboardRoutes.getInfo);
        if (!infoResponse || !infoResponse.data) {
          throw new Error('Invalid user info API response');
        }
        const userInfo: UserInfo = infoResponse.data.response;
        if (!userInfo || typeof userInfo !== 'object') {
          throw new Error('Invalid userInfo data');
        }
        const processedUserInfo = {
          ...userInfo,
          first_name: userInfo.full_name.split(" ")[0]
        };
        setUserInfo(processedUserInfo);
        localStorage.setItem("userInfo", JSON.stringify(processedUserInfo));
        if ('exist_in_guild' in userInfo) {
          setConnected(userInfo.exist_in_guild ?? false);
        }
        const hasDomains = Array.isArray(userInfo.user_domains) && userInfo.user_domains.length > 0;
        const hasEndgoals = Array.isArray(userInfo.user_endgoals) && userInfo.user_endgoals.length > 0;
        if (!hasDomains && !hasEndgoals) {
          navigate("/register/pathfinder?ruri=/dashboard/home");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        useUserStore.getState().resetUserInfo();
      } finally {
        setIsLoading(false);
      }
    };
    initializeUserData();
  }, [navigate]);


  const buttons = [
    {
      url: "/dashboard/home",
      title: "Home",
      hasView: true,
      icon: <FaHouse />
    },
    {
      url: "/dashboard/mujourney",
      title: "µJourney",
      hasView: true,
      icon: <FaMapLocationDot />
    },
    {
      url: "/dashboard/interestgroups",
      title: "Interest Groups",
      hasView: true,
      icon: <FaUserFriends />
    },
    {
      url: "/dashboard/learningcircle",
      title: "Learning Circle",
      hasView: true,
      icon: <i className="fi fi-sr-books"></i>
    },
    {
      url: "/dashboard/search",
      title: "Search",
      hasView: true,
      icon: <FaMagnifyingGlass />
    },
    {
      url: "/dashboard/leaderboard",
      title: "Leaderboard",
      hasView: true,
      icon: <FaRankingStar />
    },
    {
      url: "/dashboard/special-events",
      title: "Special Events",
      hasView: true,
      icon: <IoGlobeOutline />
    },
    {
      url: "/dashboard/courses",
      title: "Courses",
      hasView: true,
      icon: <i className="fi fi-sr-building"></i>
    },
    // {
    //     url: "/dashboard/muVerse",
    //     title: "μVerse",
    //     hasView: true,
    //     icon: <IoIosRocket />
    // },
    // {
    //     url: "/dashboard/profile",
    //     title: "Profile",
    //     hasView: true,
    //     icon: <i className="fi fi-sr-clipboard-user"></i>
    // },
    {
      url: "/dashboard/management",
      title: "Management",
      hasView: true,
      roles: [roles.ADMIN],
      icon: <i className="fi fi-sr-layout-fluid"></i>,
      dynamicType: Management
    },
    {
      url: "/dashboard/campus-details",
      title: "Campus Details",
      hasView: true,
      roles: [roles.CAMPUS_LEAD, roles.LEAD_ENABLER, roles.ADMIN],
      icon: <i className="fi fi-sr-book-arrow-right"></i>
    },
    {
      url: "/dashboard/url-shortener",
      title: "URL Shortner",
      hasView: true,
      roles: [roles.ADMIN, roles.ASSOCIATE],
      icon: <i className="fi fi-sr-link"></i>
    }
    // {
    //     url: "/dashboard/zonal-dashboard",
    //     title: "Zonal Dashboard",
    //     hasView: true,
    //     roles: [roles.ZONAL_CAMPUS_LEAD, roles.ADMIN],
    //     icon: <i className="fi fi-sr-marker"></i>
    // },
    // {
    //     url: "/dashboard/district-dashboard",
    //     title: "District Dashboard",
    //     hasView: true,
    //     roles: [roles.DISTRICT_CAMPUS_LEAD, roles.ADMIN],
    //     icon: <i className="fi fi-sr-map-marker"></i>
    // }
  ];

  if (isLoading) {
    return <div className={styles.loader}>
      <MuLoader />
    </div>
  }

  return (
    <div className={styles.full_page}>
      <SideNavBar sidebarButtons={buttons} />
      <div className={styles.right_side}>
        <TopNavBar setUserInfo={setUserInfo} />
        <div className={styles.main_content}>
          <Suspense fallback={<MuLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardRootLayout;