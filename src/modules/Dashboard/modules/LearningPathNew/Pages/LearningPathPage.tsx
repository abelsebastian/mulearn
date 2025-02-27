import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./LearningPathPage.module.css";
import levelsData from "../modules/LevelsData";
import levelsDataUIUX from "../modules/LevelsDataUIUX";
import CardCarousel from "../modules/CardCarousal";

// Uncomment and use this when API integration is ready
// import { fetchLevelData } from "../api/levelApi"; 

interface OffCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const OffCanvas: React.FC<OffCanvasProps> = ({ isOpen, onClose, data }) => {
  const offCanvasClass = isOpen
    ? `${styles.offCanvas} ${styles.offCanvasOpen}`
    : styles.offCanvas;

  if (!data) return null;

  const isSpecialLevel = data.interestGroups;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={offCanvasClass} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        {isSpecialLevel ? (
          <div className={styles.offCanvasSection}>
            <h2 className={styles.offCanvasSectionTitle}>Special Pathway</h2>
            <div className={styles.offCanvasSectionContent}>
              <p>Select an interest group to continue levels 4–7:</p>
              {data.interestGroups.map((ig: any) => (
                <div
                  key={ig.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <strong>{ig.name}</strong> — {ig.description}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Title & Description */}
            <div className={styles.offCanvasSection}>
              <h2 className={styles.offCanvasSectionTitle}>{data.title}</h2>
              <div className={styles.offCanvasSectionContent}>
                <p>{data.brief}</p>
              </div>
            </div>

            {/* Interest Group & Skills */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Interest Group</h3>
              <div className={styles.offCanvasSectionContent}>
                <p>{data.ig}</p>
                <strong>Skills:</strong>{" "}
                {data.skills?.map((skill: string) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Published Info */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Published Info</h3>
              <div className={styles.offCanvasSectionContent}>
                <p>
                  <strong>By:</strong> {data.publishedBy}
                </p>
                <p>
                  <strong>When:</strong> {data.publishedWhen}
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Prerequisites</h3>
              <div className={styles.offCanvasSectionContent}>
                <ul>
                  {data.prerequisites?.map((preq: string, i: number) => (
                    <li key={i}>{preq}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources */}
            <div className={styles.offCanvasSection}>
              <h3 className={styles.offCanvasSectionTitle}>Resources</h3>
              <div className={styles.offCanvasSectionContent}>
                <ul>
                  {data.resources?.map((link: string, i: number) => (
                    <li key={i}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.offCanvasSection}>
              <button className={styles.proofOfWorkButton}><a href={"/"}> Submit proof work</a></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  card: any;
  onClickCTA: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ card, onClickCTA }) => {
  const skillColors = [
    "#FFB6C1",
    "#87CEFA",
    "#90EE90",
    "#F5DEB3",
    "#FFDAB9",
    "#DDA0DD",
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardIcon}>{card.icon}</div>
        <div className={styles.cardTitle}>{card.title}</div>
        <div className={styles.cardDesc}>{card.desc}</div>
        <div className={styles.cardIg}>
          <strong>IG:</strong> {card.ig}
        </div>
        <div className={styles.cardSkills}>
          <strong>Skills:</strong>{" "}
          {card.skills?.map((skill: string, index: number) => (
            <span
              key={skill}
              className={styles.skillPill}
              style={{
                backgroundColor: skillColors[index % skillColors.length],
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <button className={styles.viewButton} onClick={onClickCTA}>
        View
      </button>
    </div>
  );
};

interface InterestGroupCardProps {
  data: any;
  onClickCTA: () => void;
}

const InterestGroupCard: React.FC<InterestGroupCardProps> = ({ data, onClickCTA }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{data.icon}</div>
      <ul className={styles.igPreviewList}>
        <li key={data.id}>
          <strong>{data.name}</strong> — {data.description}
        </li>
      </ul>
      <button className={styles.viewButton} onClick={onClickCTA}>
        View
      </button>
    </div>
  );
};

const LearningPathPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dataSource = id ? levelsDataUIUX : levelsData;

  // (API call code can be placed here when ready, currently commented out)
  // useEffect(() => {
  //    if(id) {
  //       fetchDataForId(id).then(response => setData(response));
  //    }
  // }, [id]);

  const unlockedLevel = 2;
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleOpenOffCanvas = (data: any) => {
    setSelectedData(data);
    setOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setOffCanvasOpen(false);
    setSelectedData(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Learning Path</h1>

      {dataSource.map((level) => {
        // Determine if the level is locked (levels > unlockedLevel)
        const isLocked = level.level > unlockedLevel;
        return (
          <div key={level.level} className={styles.levelSection}>
            <h2>Level {level.level}</h2>
            <h4 className={styles.levelSubtitle}>{level.subtitle}</h4>
            {isLocked && (
              <div className={styles.unlockTaskSection}>
                <p className={styles.lockedText}>
                  Complete Level {level.level - 1} to unlock
                  {/* or{" "}
             <span className={styles.levellerTask}>Do a leveller task</span> to unlock Level {level.level - 1} */}
                </p>
                {level.leveller && <button onClick={() => handleOpenOffCanvas(level.leveller)}>Unlock now</button>}
              </div>
            )}

            <div
              className={`${styles.cardsContainer} ${isLocked ? styles.locked : ""
                }`}
            >
              {level.level === 4 && !id && level.interestGroups ? (
                level.interestGroups.map((card: any) => (
                  <div key={card.id} className={isLocked ? styles.lockedCard : ""}>
                    {isLocked && (
                      <div className={styles.lockedRibbon}>
                        Complete Level {level.level - 1} to unlock
                      </div>
                    )}
                    <InterestGroupCard
                      data={card}
                      onClickCTA={() => handleOpenOffCanvas(level)}
                    />
                  </div>
                ))
              ) : (
                level.cards &&
                level.cards.length > 0 && (
                  <CardCarousel>
                    {level.cards.map((card: any) => (
                      <div key={card.id} className={isLocked ? styles.lockedCard : ""}>
                        {isLocked && (
                          <div className={styles.lockedRibbon}>
                            Complete Level {level.level - 1} to unlock
                          </div>
                        )}
                        <TaskCard
                          card={card}
                          onClickCTA={() => handleOpenOffCanvas(card)}
                        />
                      </div>
                    ))}
                  </CardCarousel>
                )
              )}
            </div>
          </div>
        );
      })}

      <OffCanvas
        isOpen={offCanvasOpen}
        onClose={handleCloseOffCanvas}
        data={selectedData}
      />
    </div>
  );
};

export default LearningPathPage;
