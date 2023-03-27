import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import EmptyPage from "./pages/EmptyPage";
import HomePage from "./pages/HomePage";
import ResetPage from "./pages/ResetPage";

const App = () => {
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          {isAuthenticate && <Route path="empty" element={<EmptyPage />} />}

          <Route path="*" element={<HomePage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
