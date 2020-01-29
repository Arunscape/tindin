import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom'


import { useHistory } from 'react-router';


const BottomBar = () => {
    const history = useHistory();

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/schedule" />
                {/* 
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
        */}
                <Route path="/tabs/schedule" render={() => <div>schedule</div>} exact={true} />
                <Route path="/tabs/speakers" render={() => <div>speakers</div>} exact={true} />
                <Route path="/tabs/speakers/:id" component={() => <div>speakers/id</div>} exact={true} />
                <Route path="/tabs/schedule/:id" component={() => <div>schedule/id</div>} />
                <Route path="/tabs/speakers/sessions/:id" component={() => <div>sessions/id</div>} />
                <Route path="/tabs/map" render={() => <div>map</div>} exact={true} />
                <Route path="/tabs/about" render={() => <div>about</div>} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="schedule">
                    <IonIcon name="calendar" />
                    <IonLabel>Schedule</IonLabel>
                    <IonBadge>6</IonBadge>
                </IonTabButton>

                <IonTabButton tab="speakers">
                    <IonIcon name="contacts" />
                    <IonLabel>Speakers</IonLabel>
                </IonTabButton>

                <IonTabButton tab="map">
                    <IonIcon name="map" />
                    <IonLabel>Map</IonLabel>
                </IonTabButton>

                <IonTabButton tab="about">
                    <IonIcon name="information-circle" />
                    <IonLabel>About</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
}

export default BottomBar;