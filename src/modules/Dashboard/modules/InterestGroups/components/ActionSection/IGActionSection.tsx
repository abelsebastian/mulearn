import React, { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import styles from './IGActionSection.module.css';

// Sample data object (this will come from an API later)
const interestGroupData = {
  id: "ig-1",
  title: "Video Editing",
  description: "This interest group is dedicated to advanced video editing techniques. We share tips, projects, and tutorials for mastering various editing tools.",
  tabs: {
    about: "Welcome to the Video Editing interest group. Here you’ll find discussions, resources, and community support to enhance your editing skills.",
    forum: "Forum content will be displayed here.",
    members: "Members list will be shown here.",
    events: "Upcoming events and meetups will be listed here.",
    learningPaths: [
      {
        id: "lp-1",
        title: "Advanced 2D Animation in After Effects",
        description: "Learn advanced 2D animation techniques using After Effects.",
        cta: "Start",
        redirect: "/learning-paths/after-effects"
      },
      {
        id: "lp-2",
        title: "Premiere Pro: Basic to Advanced",
        description: "A comprehensive course from beginner to pro in Premiere Pro.",
        cta: "Start",
        redirect: "/learning-paths/premiere-pro"
      },
      {
        id: "lp-3",
        title: "Color Grading using DaVinci Resolve",
        description: "Master the art of color grading with DaVinci Resolve.",
        cta: "Start",
        redirect: "/learning-paths/davinci"
      }
    ],
    thinkTank: [
      {
        id: "tt-1",
        name: "Alice Johnson",
        position: "Creative Director",
        image: "https://example.com/alice.jpg",
        linkedIn: "https://linkedin.com/in/alicejohnson"
      },
      {
        id: "tt-2",
        name: "Bob Smith",
        position: "Senior Editor",
        image: "https://example.com/bob.jpg",
        linkedIn: "https://linkedin.com/in/bobsmith"
      }
    ],
    mentors: [
      {
        id: "m-1",
        name: "Charlie Brown",
        position: "Video Production Expert",
        image: "https://example.com/charlie.jpg",
        linkedIn: "https://linkedin.com/in/charliebrown"
      }
    ]
  }
};

const IGActionSection = () => {
  const tabNames = [ "Learning Paths", "About", "Forum", "Members", "Events", "Think Tank", "Mentors"];
  const [activeTab, setActiveTab] = useState("About");

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return <div className={styles.tabContent}>{interestGroupData.tabs.about}</div>;
      case "Forum":
        return <div className={styles.tabContent}>{interestGroupData.tabs.forum}</div>;
      case "Members":
        return <div className={styles.tabContent}>{interestGroupData.tabs.members}</div>;
      case "Events":
        return <div className={styles.tabContent}>{interestGroupData.tabs.events}</div>;
      case "Learning Paths":
        return (
          <div className={styles.cardsContainer}>
            {interestGroupData.tabs.learningPaths.map((lp: any) => (
              <div key={lp.id} className={styles.learningPathCard}>
                <h3>{lp.title}</h3>
                <p>{lp.description}</p>
                <button
                  className={styles.startButton}
                  onClick={() => window.location.href = lp.redirect}
                >
                  {lp.cta}
                </button>
              </div>
            ))}
          </div>
        );
      case "Think Tank":
        return (
          <div className={styles.cardsContainer}>
            {interestGroupData.tabs.thinkTank.map((tt: any) => (
              <div key={tt.id} className={styles.commonCard}>
                <img src={tt.image} alt={tt.name} className={styles.profileImage} />
                <h4>{tt.name}</h4>
                <p>{tt.position}</p>
                <a href={tt.linkedIn} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className={styles.linkedinIcon} />
                </a>
              </div>
            ))}
          </div>
        );
      case "Mentors":
        return (
          <div className={styles.cardsContainer}>
            {interestGroupData.tabs.mentors.map((m: any) => (
              <div key={m.id} className={styles.commonCard}>
                <img src={m.image} alt={m.name} className={styles.profileImage} />
                <h4>{m.name}</h4>
                <p>{m.position}</p>
                <a href={m.linkedIn} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className={styles.linkedinIcon} />
                </a>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
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
    </div>
  );
};

export default IGActionSection;
