import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useGlobalState from './useGlobalState';

import BottomBar from './components/BottomBar'



const Main = React.lazy(() => import('./pages/Main'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignInEmail = React.lazy(() => import('./pages/SignInEmail'))
const SignInVerify = React.lazy(() => import('./pages/SignInVerify'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const SignUpBio = React.lazy(() => import('./pages/SignUpBio'))
const SignUpPhotos = React.lazy(() => import('./pages/SignUpPhotos'))
const Chat = React.lazy(() => import('./pages/Chat'))
const Profile = React.lazy(() => import('./pages/Profile'))


const App = () => {

  const { user } = useGlobalState();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router basename="/">

          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signin-email" exact component={SignInEmail} />
            <Route path="/signin-verify" exact component={SignInVerify} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signup-bio" exact component={SignUpBio} />
            <Route path="/signup-photos" exact component={SignUpPhotos} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
          {user.tok && <BottomBar />}
        </Router>
      </Suspense >
    </>)
}


export default App;
