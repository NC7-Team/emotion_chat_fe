import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default App;
