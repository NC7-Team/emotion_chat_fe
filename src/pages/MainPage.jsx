import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./MainPage.css";
import PhotoPage from "./PhotoPage";
import Footer from "../components/common/footer/footer.js";

import "./MoodCanvas.scss";
import "./EmotionChat.scss";

const cards = [
  {
    id: 1,
    title: (
      <div className="card card-1">
        <Typography variant="body2">Emotion Chat Room</Typography>
      </div>
    ),
  },
  {
    id: 2,
    title: (
      <div className="card card-2">
        <Typography variant="body2">Emotion Sparring Room</Typography>
      </div>
    ),
  },
];

const defaultTheme = createTheme();

export default function Album() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainRef = useRef(null);
  const navigate = useNavigate();

  const smokyTextsRef = useRef([]);

  const openModal = () => {
    setIsModalOpen(true);
    window.alert("지금의 감정을 찍어주세요 !");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (card) => {
    if (card.id === 1) {
      openModal();
    } else if (card.id === 2) {
      navigate("/perchat");
    }
  };

  // 애니메이션 트리거 함수
  const handleReturnAnimation = () => {
    smokyTextsRef.current.forEach((text, index) => {
      text.classList.add("return");
    });
  };

  useEffect(() => {
    smokyTextsRef.current = document.querySelectorAll(".smoky-animation");
    const lastText = smokyTextsRef.current[smokyTextsRef.current.length - 1];

    // 애니메이션이 끝나면 원래 위치로 돌아가도록 트리거
    const animationEndHandler = () => {
      handleReturnAnimation();
    };

    lastText.addEventListener("animationend", animationEndHandler);

    return () => {
      lastText.removeEventListener("animationend", animationEndHandler);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Container sx={{ py: 7 }} maxWidth="md">
          <span className="smoky-animation">M</span>
          <span className="smoky-animation">O</span>
          <span className="smoky-animation">O</span>
          <span className="smoky-animation">D</span>
          <span className="smoky-animation">C</span>
          <span className="smoky-animation">A</span>
          <span className="smoky-animation">N</span>
          <span className="smoky-animation">V</span>
          <span className="smoky-animation">A</span>
          <span className="smoky-animation">S</span>
        </Container>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >

          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {/* {text} */}
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ mt: 8 }}
            >
              {/* {subText} */}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 3 }} maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <div onClick={() => handleCardClick(card)}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s",
                      transform:
                        hoveredCard === card.id ? "scale(1.2)" : "scale(1)",
                      marginBottom: "50px",
                      zIndex: card.id,
                    }}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "56.25%",
                      }}
                      image={card.imageUrl}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <PhotoPage />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
