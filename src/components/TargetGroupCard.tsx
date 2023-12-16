// TargetGroupCard.tsx
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import './TargetGroupCard.css'

// Define the structure for the targets
type DefaultTargetsType = {
  [key: string]: string[];
};

// Define the default targets
const defaultTargets: DefaultTargetsType = {
  cardio: ['cardiovascular system'],
  back: ['lats', 'upper back', 'traps', 'spine'],
  chest: ['pectorals', 'serratus anterior'],
  arms: ['forearms', 'triceps', 'biceps'],
  shoulders: ['delts'],
  legs: ['calves', 'quads', 'glutes', 'hamstrings', 'abductors', 'adductors'],
  neck: ['levator scapulae'],
  waist: ['abs']
};

// Define the type for the descriptions
type TargetDescriptionsType = {
  [key: string]: { [target: string]: string };
};

// Define the descriptions for each target
const targetDescriptions: TargetDescriptionsType = {
  cardio: {
    'cardiovascular system': 'Targets the heart and blood vessels to improve endurance and cardiovascular health.'
  },
  back: {
    lats: 'Focuses on the latissimus dorsi muscles, key for pull movements and back strength.',
    'upper back': 'Targets the upper back muscles including the trapezius and rhomboids.',
    traps: 'Works on the trapezius muscles, crucial for neck, shoulder, and upper back strength.',
    spine: 'Exercises focusing on spinal strength and flexibility, essential for core stability.'
  },
  chest: {
    pectorals: 'Targets the chest muscles, important for pushing movements and upper body strength.',
    'serratus anterior': 'Engages the serratus anterior, essential for shoulder and arm movements.'
  },
  arms: {
    forearms: 'Strengthens the forearm muscles, improving grip strength and arm stability.',
    triceps: 'Targets the triceps for better arm extension and pushing capabilities.',
    biceps: 'Focuses on biceps muscles, crucial for arm curls and pulling movements.'
  },
  shoulders: {
    delts: 'Targets the deltoid muscles for overall shoulder strength and mobility.'
  },
  legs: {
    calves: 'Strengthens the calf muscles, important for lower leg strength and stability.',
    quads: 'Targets the quadriceps, key for leg extension and overall lower body strength.',
    glutes: 'Focuses on the gluteal muscles, essential for lower body power and posture.',
    hamstrings: 'Strengthens the hamstring muscles, crucial for leg flexion and stability.',
    abductors: 'Targets the outer thigh muscles, important for leg abduction and balance.',
    adductors: 'Engages the inner thigh muscles, crucial for leg adduction and stability.'
  },
  neck: {
    'levator scapulae': 'Focuses on the neck muscles, particularly the levator scapulae, for neck strength and mobility.'
  },
  waist: {
    abs: 'Targets abdominal muscles for core strength, stability, and a toned midsection.'
  }
};

const TargetGroupCard: React.FC = () => {
  const { muscle } = useParams<{ muscle: string }>();
  const history = useHistory();
  const location = useLocation<{ targets?: string[] }>();

  // Ensure a valid muscle is selected
  if (!muscle || !defaultTargets[muscle]) {
    return <div>Invalid muscle group specified.</div>;
  }

  const targets = location.state?.targets || defaultTargets[muscle];

  const handleTargetClick = (target: string) => {
    history.push({
      pathname: `/tab2/${muscle}/target/${target}`,
      state: { muscle }
    });
  };

  return (
    <div className='target-group-card'>
      <h2>Select a Target Group for {muscle.charAt(0).toUpperCase() + muscle.slice(1)}</h2>
      {targets.map(target => (
        <IonCard key={target} onClick={() => handleTargetClick(target)}>
          <IonCardHeader>
            <IonCardTitle>{target.charAt(0).toUpperCase() + target.slice(1)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{targetDescriptions[muscle][target]}</IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default TargetGroupCard;
