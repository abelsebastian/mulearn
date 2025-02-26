import React, { useEffect, useState } from "react";
import styles from "./LearningCirclesSection.module.css";
import { getMeetups } from "../../LearningCircleV2/services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../LearningCircleV2/services/LearningCircleInterface";
import EventDetailsModal from "../../LearningCircleV2/components/EventDetailsModal/EventDetailsModal";
import { useNavigate } from "react-router-dom";

const LearningCirclesSection: React.FC = () => {
  // Store fetched data as the original type
  const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo | undefined>(undefined);

  // Hard-coded category for fetching meetups
  const category = "all";
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    setIsLoading(true);
    getMeetups(category)
      .then((res: CircleMeetupInfo[]) => {
        setMeetups(res.slice(0, 6));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [category]);

  // Open the modal with the selected meetup's details
  const handleCircleClick = (meetup: CircleMeetupInfo) => {
    setSelectedMeetup(meetup);
    setIsModalOpen(true);
  };

  return (
    <>
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetup={selectedMeetup}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Learning Circles</h3>
          <span className={styles.arrow} onClick={() => navigate("/dashboard/learningcircle")}>›</span>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.list}>
            {meetups.map((meetup, index) => (
              <div
                key={index}
                className={styles.circleItem}
                onClick={() => handleCircleClick(meetup)}
              >
                <div className={styles.circleInfo}>
                  <div className={styles.circleTitle}>{meetup.title}</div>
                  <div className={styles.circleDescription}>
                    {meetup.meet_place || "No description available."}
                  </div>
                  <div className={styles.circleDetails}>
                    <span className={styles.createdBy}>Created by: Admin</span>
                    <span className={styles.happeningTime}>
                      Happening:{" "}
                      {meetup.meet_time
                        ? new Date(meetup.meet_time).toLocaleString()
                        : "TBD"}
                    </span>
                  </div>
                  <div className={styles.tagsContainer}>
                    {/* If your CircleMeetupInfo has tags or interests, map them here */}
                  </div>
                </div>
                <button className={styles.ctaButton}>Join</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LearningCirclesSection;
