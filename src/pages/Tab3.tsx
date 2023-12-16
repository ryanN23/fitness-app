import React from 'react';
import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import WorkoutReminder from '../components/WorkoutReminder';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout Reminder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTabButton tab="workout-reminder">
           <WorkoutReminder></WorkoutReminder>
         </IonTabButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;