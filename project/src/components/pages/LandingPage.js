import React from "react";
import { Link } from "react-router-dom";
import "../../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">Review Pie</h1>
        <div className="header-buttons">
          <Link to="/login" className="btn-outline">로그인</Link>
          <Link to="/signup" className="btn-fill">회원가입</Link>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-images">
          {/* 왼쪽 컬럼 (세로 정렬) */}
          <div className="left-images">
            <div className="img-box"><img src="/images/travel1.jpg" alt="여행1" /></div>
            <div className="img-box"><img src="/images/travel2.jpg" alt="여행2" /></div>
            <div className="img-box"><img src="/images/travel3.jpg" alt="여행3" /></div>
          </div>

          {/* 중앙 텍스트 (항상 수직 중앙 정렬) */}
          <div className="landing-text">
            <h2>사용자들의 목소리가<br/>더 강력한 선택을 만들어냅니다.</h2>
            <p>실제 사용자들의 리뷰를 통해 더 똑똑한 결정을 하세요.</p>
            <Link to="/signup" className="main-btn">회원가입</Link>
          </div>

          {/* 오른쪽 컬럼 (세로 정렬) */}
          <div className="right-images">
            <div className="img-box"><img src="/images/food1.jpg" alt="음식1" /></div>
            <div className="img-box"><img src="/images/food2.jpg" alt="음식2" /></div>
            <div className="img-box"><img src="/images/food3.jpg" alt="음식3" /></div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>
          회사명: 리뷰파이 주식회사 &nbsp; | &nbsp; 대표이사: 홍길동 &nbsp; | &nbsp;
          사업자등록번호: 123-45-67890 &nbsp; | &nbsp;
          주소: 서울특별시 강남구 테헤란로 123 &nbsp; | &nbsp;
          전화번호: 02-1234-5678 &nbsp; | &nbsp;
          이메일: contact@reviewfai.com
        </p>
        <p className="copyright">© 2025 Review Pie. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
