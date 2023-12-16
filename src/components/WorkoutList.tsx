import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './WorkoutList.css'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail
} from '@ionic/react';

interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

const WorkoutList: React.FC = () => {
  const { target } = useParams<{ target: string }>();
  const location = useLocation<{ muscle: string }>(); // Use location to get the passed state
  const [workouts, setWorkouts] = useState<Exercise[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
          params: {limit: '1000'},
          headers: {
            'X-RapidAPI-Key': '000ac845b5msh405604732750cefp188266jsn5e8f262aa7c3',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        };

        const response = await axios.request<Exercise[]>(options);
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchWorkouts();
  }, [target]);

  const muscleName = location.state?.muscle; // Get the main muscle group name

  const handleWorkoutClick = (id: string) => {
    // Navigate to the workout detail page or modal
    history.push(`/tab2/workout-detail/${id}`);
  };

  return (
    <div className='workout-list'>
    <IonCard>
        <IonCardHeader>
            <IonCardTitle>{target.charAt(0).toUpperCase() + target.slice(1)} Workouts</IonCardTitle>
            {muscleName && <IonCardSubtitle>{muscleName.charAt(0).toUpperCase() + muscleName.slice(1)}</IonCardSubtitle>}
        </IonCardHeader>
      <IonCardContent>
        <IonList>
          {workouts.map((workout) => (
            <IonItem key={workout.id} button onClick={() => handleWorkoutClick(workout.id)}>
              <IonThumbnail slot="start">
                <img src={workout.gifUrl} alt={workout.name} />
              </IonThumbnail>
              <IonLabel>
                <h2>{workout.name}</h2>
                <p>Equipment: {workout.equipment}</p>
                <p>Secondary Muscles: </p>
                <p>{workout.secondaryMuscles.join(', ')}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
    </div>
  );
};

export default WorkoutList;
