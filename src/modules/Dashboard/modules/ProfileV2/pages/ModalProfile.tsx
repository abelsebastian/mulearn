// ModalProfile.jsx
import React from "react";
import styles from "./ModalProfile.module.css";
import ProfileV2 from "./Profile";

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; 
}

const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose, userId }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <ProfileV2 id={userId} /> 
      </div>
    </div>
  );
};

export default ModalProfile;