import React from 'react';
import './UserProfile.css'

const Statistics: React.FC<{ weight: number; height: number }> = ({ weight, height }) => {
  const calculateBMI = () => {
    // Calculate BMI based on weight and height (you can use a more complex formula if needed).
    // return (weight / Math.pow(height / 100, 2)).toFixed(2);
    const heightSquared = height * height;
    const bmi = (weight / heightSquared) * 703;
    return bmi.toFixed(2); // Round to 2 decimal places
  };

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <ul>
        <li>
          <strong>Weight:</strong> {weight} lbs
        </li>
        <li>
          <strong>Height:</strong> {height} in
        </li>
        <li>
          <strong>BMI:</strong> {calculateBMI()}
        </li>
        {/* Add more statistics here */}
      </ul>
    </div>
  );
};

export default Statistics;
