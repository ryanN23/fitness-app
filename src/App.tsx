import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {alarmOutline, homeOutline, square, triangle, walk } from 'ionicons/icons';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Authentication from './components/Authentication'; // Import your Authentication component
import { auth } from './components/firebase-config';
import { User } from 'firebase/auth'; // Add this import


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonApp>
      {user ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route path="/tab4">
                <Tab4 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab2" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
             
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={alarmOutline} />
                <IonLabel>Reminder</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab4" href="/tab4">
                <IonIcon aria-hidden="true" icon={walk} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <Authentication />
      )}
    </IonApp>
  );
};
export default App;
