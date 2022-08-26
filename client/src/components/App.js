import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
