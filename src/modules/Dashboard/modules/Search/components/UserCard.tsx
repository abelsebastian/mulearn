import React from "react";
import styles from "./UserCard.module.css";

interface User {
  full_name: string;
  muid: string;
  interest_groups: { id: string; name: string }[];
  organizations: { id: string; title: string; code: string; org_type: string }[];
  profile_pic: string | null;
  karma: string;
}

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  const getPrimaryCollege = () => {
    const college = user.organizations.find(org => org.org_type === "College");
    return college ? college.title : "N/A";
  };

  const formatKarma = (karma: string) => {
    const karmaNum = parseInt(karma, 10);
    return isNaN(karmaNum) ? "0" : karmaNum.toLocaleString();
  };

  return (
    <div className={styles.userCard} onClick={() => onSelect(user)}>
      <img
        src={user.profile_pic || "/placeholder.svg"}
        alt={user.full_name}
        className={styles.userImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
      <div className={styles.userDetails}>
        <div className={styles.userHeader}>
          <h2 className={styles.userName}>
            {user.full_name.trim() || "Unknown User"}{" "}
           
          </h2>
          <h3 className={styles.userMUID}>{user.muid}</h3>
          <h3 className={styles.userCollege}>{getPrimaryCollege() }</h3>
        </div>
        <div className={styles.interestGroups}>
          {user.interest_groups.length > 0 ? (
            user.interest_groups.map((interest) => (
              <span key={interest.id} className={styles.interestTag}>
                {interest.name}
              </span>
            ))
          ) : (
            <span className={styles.noInterestTag}>No interests groups</span>
          )}
        </div>
        {/* <p className={styles.karmaPoints}>Karma: {formatKarma(user.karma)}</p> */}
      </div>
    </div>
  );
};

export default UserCard;