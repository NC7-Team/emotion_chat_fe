import React, { Component } from "react";
import "./Login.css";
import {
    FACEBOOK_AUTH_URL,
    GOOGLE_AUTH_URL,
    KAKAO_AUTH_URL,
    NAVER_AUTH_URL /* 다른 상수들도 임포트하세요 */
} from "../../constants";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import kakaoLogo from "../../img/kakao-logo.png";
import naverLogo from "../../img/naver-logo.png";

class Login extends Component {
    // 생략...

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
                <a className="btn btn-block social-btn github" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google
                </a>

                <a className="btn btn-block social-btn github" href={KAKAO_AUTH_URL}>
                    <img src={kakaoLogo} alt="Kakao" /> Log in with Kakao
                </a>

                <a className="btn btn-block social-btn github" href={NAVER_AUTH_URL}>
                    <img src={naverLogo} alt="Naver" /> Log in with Naver
                </a>

                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook
                </a>
            </div>
        );
    }
}


export default Login;
