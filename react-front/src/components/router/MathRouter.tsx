import React from 'react';

import {
  HashRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { HomePage, MathPage, SourcesPage } from '../../pages';

interface Props {}

interface State {}

export class MathRouter extends React.Component<Props, State> {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/pages/:urlTitle">
            <MathPage />
          </Route>
          <Route path="/sources">
            <SourcesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
