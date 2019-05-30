import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { PlayGame, MainPage } from './Pages';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>        
          <Switch>
            <Route path={`/play/:mode`} component={PlayGame} />
            <Route path="/" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
