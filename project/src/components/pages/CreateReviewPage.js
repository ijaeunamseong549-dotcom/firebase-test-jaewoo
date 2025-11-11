// src/components/pages/CreateReviewPage.js
import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateReviewPage.css";

function CreateReviewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("여행");
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        title,
        content,
        category,
        rating,
        imageUrl,
        createdAt: Timestamp.now(),
      });

      alert("리뷰가 성공적으로 등록되었습니다!");
      navigate("/main");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="create-review-container">
      <h1 className="logo">Review Pie</h1>
      <h2 className="page-title">리뷰 작성하기 ✍️</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <label>제목</label>
        <input
          type="text"
          placeholder="리뷰 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>내용</label>
        <textarea
          placeholder="리뷰 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>카테고리</label>
        <div className="category-options">
          <label>
            <input
              type="radio"
              value="여행"
              checked={category === "여행"}
              onChange={() => setCategory("여행")}
            />
            여행
          </label>
          <label>
            <input
              type="radio"
              value="음식"
              checked={category === "음식"}
              onChange={() => setCategory("음식")}
            />
            음식
          </label>
        </div>

        <label>이미지 URL</label>
        <input
          type="text"
          placeholder="이미지 링크를 입력하세요 (선택사항)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>별점</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "리뷰 등록하기"}
        </button>
      </form>
    </div>
  );
}

export default CreateReviewPage;
