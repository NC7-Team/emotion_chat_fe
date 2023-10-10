import { Link } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MainPage = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#A9E2F3', // 버튼 색상을 원하는 색상 코드로 변경
    },
  },
});

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
    imageUrl: 'https://source.unsplash.com/random?wallpapers',
  },
  {
    id: 2,
    title: <Typography variant="body2">Emotion Sparring Room</Typography>,
    description: <Typography variant="caption">감정 스파링</Typography>,
    imageUrl: 'https://source.unsplash.com/random?nature',
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
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
              Mood Canvas
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <br />
              오늘 당신의 기분은 어떤가요?
              <br />
              <br />
              당신의 감정을 얼굴로 표현해보세요!
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
          {/* End hero unit */}
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.imageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
      {/* End footer */}
    </ThemeProvider>
  );
}
