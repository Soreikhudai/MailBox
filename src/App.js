import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ResetPage from "./pages/ResetPage";
import EmailPage from "./pages/EmailPage";
import FormPage from "./pages/FormPage";
import EmailSentPage from "./pages/EmailSentPage";
const App = () => {
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {isAuthenticate && <Route path="/reset" element={<ResetPage />} />}
          {isAuthenticate && <Route path="/form" element={<FormPage />} />}
          {isAuthenticate && <Route path="/inbox" element={<EmailPage />} />}
          {isAuthenticate && (
            <Route path="/inbox/item/*" element={<EmailPage />} />
          )}
          {isAuthenticate && <Route path="/sent" element={<EmailSentPage />} />}
          {isAuthenticate && (
            <Route path="/sent/item/*" element={<EmailSentPage />} />
          )}

          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
