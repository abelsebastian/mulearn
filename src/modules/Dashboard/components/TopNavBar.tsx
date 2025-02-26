import React, { useEffect, useState } from "react";
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

const TopNavBar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userSettings, setUserSettings] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [notificationList, setNotificationList] = useState<
        NotificationProps[]
    >([]);

    const { id } = useParams<{ id: string }>();
      const [userLevelData, setUserLevelData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState("");
    
      useEffect(() => {
        const fetchLevelData = async () => {
          try {
            setIsLoading(true);
            if (id) {
              // Fetch public user levels if an id is provided
              await getPublicUserLevels(setUserLevelData, id);
            } else {
              // Fetch authenticated user's levels if no id
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

    const notificationStyle = {
        backgroundColor: "#ffffff00",
        _hover: {
            backgroundColor: "#ffffff00"
        },
        _active: {
            backgroundColor: "#eee"
        },
        aspectRatio: "1/1",
        borderRadius: "15px",
        fontSize: "30px",
        width: "50px",
        padding: "10px"
    };
    useEffect(() => {
        const userInfo = fetchLocalStorage<UserInfo>("userInfo");

        if (userInfo) {
            setName(userInfo?.full_name.split(" ")[0]);
            setProfilePic(userInfo?.profile_pic || null);
        }
    }, []);

    useEffect(() => {
        const div = document.getElementById("user_settings");
        const profile = document.getElementById("profile");
        if (userSettings) {
            window.onclick = function (event) {
                const isUserSettingsClick =
                    event.target === div || div?.contains(event.target as Node);
                const isProfileClick =
                    event.target === profile ||
                    profile?.contains(event.target as Node);

                if (!isUserSettingsClick && !isProfileClick) {
                    setUserSettings(false);
                }
            };
        }
    }, [userSettings]);

    const refreshToken = localStorage.getItem("refreshToken");

    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}><i>Hello</i>, <b>{name}</b> 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>
                            {/* <a
                                href="http://discord.mulearn.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiDiscord size={30} />
                            </a> */}
                            {/* <i className="fi fi-sr-settings"></i> */}
                            <div className="cursor-pointer"
                                onClick={() => {
                                    navigate("/dashboard/leaderboard")
                                }}
                            >
                                <GameProgressBar levelData={userLevelData}/>
                               
                            
                            </div>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <Button
                                        onClick={() =>
                                            getNotifications(
                                                setNotificationList
                                            )
                                        }
                                        {...notificationStyle}
                                    >
                                        {notificationList.length === 0 ? (
                                            <MdNotifications size={50} />
                                        ) : (
                                            <MdNotificationAdd />
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    style={{
                                        background: "transparent",
                                        border: "none"
                                    }}
                                >
                                    <NotificationTab
                                        notificationList={notificationList}
                                        setNotificationList={
                                            setNotificationList
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                           

                            
                            {
                                refreshToken && (
                                    <div id="profile" className={styles.profile}>
                                        <img
                                            onClick={event => {
                                                event.stopPropagation(); // Stop the event from propagating
                                                setUserSettings(!userSettings);
                                            }}
                                            src={profilePic ? profilePic : dpm}
                                            alt=""
                                        />
                                    </div>
                                )

                            }

                            {userSettings && (
                                <div
                                    id="user_settings"
                                    className={styles.user_settings}
                                >
                                    <MuButtonLight
                                        text="Log Out"
                                        icon={<MuLogOut />}
                                        style={{
                                            backgroundColor: "#fff",
                                            color: "#FF7676",
                                            marginBottom: "0px",
                                            minWidth: "0px",
                                            padding: "0px"
                                        }}
                                        onClick={() => {
                                            localStorage.clear();

                                            toast.error(
                                                "Logged Out, Redirecting to login page."
                                            );

                                            setTimeout(
                                                () => window.location.reload(),
                                                900
                                            );
                                        }}
                                    />
                                </div>
                            )}
                            {!refreshToken &&
                                <MuButtonLight
                                    text="LogIn"
                                    style={{
                                        backgroundColor: "#2563EB",
                                        color: "white",
                                        minWidth: "0",
                                        width: "90px",
                                        marginRight: "2rem"
                                    }}
                                    // iconstyle={{marginRight: '1.2rem'}}
                                    // icon={<IoMdLogIn style={{ fontSize: '1.4rem' }} />}
                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                />
                            }
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default TopNavBar;
