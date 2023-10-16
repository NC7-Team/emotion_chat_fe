import React, { useState } from "react";
import "./Recommand.css";

const Recommand = () => {
    const [recommendations, setRecommendations] = useState({
        movies: "",
        music: "",
    });

    // 감정기반 로직 여기에

    const handleMovieClick = () => {
        // 영화 추천 박스를 클릭했을 때의 동작
        // 다른 사이트로 이동하려면 window.location.href를 사용하여 URL을 설정합니다.
        window.location.href = "URL_영화_사이트"; // 이동하길 원하는 영화 사이트 URL로 변경
    };

    const handleMusicClick = () => {
        // 음악 추천 박스를 클릭했을 때의 동작
        // 다른 사이트로 이동하려면 window.location.href를 사용하여 URL을 설정합니다.
        window.location.href = "URL_음악_사이트"; // 이동하길 원하는 음악 사이트 URL로 변경
    };

    return (
        <div className="recommand-container">
            <div className="recommand-box" onClick={handleMovieClick}>
                <h2>영화 추천</h2>
                <p>{recommendations.movies}</p>
            </div>
            <div className="recommand-box" onClick={handleMusicClick}>
                <h2>음악 추천</h2>
                <p>{recommendations.music}</p>
            </div>
        </div>
    );
};

export default Recommand;
