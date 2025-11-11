import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/SignUpPage.css";

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입이 완료되었습니다 🎉");
      navigate("/main");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        <form onSubmit={handleSignUp} className="signup-form">
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 (6자리 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-btn">
            회원가입
          </button>
        </form>

        <div className="signup-footer">
          이미 계정이 있으신가요?
          <Link to="/login">로그인하기</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
