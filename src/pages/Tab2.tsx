// Tab2.tsx
import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Route, useRouteMatch } from 'react-router-dom';
import TargetGroupCard from '../components/TargetGroupCard';
import WorkoutDetails from '../components/WorkoutDetails';
import MuscleCards from '../components/MuscleCards';
import WorkoutList from '../components/WorkoutList'; 
import './Tab2.css'

const Tab2: React.FC = () => {
  let { path } = useRouteMatch();

  return (
    <div className='tab2'>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab2" text="" />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Route exact path={path}>
          <MuscleCards />
        </Route>
        <Route path={`${path}/:muscle`} exact>
          <TargetGroupCard />
        </Route>
        <Route path={`${path}/:muscle/target/:target`}> {/* Route for WorkoutList */}
          <WorkoutList />
        </Route>
        <Route path={`${path}/workout-detail/:id`}> {/* Route for WorkoutDetails */}
          <WorkoutDetails />
        </Route>
      </IonContent>
    </IonPage>
    </div>
  );
};

export default Tab2;
