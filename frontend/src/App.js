import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStateProvider } from './useGlobalState';

const Main = React.lazy(() => import('./pages/Main'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignInEmail = React.lazy(() => import('./pages/SignInEmail'))
const SignInVerify = React.lazy(() => import('./pages/SignInVerify'))


const App = () =>
  <GlobalStateProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename="/">

        <Switch>

          <Route path="/" exact component={Main} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signin-email" exact component={SignInEmail} />
          <Route path="/signin-verify" exact component={SignInVerify} />
        </Switch>
      </Router>
    </Suspense >
  </GlobalStateProvider>


export default App;
