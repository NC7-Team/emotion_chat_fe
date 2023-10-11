import React, { Component } from 'react';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';

import Layout from '../Layout';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import MyPage from '../pages/MyPage';
import NotFound2 from '../pages/NotFound';
import MainPage from '../pages/MainPage';
import ChatPage from '../pages/ChatPage';


import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
        }).catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
        <div className="app">
          <div className="app-top-box">
            <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
          </div>
          <div className="app-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/login"
                  element={<Login authenticated={this.state.authenticated} />}
              />
              <Route
                  path="/signup"
                  element={<Signup authenticated={this.state.authenticated} />}
              />
              <Route element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Route>
              <Route
                  path="/oauth2/redirect"
                  element={<OAuth2RedirectHandler />}
              />
              <Route
                  path="/profile"
                  element={this.state.authenticated ? <Profile currentUser={this.state.currentUser} /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Alert
              stack={{ limit: 3 }}
              timeout={3000}
              position="top-right"
              effect="slide"
              offset={65}
          />
        </div>
    );
  }
}

export default App;
