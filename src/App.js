import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
// import Footer from './Footer';
import Footer from './Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Profile from './components/Profile';
import MyFavoriteBooks from './myFavoriteBooks.js';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './login.js'
// import LoginButton from './src/components/LogoutButton.js';

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
          
            <Header />
            <Switch>
              <Route exact path="/">
                {
                  (this.props.auth0.isAuthenticated) ? <MyFavoriteBooks /> : <Login/>
                }
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
              </Route>

              <Route  path='/profile'>

                <Profile />

              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
