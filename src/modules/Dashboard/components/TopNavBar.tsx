import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./SideNavBar.module.css";
import { MdNotifications, MdNotificationAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { IoMdLogIn } from "react-icons/io";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent
} from "@chakra-ui/react";
import { Notification as NotificationProps, getNotifications } from "./api";
import NotificationTab from "./Notification";
import { SiDiscord } from "react-icons/si";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLogOut from "../assets/svg/MuLogOut";
import toast from "react-hot-toast";
import GameProgressBar from "../modules/ProgressBar/components/GameProgressBar";
import { getPublicUserLevels, getUserLevels } from "../modules/Profile/services/api";
import ModeSwitchModal from "../modules/Dashboard/Components/ModeSwitchModal";
import { selectDomainCategory } from "../modules/Dashboard/Api/ModeSwitchApi";

const TopNavBar = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [userSettings, setUserSettings] = useState(false);
    // const [notificationList, setNotificationList] = useState<NotificationProps[]>([]);
    const [userLevelData, setUserLevelData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [switchDomainModal, setSwitchDomainModal] = useState(false);

    const userInfo = useMemo(() => fetchLocalStorage("userInfo"), []);
    //@ts-ignore
    const name = userInfo?.full_name?.split(" ")[0] || "";
    //@ts-ignore
    const profilePic = userInfo?.profile_pic || null;

    useEffect(() => {
        const fetchLevelData = async () => {
            try {
                setIsLoading(true);
                if (id) {
                    await getPublicUserLevels(setUserLevelData, id);
                } else {
                    await getUserLevels(setUserLevelData);
                }
            } catch (err) {
                console.error("Error fetching level data:", err);
                setError("Failed to load level data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLevelData();
    }, [id]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const div = document.getElementById("user_settings");
        const profile = document.getElementById("profile");
        if (div && profile && !div.contains(event.target as Node) && !profile.contains(event.target as Node)) {
            setUserSettings(false);
        }
    }, []);

    useEffect(() => {
        if (userSettings) {
            window.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }
        return () => window.removeEventListener("click", handleClickOutside);
    }, [userSettings, handleClickOutside]);

    const refreshToken = localStorage.getItem("refreshToken");
    const handleOnSubmit = (data: string): void => {
        selectDomainCategory({ domains: [data] });
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          if (Array.isArray(userInfo.user_domains)) {
            userInfo.user_domains[0] = data;
          } else {
            userInfo.user_domains = [data];
          }
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        window.location.reload();
      };
      
      
 
    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}><i>Hello</i>, <b>{name}</b> 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>
                            <div className={styles.modeContainer}>
                                <span>
                                    Mode:
                                </span>
                                <span className={styles.userDomain} onClick={() => setSwitchDomainModal(true)}>{userInfo.user_domains?.[0]?.toUpperCase() || ''}</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => navigate("/dashboard/leaderboard")}>
                                <GameProgressBar levelData={userLevelData} />
                            </div>
                            {/* <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <Button
                                    onClick={() => getNotifications(setNotificationList)}
                                    backgroundColor="#ffffff00"
                                    _hover={{ backgroundColor: "#ffffff00" }}
                                    _active={{ backgroundColor: "#eee" }}
                                    aspectRatio="1/1"
                                    borderRadius="15px"
                                    fontSize="30px"
                                    width="50px"
                                    padding="10px"
                                >
                                    {notificationList.length === 0 ? <MdNotifications size={50} /> : <MdNotificationAdd />}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent background="transparent" border="none">
                                <NotificationTab notificationList={notificationList} setNotificationList={setNotificationList} />
                            </PopoverContent>
                        </Popover> */}
                            {refreshToken && (
                                <div id="profile" className={styles.profile}>
                                    <img onClick={() => setUserSettings(!userSettings)} src={profilePic || dpm} alt="" />
                                </div>
                            )}
                            {userSettings && (
                                <div id="user_settings" className={styles.user_settings}>
                                    <MuButtonLight
                                        text="Log Out"
                                        icon={<MuLogOut />}
                                        style={{ backgroundColor: "#fff", color: "#FF7676", marginBottom: "0px", minWidth: "0px", padding: "0px" }}
                                        onClick={() => {
                                            localStorage.clear();
                                            toast.error("Logged Out, Redirecting to login page.");
                                            setTimeout(() => window.location.reload(), 900);
                                        }}
                                    />
                                </div>
                            )}
                            {!refreshToken && (
                                <MuButtonLight
                                    text="LogIn"
                                    style={{ backgroundColor: "#2563EB", color: "white", minWidth: "0", width: "90px", marginRight: "2rem" }}
                                    onClick={() => navigate("/login")}
                                />
                            )}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            {
                switchDomainModal && (
                    <ModeSwitchModal isOpen={switchDomainModal} onClose={() => setSwitchDomainModal(false)} onSubmit={handleOnSubmit}/>
                )
            }
        </>
    );
};

export default TopNavBar;
