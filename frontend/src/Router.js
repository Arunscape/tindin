import React, { Suspense } from 'react'
import { IonRouterOutlet as Switch, IonApp, IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'

import HeartIcon from './assets/altheart.svg';

import Auth from './Auth';

import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom'
import useGlobalState from './useGlobalState';

const Main = React.lazy(() => import('./pages/Main'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignInEmail = React.lazy(() => import('./pages/SignInEmail'))
const SignInVerify = React.lazy(() => import('./pages/SignInVerify'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const SignUpBio = React.lazy(() => import('./pages/SignUpBio'))
const SignUpPhotos = React.lazy(() => import('./pages/SignUpPhotos'))
const Chat = React.lazy(() => import('./pages/Chat'))
const Profile = React.lazy(() => import('./pages/Profile'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin"
                        }}
                    />
                )
        }
    />
);

const Router = () => {

    const { user } = useGlobalState();

    return (
        <IonApp>
            <IonReactRouter>
                <IonPage id="main">

                    <IonTabs>
                        <IonRouterOutlet>
                            <Suspense fallback={() => <div>Loading...</div>}>
                                <PrivateRoute path="/" exact component={Main} />
                                <Route path="/signin" exact component={SignIn} />
                                <Route path="/signin-email" exact component={SignInEmail} />
                                <Route path="/signin-verify" exact component={SignInVerify} />
                                <Route path="/signup" exact component={SignUp} />
                                <Route path="/signup-bio" exact component={SignUpBio} />
                                <Route path="/signup-photos" exact component={SignUpPhotos} />
                                <PrivateRoute path="/chat" exact component={Chat} />
                                <PrivateRoute path="/profile" exact component={Profile} />
                            </Suspense>
                        </IonRouterOutlet>

                        <IonTabBar slot="bottom">
                            <IonTabButton tab="chat" href="/chat">
                                <IonIcon name="ios-chatbubble-outline" />
                                <IonLabel>Chat</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="swipe" href="/swipe">
                                <IonIcon src={HeartIcon} />
                                <IonLabel>Swipe</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="profile" href="/profile">
                                <IonIcon name="person" />
                                <IonLabel>Profile</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonPage>
            </IonReactRouter>
        </IonApp>
    )
}

export default Router;