import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';


import Navigation from './components/Navigation';
import CreateUser from './components/CreateUser';
import UsersList from './components/UsersList';


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={UsersList} />
        <Route path="/edit/:id" exact component={CreateUser} />
        <Route path="/create" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
