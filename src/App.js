import React from 'react';
import ChallengesList from './components/ChallengesList';
import Challenge from './components/Challenge';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css'

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { history, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
            <Switch>
              <Route exact path="/">
                <ChallengesList />
              </Route>
              <Route path="/:id" children={<Challenge/>} />
            </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
