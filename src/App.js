import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NoFound from './components/NoFound/NoFound';
import Transport from './components/Transport/Transport';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Confirmation from './components/Confirmation/Confirmation';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/transport/:id">
            <Transport />
          </PrivateRoute>
          <PrivateRoute path="/success">
            <Confirmation />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NoFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
