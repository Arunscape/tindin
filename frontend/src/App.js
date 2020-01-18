import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = React.lazy(() => import('./pages/Main'))
const SignIn = React.lazy(() => import('./pages/SignIn'))

const App = () =>

  <Suspense fallback={<div>Loading...</div>}>
    <Router basename="/">

      <Switch>

        <Route path="/" exact component={Main} />
        <Route path="/signin" exact component={SignIn} />
      </Switch>
    </Router>
  </Suspense >


export default App;
