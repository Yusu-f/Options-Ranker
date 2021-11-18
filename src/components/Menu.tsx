import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { archive, heart, mail, play, trash, warning } from 'ionicons/icons';

const Menu: React.FC = () => (
  <IonMenu side="start" menuId="first" disabled={false} type="overlay" contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
        <IonItem>
            <IonIcon icon={mail} slot="start"></IonIcon>
            <IonLabel>Inbox</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={play} slot="start"></IonIcon>
            <IonLabel>Play</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={heart} slot="start"></IonIcon>
            <IonLabel>Favorites</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={archive} slot="start"></IonIcon>
            <IonLabel>Archived</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={trash} slot="start"></IonIcon>
            <IonLabel>Trash</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={warning} slot="start"></IonIcon>
            <IonLabel>Spam</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
);

export default Menu