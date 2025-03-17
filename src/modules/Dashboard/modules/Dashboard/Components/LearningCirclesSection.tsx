import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LearningCirclesSection.module.css";
import { deleteScheduleMeetup, getMeetups } from "../../LearningCircleV2/services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../LearningCircleV2/services/LearningCircleInterface";
import EventDetailsModal from "../../LearningCircleV2/components/EventDetailsModal/EventDetailsModal";
import EmptyImage from "../assets/empty.webp";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog"
import { LearningCircleListItem } from "../../LearningCircleV2/pages/landing/components/learning-circle-list-item";
import { LearningCircleCard } from "../../LearningCircleV2/pages/landing/components/learning-circle-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateLearningCircleForm } from "../../LearningCircleV2/pages/landing/components/create-learning-circle-form";

const meetupCache: { [key: string]: CircleMeetupInfo[] } = {};

const useMeetups = (category: string, limit: number = 6) => {
  const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeetups = async () => {
      // Check cache first
      if (meetupCache[category]) {
        setMeetups(meetupCache[category].slice(0, limit));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getMeetups(category);
        meetupCache[category] = res; // Cache the full result
        setMeetups(res.slice(0, limit));
      } catch (error) {
        console.error("Failed to fetch meetups:", error);
        setMeetups([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetups();
  }, [category, limit]);

  return { meetups, isLoading };
};

const LearningCirclesSection: React.FC = () => {
  const { meetups, isLoading } = useMeetups("all");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [meetup, setMeetup] = useState<CircleMeetupInfo>();
  const [open, setOpen] = useState(false)
  const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo | undefined>(undefined);
  const handleCreateFormClose = () => {
    setMeetup(undefined)
    setShowCreateForm(false)
  }


  const handleCircleClick = useCallback((meetup: CircleMeetupInfo) => {
    setSelectedMeetup(meetup);
    setIsModalOpen(true);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);

  const handleEdit = (meetupId: string) => {
    setMeetup(meetups.find(m => m.id === meetupId))
    setOpen(false)
    setShowCreateForm(true);
  };

  const handleDelete = (meetupId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      console.log("Deleting event with ID:", meetupId);
      deleteScheduleMeetup({ meetId: meetupId })
    }
  };

  const handleClick = (id: string) => {
    setSelectedCircle(id)
    setOpen(true);
  }


  return (
    <>
      {/* <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetup={selectedMeetup}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCloseRefresh={() => setSelectedMeetup(undefined)}
      /> */}

      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Learning Circles</h3>
          <span className={styles.arrow} onClick={handleNavigate}>
            ›
          </span>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          // <div className={styles.list}>
          //   {meetups.length === 0 &&
          //     <div className={styles.noLc}>
          //       <img src={EmptyImage} alt="No Learning Circle Found!" className={styles.emptyImage} />
          //       <div className={styles.content}>
          //         <h2 className={styles.title}>No Learning Circle Found!</h2>
          //         <button className={styles.createButton} onClick={()=> {
          //           navigate("/dashboard/learningcircle")
          //         }}>Create Now</button>
          //       </div>
          //     </div>
          //   }
          //   {meetups.map((meetup) => (
          //     <div
          //       key={meetup.id}
          //       className={styles.circleItem}
          //       onClick={() => handleCircleClick(meetup)}
          //     >
          //       <div className={styles.circleInfo}>
          //         <div className={styles.circleTitle}>{meetup.title}</div>
          //         <div className={styles.circleDescription}>
          //           {meetup.meet_place || "No description available."}
          //         </div>
          //         <div className={styles.circleDetails}>
          //           <span className={styles.createdBy}>Created by: Admin</span>
          //           <span className={styles.happeningTime}>
          //             Happening:{" "}
          //             {meetup.meet_time
          //               ? new Date(meetup.meet_time).toLocaleString()
          //               : "TBD"}
          //           </span>
          //         </div>
          //         <div className={styles.tagsContainer}>
          //           {/* Add tags if CircleMeetupInfo includes them */}
          //           {/* Example: meetup.tags?.map(tag => <span key={tag}>{tag}</span>) */}
          //         </div>
          //       </div>
          //       <button className={styles.ctaButton}>View</button>
          //     </div>
          //   ))}
          // </div>
          <div className={styles.gridContainer}>
          {meetups.map((circle) => (
            <LearningCircleListItem key={circle.id} {...circle} attendees_count={circle.attendees?.length || 1} onClick={() => handleClick(circle.id)} />
          ))}
        </div>
        )}
        <LearningCircleCard
        {...meetups.find((circle) => circle.id === selectedCircle)!}
        onClose={() => setSelectedCircle(null)}
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogOverlay />
              <DialogContent className={styles.dialogContent}>
                <CreateLearningCircleForm onClose={handleCreateFormClose} meetUp={meetup} />
              </DialogContent>
            </Dialog>
      </div>
    </>
  );
};

export default memo(LearningCirclesSection);