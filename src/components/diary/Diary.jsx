import React, { useState, useEffect } from "react";
import axios from "axios";
import "./diary.css";
import Button from "./Button";
import DiaryList from "./DiaryList";

const Diary = ({ selectedDate, diaryEntries, setDiaryEntries }) => {
    const [state, setState] = useState({ content: "" });
    const [entries, setEntries] = useState([]);
    const [todayEmotion, setTodayEmotion] = useState(null);

    const handleChangeContent = (e) => {
        setState({ ...state, content: e.target.value });
    };

    const handleOnGoBack = () => {
        // handleOnGoBack 함수 정의
    };

    const handleSubmit = () => {
        const newEntry = state.content;

        setEntries((prevEntries) => [...prevEntries, newEntry]);
        setState({ content: "" });

        axios
            .post("http://localhost:8080/api/Diary", {
                date: selectedDate,
                entry: newEntry,
            })
            .then(() => {
                // 저장 성공 시 추가 작업 (예: 알림)
            })
            .catch((error) => {
                console.error("Error saving diary entry:", error);
            });
    };


    useEffect(() => {
        axios
            .get("http://localhost:8080/api/chatlogs/emotions/1")
            .then((response) => {
                const formattedDate = selectedDate; // 선택된 날짜로 변경
                const todayEmotionData = response.data[formattedDate];

                if (todayEmotionData) {
                    setTodayEmotion(todayEmotionData);
                }
            })
            .catch((error) => {
                console.error("Error fetching emotions:", error);
            });

        // 선택된 날짜에 해당하는 일기를 불러옵니다.
        if (selectedDate) {
            axios
                .get(`http://localhost:8080/api/diary/${selectedDate}`)
                .then((response) => {
                    if (response.data && Array.isArray(response.data.entries)) {
                        setEntries(response.data.entries);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching diary entries:", error);
                });
        }
    }, [selectedDate]);

    const emotionIcons = {
        HAPPY: "😀",
        SAD: "😢",
    };

    return (
        <div className="diary-container">
            <div>
                <h4>오늘 내 감정</h4>
                {todayEmotion && <span>{emotionIcons[todayEmotion]}</span>}
            </div>
            <h4>{selectedDate} 한 줄 일기</h4> {/* 선택된 날짜를 표시 */}
            <DiaryList entries={entries} selectedDate={selectedDate} setDiaryEntries={setEntries} />
            <div className="input_wrapper">
        <textarea
            placeholder="오늘은 어땠나요?"
            value={state.content}
            onChange={handleChangeContent}
        />
            </div>

            <div className="editor_section bottom_section">
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Diary;