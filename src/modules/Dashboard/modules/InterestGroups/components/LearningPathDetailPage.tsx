import React from 'react';

import styles from './LearningPathDetailPage.module.css';
import { TaskCard } from '../../LearningPathNew/Pages/LearningPathPage';
import { FormattedLevel } from '../../LearningPathNew/services/api';

interface LearningPathDetailPageProps {
  level: string;
  card: any; 
  onBack: () => void;
  formattedTasks: FormattedLevel[];
}

const LearningPathDetailPage: React.FC<LearningPathDetailPageProps> = ({
  level,
  card,
  onBack,
  formattedTasks,
}) => {
  const selectedLevelData = formattedTasks.find((task) => task.level === Number(level.replace('Level ', '')));
  console.log(card)

  const tasks = selectedLevelData?.cards || [];

  return (
    <div className={styles.detailContainer}>
      <button onClick={onBack} className={styles.backButton}>
        Back to Learning Paths
      </button>
      <h2>{level} - {card.title}</h2>
      <p>{card.data.description}</p>
      <div className={styles.tasksContainer}>
        <h3>Tasks</h3>
        {tasks.length > 0 ? (
          tasks.map((taskCard, index) => (
            <TaskCard
              key={index}
              card={taskCard}
              onClickCTA={() => console.log("hiiii")} 
            />
          ))
        ) : (
          <p>No tasks available for this level.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPathDetailPage;