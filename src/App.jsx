import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/common/header/Header";

import Login from "./user/login/Login";

import LoadingIndicator from "./common/LoadingIndicator";

import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import PhotoPage from "./pages/PhotoPage";
import ChattingPage from "./pages/ChattingPage";
import PerChattingPage from "./pages/PerChattingPage";

import { ACCESS_TOKEN } from "./constants";
import { getCurrentUser } from "./util/APIUtils";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <Header
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
          />
        </div>
        <div className="app-body">
          <Routes>
            {/*기본로직*/}
            <Route path="/" element={<MainPage />} />
            <Route path="/oauth2" element={<OAuth2RedirectHandler />}/>
            {/*로그인이 필요한 로직*/}
            <Route path="/perchat" element={this.state.authenticated ? <PerChattingPage /> : <Login />} />
            <Route path="/login" element={this.state.authenticated ? (<Navigate to="/mypage" currentUser={this.state.currentUser} />) : (<Login />)} />
            <Route path="/mypage" element={this.state.authenticated ? <MyPage currentUser={this.state.currentUser} /> : <Login />} />
            <Route path="/photo" element={this.state.authenticated ? <PhotoPage /> : <Login />} />
            <Route path="/chat" element={this.state.authenticated ? <ChattingPage /> : <Login />} />
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