import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../styles/ReviewDetailPage.css";

function ReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState("");
  const navigate = useNavigate();

  // 🔹 리뷰 불러오기
  useEffect(() => {
    const fetchReview = async () => {
      const docRef = doc(db, "reviews", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setReview(data);
        setNewTitle(data.title || "");
        setNewContent(data.content || "");
        setNewRating(data.rating || 0);
        setNewImageUrl(data.imageUrl || "");
      } else {
        console.error("해당 리뷰를 찾을 수 없습니다.");
      }
    };
    fetchReview();
  }, [id]);

  // 🔹 리뷰 수정 저장
  const handleUpdate = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    try {
      const docRef = doc(db, "reviews", id);
      await updateDoc(docRef, {
        title: newTitle,
        content: newContent,
        rating: newRating,
        imageUrl: newImageUrl,
      });
      alert("리뷰가 수정되었습니다 ✅");
      setIsEditing(false);
      setReview({
        ...review,
        title: newTitle,
        content: newContent,
        rating: newRating,
        imageUrl: newImageUrl,
      });
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  // 🔹 리뷰 삭제
  const handleDelete = async () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "reviews", id));
        alert("리뷰가 삭제되었습니다 🗑️");
        navigate("/main");
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (!review) return <p>로딩 중...</p>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate("/main")}>
        ← 뒤로가기
      </button>

      {isEditing ? (
        <div className="edit-section">
          {/* 제목 */}
          <input
            className="edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />

          {/* 별점 */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`star ${num <= newRating ? "selected" : ""}`}
                onClick={() => setNewRating(num)}
              >
                {num <= newRating ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          {/* 내용 */}
          <textarea
            className="edit-textarea"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />

          {/* 이미지 링크 수정 */}
          <input
            className="edit-input"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="이미지 링크 (https://...)"
          />

          {/* 이미지 미리보기 */}
          {newImageUrl && (
            <img
              src={newImageUrl}
              alt="수정된 이미지 미리보기"
              className="detail-image"
            />
          )}

          <div className="edit-buttons">
            <button className="btn-save" onClick={handleUpdate}>
              💾 저장
            </button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>{review.title}</h1>
          <p className="rating">⭐ {review.rating} / 5</p>
          <p className="content">{review.content}</p>

          {review.imageUrl && (
            <img
              src={review.imageUrl}
              alt="리뷰 이미지"
              className="detail-image"
            />
          )}

          <div className="action-buttons">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              ✏️ 수정
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              🗑️ 삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewDetailPage;
