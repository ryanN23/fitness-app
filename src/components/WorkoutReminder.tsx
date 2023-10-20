import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

import { LocalNotifications } from '@capacitor/local-notifications';

const WorkoutReminder: React.FC = () => {
  const handleSetReminder = async () => {
    try {
      // Schedule a simple reminder notification
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Time to Work Out!',
            body: 'Don\'t forget to exercise today!',
            id: 1, // Notification ID
            schedule: { at: new Date(Date.now() + 10000) } // 10 seconds from now
          }
        ]
      });
      console.log('Workout reminder set successfully.');
    } catch (error) {
      console.error('Error setting workout reminder:', error);
    }
  };

  return (
    <div>
      <IonButton onClick={handleSetReminder}>Set Workout Reminder</IonButton>
    </div>
  );
};

export default WorkoutReminder;
