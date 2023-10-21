import React, { useState } from "react";
import "./Recommend.css";

const Recommend = () => {
    const [recommendations, setRecommendations] = useState({
        movies: "",
        music: "",
    });

    // 감정기반 로직 여기에

    const handleMovieClick = () => {
        // 영화 추천 박스를 클릭했을 때의 동작
        // 다른 사이트로 이동하려면 window.location.href를 사용하여 URL을 설정합니다.
        window.location.href = "https://www.netflix.com/kr/title/70271432"; // 이동하길 원하는 영화 사이트 URL로 변경
    };

    const handleMusicClick = () => {
        // 음악 추천 박스를 클릭했을 때의 동작
        // 다른 사이트로 이동하려면 window.location.href를 사용하여 URL을 설정합니다.
        window.location.href = "https://www.melon.com/album/music.htm?albumId=10533976"; // 이동하길 원하는 음악 사이트 URL로 변경
    };

    return (
        <div className="recommend-container">
            <div className="recommend-box" onClick={handleMovieClick}>
                <div className="recommend-content">
                    <img src="https://i.namu.wiki/i/DAt7u-i9lRw2bM1EZwTWOWaGLuzRqiwzfTX09gucVhQm6HpTWGG1OlT-_YS6MEvh838553hUqKuTADwUsrGXsA.webp" alt="Movie" />
                    <div>
                        <h2>지금 기쁜 당신에게</h2>
                        <h2>추천하는 영화</h2>
                    </div>
                </div>
                <p>{recommendations.movies}</p>
            </div>
            <div className="recommend-box" onClick={handleMusicClick}>
                <div className="recommend-content">
                    <img src="https://image.bugsm.co.kr/album/images/500/40190/4019034.jpg" alt="Music" />
                    <div>
                        <h2>지금 기쁜 당신에게</h2>
                        <h2>추천하는 음악</h2>
                    </div>
                </div>
                <p>{recommendations.music}</p>
            </div>

        </div>
    );
};

export default Recommend;