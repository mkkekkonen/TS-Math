import React from 'react';

import {
  HashRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

interface Props {}

interface State {}

export class MathRouter extends React.Component<Props, State> {
  render() {
    const { children } = this.props;

    return (
      <HashRouter>
        <Switch>
          <Route path="/">
            
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
