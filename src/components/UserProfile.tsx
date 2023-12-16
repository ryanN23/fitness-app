import React, { useState, useEffect } from 'react';
import { IonContent, IonButton } from '@ionic/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../components/firebase-config'; // Adjust the import path as needed
import './UserProfile.css';
import { signOut } from 'firebase/auth';

const UserProfile: React.FC = () => {
  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // States for user data
  const [userWeight, setUserWeight] = useState(0);
  const [userHeight, setUserHeight] = useState(0);

  // States for inputs
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(firestore, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserWeight(userData.weight);
          setUserHeight(userData.height);
          setNewWeight(userData.weight.toString());
          setNewHeight(userData.height.toString());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, []);



  const calculateBMI = () => {
    if (userWeight > 0 && userHeight > 0) {
      // return (weight / Math.pow(height / 100, 2)).toFixed(2);
      const heightSquared = userHeight * userHeight;
      const bmi = (userWeight / heightSquared) * 703;
      return bmi.toFixed(2); // Round to 2 decimal places
    }
    return '0'
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out using Firebase auth
      // Handle any post sign out logic here, such as redirecting to a login page
      console.log("User signed out successfully.");
      // For instance, redirect to the login page or reset the app state
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleEditStats = () => {
    setIsEditing(true);
  };

  const handleSaveStats = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        weight: parseFloat(newWeight),
        height: parseFloat(newHeight)
      });

      setUserWeight(parseFloat(newWeight));
      setUserHeight(parseFloat(newHeight));
      setIsEditing(false);
    }
  };

  return (
    <div className='profile'>
    <IonContent>
      <div className="user-profile">
        <p>User: {auth.currentUser?.email}</p>

        <div className="statistics">
          <h2>Statistics</h2>
          <ul>
            <li><strong>Weight:</strong> {userWeight} lbs</li>
            <li><strong>Height:</strong> {userHeight} in</li>
            <li><strong>BMI:</strong> {calculateBMI()}</li>
          </ul>
        </div>

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

        <IonButton expand="full" onClick={handleSignOut}>Sign Out</IonButton>
      </div>
    </IonContent>
    </div>
  );
};

export default UserProfile;
