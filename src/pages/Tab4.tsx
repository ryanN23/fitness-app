// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
// import './Tab4.css';

// const Tab4: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Tab 4</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large">Tab 4</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <ExploreContainer name="Tab 4 page" />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Tab4;



// import React from 'react';
// import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTab } from '@ionic/react';
// import { calendarOutline } from 'ionicons/icons'; // Import your tab icon

// // Other imports for your existing tabs...
// import WorkoutReminder from '../components/WorkoutReminder';

// const Tab4: React.FC = () => {
//   return (
//     <IonTabs>
//       {/* Your existing tabs */}
      
//       <IonTab tab="workout-reminder" component={WorkoutReminder}>
//         <IonTabButton tab="workout-reminder">
//           <IonIcon icon={calendarOutline} /> {/* Icon for the tab */}
//           <IonLabel>Workout Reminder</IonLabel>
//         </IonTabButton>
//       </IonTab>
      
//     </IonTabs>
//   );
// };

// export default Tab4;


import React from 'react';
import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import WorkoutReminder from '../components/WorkoutReminder';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout Reminder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Workout Reminder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTabButton tab="workout-reminder">
           <WorkoutReminder></WorkoutReminder>
         </IonTabButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
