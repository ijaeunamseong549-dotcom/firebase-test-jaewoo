import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";

function MainPage() {
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // 페이지당 표시할 리뷰 수
  const navigate = useNavigate();

  // ✅ Firestore에서 리뷰 불러오기
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        let reviewData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📦 전체 리뷰 데이터:", reviewData);
        console.log("📂 현재 선택된 카테고리:", category);

        // ✅ 카테고리 필터링
        if (category !== "전체") {
          reviewData = reviewData.filter(
            (r) => r.category && r.category.trim() === category
          );
        }

        setReviews(reviewData);
      } catch (error) {
        console.error("리뷰 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, [category, navigate]);

  // ✅ 로그아웃
  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // ✅ 페이지네이션 계산
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mainpage-container">
      {/* ✅ 상단 헤더 */}
      <header className="main-header">
        <h2 className="main-logo">Review Pie</h2>

        <div className="header-buttons">
          <button onClick={() => navigate("/create")} className="create-btn">
            ✍️ 리뷰작성
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 로그아웃
          </button>
        </div>
      </header>

      {/* ✅ 카테고리 필터 */}
      <div className="category-filter">
        {["전체", "여행", "음식"].map((type) => (
          <button
            key={type}
            className={`category-btn ${
              category === type ? "active" : ""
            }`}
            onClick={() => setCategory(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ✅ 메인 콘텐츠 */}
      <main className="main-content">
        {currentReviews.length > 0 ? (
          <div className="review-list">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="review-card"
                onClick={() => navigate(`/review/${review.id}`)}
              >
                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt="리뷰 이미지"
                    className="review-image"
                  />
                )}
                <div className="review-text">
                  <h3>{review.title}</h3>
                  <p className="review-category">
                    [{review.category || "미분류"}]
                  </p>
                  <p className="review-content">
                    {review.content.length > 100
                      ? review.content.substring(0, 100) + "..."
                      : review.content}
                  </p>
                  <div className="review-rating">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">해당 카테고리의 리뷰가 없습니다.</p>
        )}
      </main>

      {/* ✅ 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* ✅ 푸터 */}
      <footer className="main-footer">
        <p>
          © 2025 Review Pie — 실제 사용자들의 리뷰를 통해 더 똑똑한 결정을
          만들어가세요.
        </p>
      </footer>
    </div>
  );
}

export default MainPage;
