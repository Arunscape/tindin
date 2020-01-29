import React, { Suspense } from 'react';
import { IonReactRouter as Router } from '@ionic/react-router';
import useGlobalState from './useGlobalState';
import '@ionic/react/css/core.css';
// /* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import BottomBar from './components/BottomBar'
import { IonRouterOutlet as Switch, IonApp } from '@ionic/react'


import { Route, PrivateRoute } from './Route';



const Main = React.lazy(() => import('./pages/Main'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignInEmail = React.lazy(() => import('./pages/SignInEmail'))
const SignInVerify = React.lazy(() => import('./pages/SignInVerify'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const SignUpBio = React.lazy(() => import('./pages/SignUpBio'))
const SignUpPhotos = React.lazy(() => import('./pages/SignUpPhotos'))
const Chat = React.lazy(() => import('./pages/Chat'))
const Profile = React.lazy(() => import('./pages/Profile'))
const ChatMessage = React.lazy(() => import('./pages/ChatMessage'));


const App: React.FC = () => {

  const { user } = useGlobalState();

  return (
    // <IonApp>
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename="/">
        {/* <Switch> */}
        <PrivateRoute path="/" exact component={Main} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signin-email" exact component={SignInEmail} />
        <Route path="/signin-verify" exact component={SignInVerify} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signup-bio" exact component={SignUpBio} />
        <Route path="/signup-photos" exact component={SignUpPhotos} />
        <PrivateRoute path="/chat" exact component={Chat} />
        <PrivateRoute path="/chat/:id" component={ChatMessage} />
        <PrivateRoute path="/profile" exact component={Profile} />
        {/* </Switch> */}
        {user.tok && <BottomBar />}
      </Router>
    </Suspense >
    // </IonApp>
  )
}


export default App;
