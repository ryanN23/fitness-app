import React, { useState } from 'react';
import Statistics from './Statistics';
import { IonContent, IonButton } from '@ionic/react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase-config';
import './UserProfile.css'

const UserProfile: React.FC<{ weight: number; height: number }> = ({ weight, height }) => {
 
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [newWeight, setNewWeight] = useState(weight.toString());
    const [newHeight, setNewHeight] = useState(height.toString());

    // Declare the state variables for weight and height
    const [userWeight, setUserWeight] = useState(weight);
    const [userHeight, setUserHeight] = useState(height);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // You can add any additional logic here, such as redirecting to the login page.
      window.location.reload(); // This will refresh the app and take the user back to the Authentication page.
    });
  };
  const handleEditStats = () => {
    setIsEditing(true);
  };
  const handleSaveStats = () => {
    // Update the statistics in your data source if available, otherwise update the state variables
    setUserWeight(parseFloat(newWeight));
    setUserHeight(parseFloat(newHeight));
    setIsEditing(false);
  };

  return (
    <IonContent>
    <div className="user-profile">
      <p>User: {user.email}</p>
      <Statistics weight={userWeight} height={userHeight} />

      {isEditing ? (
        <div>
          <label>Weight (lbs):</label>
          <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
          />
          <label>Height (in):</label>
          <input
            type="number"
            value={newHeight}
            onChange={(e) => setNewHeight(e.target.value)}
          />
          <IonButton expand="full" onClick={handleSaveStats}>Save Stats</IonButton>
        </div>
      ) : (
        <IonButton expand="full" onClick={handleEditStats}>Edit Stats</IonButton>
      )}
    </div>
    <IonButton expand="full" onClick={handleSignOut}>Sign Out</IonButton>
  </IonContent>
  );
};

export default UserProfile;
