import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './WorkoutDetails.css'

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

const WorkoutDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      console.log('Fetching details for workout ID:', id); // Check the ID value
      try {
        const options = {
          method: 'GET',
          url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          headers: {
            'X-RapidAPI-Key': '000ac845b5msh405604732750cefp188266jsn5e8f262aa7c3',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        };

        const response = await axios.request<Exercise>(options);
        setWorkout(response.data);
      } catch (error) {
        console.error('Error fetching workout details:', error);
      }
    };

    if (id) {
      fetchWorkoutDetails();
    } else {
      console.log('No ID provided');
    }
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <div className='workout-details'>
      <h2>{workout.name}</h2>
      <img src={workout.gifUrl} alt={workout.name} />
      <p>Equipment: {workout.equipment}</p>
      <p>Target Muscle: {workout.target}</p>
      <p>Secondary Muscles: {workout.secondaryMuscles.join(', ')}</p>
      <h4>Instructions:</h4>
      <ul>
        {workout.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutDetails;
