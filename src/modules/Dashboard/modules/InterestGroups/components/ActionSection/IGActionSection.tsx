import React, { useState } from 'react';
import styles from './IGActionSection.module.css';
import asideStyles from './AsideDetails.module.css';
import { InterestGroupData, CardData } from '../../data/interestGroups';
import Karma from '../../../Profile/assets/svg/Karma';
import AvgKarma from '../../../Profile/assets/svg/AvgKarma';
import Rank from '../../../Profile/assets/svg/Rank';
import UserCard from '/src/modules/Dashboard/components/UserCard';
import AsideDetails from '/src/modules/Dashboard/components/AsideDetails';

const IGActionSection = ({ data }: { data: InterestGroupData }) => {
  const tabNames = ["Learning Paths", "About", "Forum", "Members", "Events", "Think Tank", "Mentors"];
  const [activeTab, setActiveTab] = useState("About");
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CardData | null>(null);

  const handleSelect = (cardData: CardData) => {
    setSelectedUser(cardData);
    setIsAsideOpen(true);
  };

  const handleAsideClose = () => {
    setIsAsideOpen(false);
    setSelectedUser(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className={`${styles.tabContent} ${styles.about}`}>
            <p>{data.tabs.about.description}</p>
            <h3>Career Paths</h3>
            <div className="flex justify-center items-center gap-4">
              {data.tabs.about.careerPaths.map((path) => (
                <div key={path.title} className={styles.careerPath}>
                  <h4>{path.title}</h4>
                  <p>{path.description}</p>
                  <ul>
                    {path.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case "Forum":
        return <div className={styles.tabContent}>{data.tabs.forum.placeholder}</div>;
      case "Members":
        const topMembers = [...data.tabs.members]
          .sort((a, b) => parseInt(b.karma || "0") - parseInt(a.karma || "0"))
          .slice(0, 10);
        return (
          <div className={styles.cardsContainer}>
            {topMembers.length > 0 ? (
              topMembers.map((member) => (
                <UserCard key={member.id} data={member} onSelect={handleSelect} />
              ))
            ) : (
              <p>No members available.</p>
            )}
          </div>
        );
      case "Events":
        return (
          <div className={styles.cardsContainer}>
            {data.tabs.events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <img src={event.image} alt={event.title} className={styles.eventImage} />
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue} ({event.eventType})</p>
                <a href={event.link} target="_blank" rel="noopener noreferrer">Join Event</a>
              </div>
            ))}
          </div>
        );
      case "Learning Paths":
        return (
          <div className={styles.cardsContainer}>
            {data.tabs.learningPaths.map((lp) => (
              <div key={lp.id} className={styles.learningPathCard}>
                <h3>{lp.title}</h3>
                <p>{lp.description}</p>
                <button
                  className={styles.startButton}
                  onClick={() => window.location.href = lp.link}
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        );
      case "Think Tank":
        return (
          <div className={styles.cardsContainer}>
            {data.tabs.thinkTank.map((person) => (
              <UserCard key={person.id} data={person} onSelect={handleSelect} />
            ))}
          </div>
        );
      case "Mentors":
        return (
          <div className={styles.cardsContainer}>
            {data.tabs.mentors.map((person) => (
              <UserCard key={person.id} data={person} onSelect={handleSelect} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderAsideContent = (user: CardData) => {
    // Determine user type
    const isThinkTank = !user.muid && !user.karma && user.role && user.expertise;
    const isRegularUser = user.muid || user.karma;

    const getPrimaryOrganization = () => {
      if (user.role) return user.role.split(",")[0] || "N/A";
      if (user.organizations) {
        const college = user.organizations.find((org) => org.org_type === "College");
        return college ? college.title : "N/A";
      }
      return "N/A";
    };

    const getExpertiseTags = () => {
      if (user.expertise) return user.expertise;
      return [];
    };

    return (
      <div className={asideStyles.profileContainer}>
        <div className={asideStyles.profileHeader}>
          <div className={asideStyles.profileImageContainer}>
            <img
              src={user.profile_pic || user.image || "/placeholder.svg"}
              alt={user.name}
              className={asideStyles.profileImage}
            />
          </div>
          <div className={asideStyles.memberSince}>Member since 2023</div>
          <button className={asideStyles.connectBtn}>Connect</button>
        </div>

        <div className={asideStyles.profileInfo}>
          <h2 className={asideStyles.profileName}>{user.name}</h2>
          {isRegularUser && user.muid && <p className={asideStyles.profileUsername}>{user.muid}</p>}
          <p className={asideStyles.profileCollegeName}>{getPrimaryOrganization()}</p>
          {isRegularUser && <p className={asideStyles.profileLevel}>LEVEL 5</p>}
          {/* Expertise tags for think tank or mentor */}
          {(isThinkTank || (!isRegularUser && user.expertise)) && (
            <div className={asideStyles.expertiseTags}>
              {getExpertiseTags().length > 0 ? (
                getExpertiseTags().map((tag, index) => (
                  <span key={index} className={asideStyles.expertiseTag}>
                    {tag}
                  </span>
                ))
              ) : (
                <span className={asideStyles.noExpertiseTag}>No expertise listed</span>
              )}
            </div>
          )}
        </div>

        {/* Stats only for regular users */}
        {isRegularUser && (
          <div className={asideStyles.statsGrid}>
            <div className={asideStyles.statsCard}>
              <Karma />
              <p className={asideStyles.statsLabel}>Karma</p>
              <p className={asideStyles.statsValue}>{user.karma || "0"}</p>
            </div>
            <div className={asideStyles.statsCard}>
              <AvgKarma />
              <p className={asideStyles.statsLabel}>Avg.Karma/Month</p>
              <p className={asideStyles.statsValue}>1.156K</p>
            </div>
            <div className={asideStyles.statsCard}>
              <Rank />
              <p className={asideStyles.statsLabel}>Rank</p>
              <p className={asideStyles.statsValue}>1</p>
            </div>
            <div className={asideStyles.statsCard}>
              <Rank />
              <p className={asideStyles.statsLabel}>Percentile</p>
              <p className={asideStyles.statsValue}>0.29</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.tabs}>
        {tabNames.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tabContentContainer}>{renderTabContent()}</div>
      <AsideDetails isOpen={isAsideOpen} handleClose={handleAsideClose}>
        {selectedUser && renderAsideContent(selectedUser)}
      </AsideDetails>
    </div>
  );
};

export default IGActionSection;