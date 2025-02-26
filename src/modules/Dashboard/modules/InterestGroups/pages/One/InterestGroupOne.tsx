import React from 'react';
import {
  Bell,
  MoreHorizontal,
  Image,
  Film,
  PieChart,
  Smile,
  MessageCircle
} from 'lucide-react';
import { FaCode } from 'react-icons/fa';
import { IoSchool } from 'react-icons/io5';
import { BsAndroid } from 'react-icons/bs';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { RiFlutterFill } from 'react-icons/ri';
import styles from './InterestGroupOne.module.css';
import SidebarBannerSlider from '../../components/SideBannerSlider/SideBannerSlider';
import CommunityForumPage from '../../components/CommunityForum/CommunityForumPage';
import IGActionSection from '../../components/ActionSection/IGActionSection';

const CommunityForum = () => {
  const memberAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80"
  ];

  const friends = [
    {
      name: "Lily Ackerman",
      username: "@JissoSoft",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
      verified: true
    },
    {
      name: "Mikasa Rasmi",
      username: "@JissoSoft",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
      verified: true
    },
    {
      name: "Anee Brown",
      username: "@JissoSoft",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
      verified: true
    },
    {
      name: "Historia wall",
      username: "@JissoSoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
      verified: true
    }
  ];

  const partners = [
    {
      name: "UI/UX Community...",
      icon: <FaCode className={styles.communityIcon} />,
      notifications: 4
    },
    {
      name: "Sambat coding",
      icon: <FaCode className={styles.communityIcon} />,
    },
    {
      name: "AndroidDev Indo",
      icon: <BsAndroid className={styles.communityIconAndroid} />,
    },
    {
      name: "Semarang computer...",
      icon: <HiOutlineDesktopComputer className={styles.communityIconDesktop} />,
    }
  ];

  const communities = [
    {
      name: "UI Designer Semarang",
      icon: <RiFlutterFill className={styles.communityIconRi} />,
      notifications: 4
    },
    {
      name: "Interaction design...",
      icon: <RiFlutterFill className={styles.communityIconRi} />,
    },
    {
      name: "UI/UX University",
      icon: <IoSchool className={styles.communityIconSchool} />,
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.forumCard}>
            {/* Header Banner */}
            <div className={styles.bannerWrapper}>
              <img
                src="https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="UI/UX Banner"
                className={styles.bannerImage}
              />
              <div className={styles.bannerOverlay}>
                <div className={styles.bannerLogo}>UIX</div>
                <div className={styles.bannerMemberInfo}>Member since July 2022</div>
              </div>
              <button className={styles.bellButton}>
                <Bell className={styles.bellIcon} />
              </button>
            </div>

            {/* Community Info */}
            <div className={styles.communityInfo}>
              <h1 className={styles.forumTitle}>UI/UX Interest Group</h1>
              <div className={styles.forumSubInfo}>
                <span>Public Community</span>
                <span>•</span>
                <span>65.3k members</span>
              </div>
            </div>

            {/* Member Avatars */}
            <div className={styles.memberSection}>
              <div className={styles.avatarGroup}>
                <div className={styles.avatarStack}>
                  {memberAvatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Member ${index + 1}`}
                      className={styles.avatarImage}
                    />
                  ))}
                </div>
                <span className={styles.memberText}>
                  Jiso and 5 other friends are members
                </span>
              </div>
              <button className={styles.moreButton}>
                <MoreHorizontal className={styles.moreIcon} />
              </button>
            </div>
            <IGActionSection />
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          {/* My Community */}
          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Happening Now</h2>
            <div className={styles.sidebarBanner}>
              <SidebarBannerSlider />
            </div>
          </div>
          <div className={styles.officeHoursCard}>
            <h3>Office Hours Timings</h3>
            <div className={styles.officeHoursCardTiming}>
              <p>Every Thursday 8:30 - 9:30</p>
              <button
                className={styles.officeHoursButton}
                onClick={() => window.location.href = "https://discord.gg/yourchannel"}
              >
                Join
              </button>
            </div>
          </div>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Partner Companies</h2>
            <div className={styles.sidebarList}>
              {partners.map((community, index) => (
                <div key={index} className={styles.sidebarItem}>
                  <div className={styles.sidebarItemLeft}>
                    {community.icon}
                    <span className={styles.sidebarItemText}>{community.name}</span>
                  </div>
                  {community.notifications && (
                    <span className={styles.notificationBadge}>
                      {community.notifications}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Similar Community */}
          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Communities</h2>
            <div className={styles.sidebarList}>
              {communities.map((community, index) => (
                <div key={index} className={styles.sidebarItem}>
                  <div className={styles.sidebarItemLeft}>
                    {community.icon}
                    <span className={styles.sidebarItemText}>{community.name}</span>
                  </div>
                  {community.notifications && (
                    <span className={styles.notificationBadge}>
                      {community.notifications}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
