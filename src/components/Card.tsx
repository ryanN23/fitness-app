import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const Card = () =>{
  return (
    <IonCard>
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea harum culpa, 
        voluptas provident nam porro dolorum asperiores expedita temporibus ut.</IonCardContent>
    </IonCard>
  );
}
export default Card;