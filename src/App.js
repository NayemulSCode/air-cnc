import './App.css';
import Home from './components/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AllRooms from './components/Home/AllRooms/AllRooms';
import AddRoom from './components/adminDashboard/AddRoom/AddRoom';
import RoomDetails from './components/Home/RoomDetails/RoomDetails';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUp from './components/Login/SignUp';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
        <Route path="/services">
            <AllRooms />
          </Route>
          <Route path="/addRoom">
            <AddRoom />
          </Route>
          <PrivateRoute path="/roomDetails/:id">
            <RoomDetails />
          </PrivateRoute>
          <Route  path="/signup">
             <SignUp />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
