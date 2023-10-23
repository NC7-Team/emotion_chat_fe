import React, { useState, useEffect } from "react";
import axios from "axios";
import "./recommend.css";

const Recommend = () => {
  const [recommendations, setRecommendations] = useState({
    movies: "",
    music: "",
    movieImage: "",
    musicImage: "",
  });

  const [movieLink, setMovieLink] = useState("");
  const [musicLink, setMusicLink] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/api/adrecommendations/recommend/1`)
      .then((response) => {
        const data = response.data;

        // 첫 번째 항목의 linkURI 값을 가져와 상태에 저장
        if (data.length > 0) {
          setMovieLink(data[0].linkURI);
          setRecommendations((prevState) => ({
            ...prevState,
            movies: data[0].content,
            movieImage: data[0].imageURI, // 이미지 링크 추가
          }));
        }

        if (data.length > 1) {
          setMusicLink(data[1].linkURI);
          setRecommendations((prevState) => ({
            ...prevState,
            music: data[1].content,
            musicImage: data[1].imageURI, // 이미지 링크 추가
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, []);

  const handleMovieClick = () => {
    // 상태에 저장된 영화 링크로 이동합니다.
    if (movieLink) {
      window.location.href = movieLink;
    }
  };

  const handleMusicClick = () => {
    // 상태에 저장된 음악 링크로 이동합니다.
    if (musicLink) {
      window.location.href = musicLink;
    }
  };

  return (
    <div className="recommend-container">
      <div className="recommend-box" onClick={handleMovieClick}>
        <div className="recommend-content">
          <img src={recommendations.movieImage} alt="Travel" /> {/* 이미지 링크 사용 */}
          <div>
            <h2>{recommendations.movies}</h2>
          </div>
        </div>
        <p>{recommendations.movies}</p>
      </div>
      <div className="recommend-box" onClick={handleMusicClick}>
        <div className="recommend-content">
          <img src={recommendations.musicImage} alt="Music" /> {/* 이미지 링크 사용 */}
          <div>
            <h2>{recommendations.music}</h2>
          </div>
        </div>
        <p>{recommendations.music}</p>
      </div>
    </div>
  );
};

export default Recommend;