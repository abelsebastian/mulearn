import React from "react";
import styles from "./UserCard.module.css";

interface CardData {
  id?: number; // Optional for mentors
  name: string; // full_name for users, name for mentors
  muid?: string; // Specific to users
  role?: string; // Specific to mentors
  interest_groups?: { id: string; name: string }[]; // Users
  expertise?: string[]; // Mentors (optional alias for interest_groups)
  organizations?: { id: string; title: string; code: string; org_type: string }[]; // Users
  profile_pic?: string | null; // Users
  image?: string; // Mentors (optional alias for profile_pic)
  karma?: string; // Specific to users
}

interface UserCardProps {
  data: CardData;
  onSelect: (data: CardData) => void;
}

const UserCard: React.FC<UserCardProps> = ({ data, onSelect }) => {
  const getPrimaryOrganization = () => {
    if (data.role) return data.role.split(",")[0] || "N/A"; // Mentor role
    if (data.organizations) {
      const college = data.organizations.find((org) => org.org_type === "College");
      return college ? college.title : "N/A"; // User college
    }
    return "N/A";
  };

  const getInterests = () => {
    if (data.expertise) return data.expertise; // Mentor expertise
    if (data.interest_groups) return data.interest_groups.map((ig) => ig.name); // User interest_groups
    return [];
  };

  const formatKarma = (karma: string) => {
    const karmaNum = parseInt(karma, 10);
    return isNaN(karmaNum) ? "0" : karmaNum.toLocaleString();
  };

  const isMentor = !!data.role; // Presence of role indicates a mentor
  const noInterestsText = isMentor ? "No expertise listed" : "No interests groups";

  return (
    <div className={styles.userCard} onClick={() => onSelect(data)}>
      <img
        src={data.profile_pic || data.image || "/placeholder.svg"}
        alt={data.name}
        className={styles.userImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
      <div className={styles.userDetails}>
        <div className={styles.userHeader}>
          <h2 className={styles.userName}>{data.name.trim() || "Unknown"}</h2>
          {data.muid && <h3 className={styles.userMUID}>{data.muid}</h3>}
          <h3 className={styles.userRole}>{getPrimaryOrganization()}</h3>
          {data.karma && <p className={styles.userKarma}>Karma: {formatKarma(data.karma)}</p>}
        </div>
        <div className={styles.interestGroups}>
          {getInterests().length > 0 ? (
            getInterests().map((item, index) => (
              <span key={index} className={styles.interestTag}>
                {item}
              </span>
            ))
          ) : (
            <span className={styles.noInterestTag}>{noInterestsText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;