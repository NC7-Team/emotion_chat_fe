import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/common/header/Header";

import Login from "./user/login/Login";

import NotFound from "./common/NotFound";
import LoadingIndicator from "./common/LoadingIndicator";

import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import PhotoPage from "./pages/PhotoPage";
import QuillPage from "./pages/QuillPage";
import LoginCheck from "./pages/LoginCheck";
import ChattingPage from "./pages/ChattingPage";

import { ACCESS_TOKEN } from "./constants";
import { getCurrentUser } from "./util/APIUtils";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Signup from "./user/signup/Signup";

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
            <Route path="/" element={<MainPage />} />

            <Route
              path="/login"
              element={
                this.state.authenticated ? (
                  <Navigate to="/mypage" replace />
                ) : (
                  <Login
                    authenticated={this.state.authenticated}
                    reloadPage={true}
                  />
                )
              }
            />
            <Route path="/chat" element={<ChattingPage />} />
            <Route path="/myPage2" element={<MyPage />} />
            <Route path="/logincheck" element={<LoginCheck />} />
            <Route path="/quill" element={<QuillPage />} />
            <Route path="/photo" element={<PhotoPage />} />
            <Route path="/oauth2"
                element={<OAuth2RedirectHandler />}
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
