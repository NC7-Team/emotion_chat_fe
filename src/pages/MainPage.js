import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./MainPage.css";
import Scrollbar from "smooth-scrollbar";

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
  const initialText = "Mood Canvas";
  const subInitialText = "당신의 감정을 얼굴로 표현해보세요 !";
  const [hoveredCard, setHoveredCard] = useState(null);
  const typingSpeed = 100;

  const typeText = (text, setText, initialText) => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < initialText.length) {
        setText((prevText) => prevText + initialText[i]);
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);
  };

  const typeSubText = (text, setText, subInitialText) => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < subInitialText.length) {
        setText((prevText) => prevText + subInitialText[i]);
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);
  };

  useEffect(() => {
    typeText(text, setText, initialText);

    // When "Mood Canvas" typing animation is finished
    setTimeout(() => {
      setText(""); // Clear the text for the new typing animation
      typeSubText(subText, setSubText, subInitialText);
    }, initialText.length * typingSpeed + 500); // Adding a delay of 500ms after "Mood Canvas" typing animation
  }, []);

  const mainRef = useRef(null);

  useEffect(() => {
    // main 요소에 스무스 스크롤을 적용합니다.
    if (mainRef.current) {
      Scrollbar.init(mainRef.current);
    }
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
              <span className="hoverable-text">
                <span className="typing-animation">{text}</span>
              </span>
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ mt: 8 }}
            >
              <span className="typing-animation">{subText}</span>
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
                <Link to="/photo">
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
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          MoodCanvas@2023
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
