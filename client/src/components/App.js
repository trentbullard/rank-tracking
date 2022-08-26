import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Header } from './components/header/header';

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <h1>Hello World</h1>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
