import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ 페이지 import
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import MainPage from "./components/pages/MainPage";
import CreateReviewPage from "./components/pages/CreateReviewPage";
import ReviewDetailPage from "./components/pages/ReviewDetailPage";

function App() {
  return (
    <Router>
      {/* ✅ 네비게이션 제거, 오직 페이지 라우팅만 */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/create" element={<CreateReviewPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
