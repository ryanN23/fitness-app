// MuscleCards.tsx
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './MuscleCards.css'

type MuscleTargetsType = {
    [key: string]: string[];
  };
  
  const muscleTargets: MuscleTargetsType = {
    back: ['lats', 'upper back', 'traps', 'spine'],
    chest: ['pectorals', 'serratus anterior'],
    arms: ['forearms', 'triceps', 'biceps', ],
    shoulders: ['delts'],
    legs: ['calves', 'quads', 'glutes', 'hamstrings', 'abductors', 'adductors'],
    neck: ['levator scapulae'],
    waist: ['abs'],
    cardio: ['cardiovascular system'],
  };

const MuscleCards: React.FC = () => {
  const history = useHistory();
  const muscles = Object.keys(muscleTargets);

  const handleMuscleClick = (muscle: string) => {
    history.push(`/tab2/${muscle}`, { targets: muscleTargets[muscle] });
  };

  return (
    <div className='muscle-cards'>
      <h2>Select a Muscle Group</h2>
      {muscles.map(muscle => (
        <IonCard key={muscle} onClick={() => handleMuscleClick(muscle)}>
          <IonCardHeader>
            <IonCardTitle>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</IonCardTitle>
          </IonCardHeader>
          {/* <IonCardContent>Description for {muscle}</IonCardContent> */}
        </IonCard>
      ))}
    </div>
  );
};

export default MuscleCards;
