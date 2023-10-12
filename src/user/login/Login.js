import React, { Component } from "react";
import "./Login.css";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "../../constants";
import { Link } from "react-router-dom";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import Alert from "react-s-alert";

class Login extends Component {
  componentDidMount() {
    // this.props.location을 확인하고 state를 읽기 전에 state가 존재하는지 확인
    if (this.props.location && this.props.location.state) {
      const { error } = this.props.location.state;
      if (error) {
        setTimeout(() => {
          Alert.error(error, {
            timeout: 5000,
          });
          this.props.history.replace({
            pathname: this.props.location.pathname,
            state: {},
          });
        }, 100);
      }
    }

    if (this.props.authenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to Mood Canvas</h1>
          <SocialLogin />
        </div>
      </div>
    );
  }
}

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
        <a
          className="btn btn-block social-btn facebook"
          href={FACEBOOK_AUTH_URL}
        >
          <img src={fbLogo} alt="Facebook" /> Log in with Facebook
        </a>
        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt="Github" /> Log in with Github
        </a>
      </div>
    );
  }
}

export default Login;
