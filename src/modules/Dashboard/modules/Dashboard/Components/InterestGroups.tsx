import React from "react";
import styles from "./InterestGroups.module.css";
import { FaChevronRight } from "react-icons/fa";

type InterestGroup = {
  title: string;
  image: string;
  link: string;
};

interface InterestGroupsProps {
  title: string; // e.g., "Creative", "Software", etc.
  groups: InterestGroup[];
}

const InterestGroups: React.FC<InterestGroupsProps> = ({ title, groups }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Interest groups in {title}</h3>
      <div className={styles.list}>
        {groups.map((group, index) => (
          <div key={index} className={styles.groupItem}>
            <img
              src={"/assets/IG/mobile_dev.jpg"}
              alt={group.title}
              className={styles.groupImage}
            />
            <span className={styles.groupTitle}>{group.title}</span>
            <a href={group.link} className={styles.arrowLink}>
              <FaChevronRight className={styles.arrowIcon} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestGroups;
