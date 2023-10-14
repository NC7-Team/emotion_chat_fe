import React, { useState, useRef, useEffect } from "react";
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

const cards = [
  {
    id: 1,
    title: (
      <Typography variant="body2">
        Emotion Chat Room 감정 기반 채팅방
      </Typography>
    ),
    description: (
      <Typography variant="caption">당신의 기분을 보여주세요!</Typography>
    ),
    imageUrl: "https://source.unsplash.com/random?wallpapers",
  },
  {
    id: 2,
    title: <Typography variant="body2">Emotion Sparring Room</Typography>,
    description: <Typography variant="caption">감정 스파링</Typography>,
    imageUrl: "https://source.unsplash.com/random?nature",
  },
];

const defaultTheme = createTheme();

export default function Album() {
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainRef = useRef(null);
  const typingSpeed = 50;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const moodCanvasText = "Mood Canvas";
    const moodCanvasSubText = "당신의 감정을 얼굴로 표현해보세요 !";
    let currentText = "";
    let currentSubText = "";
    let textIndex = 0;
    let subTextIndex = 0;

    const typeText = () => {
      if (textIndex < moodCanvasText.length) {
        currentText += moodCanvasText[textIndex];
        setText(currentText);
        textIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        typeSubText();
      }
    };

    const typeSubText = () => {
      if (subTextIndex < moodCanvasSubText.length) {
        currentSubText += moodCanvasSubText[subTextIndex];
        setSubText(currentSubText);
        subTextIndex++;
        setTimeout(typeSubText, typingSpeed);
      }
    };

    typeText();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <main ref={mainRef}>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
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
              {text}
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ mt: 8 }}
            >
              {subText}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <div onClick={openModal}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s",
                      transform:
                        hoveredCard === card.id ? "scale(1.2)" : "scale(1)",
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
