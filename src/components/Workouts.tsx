// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
//   params: {limit: '10'},
//   headers: {
//     'X-RapidAPI-Key': '000ac845b5msh405604732750cefp188266jsn5e8f262aa7c3',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutList: React.FC = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
      params: { limit: '10' },
      headers: {
        'X-RapidAPI-Key': '000ac845b5msh405604732750cefp188266jsn5e8f262aa7c3',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching workout data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Back Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>{workout.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
