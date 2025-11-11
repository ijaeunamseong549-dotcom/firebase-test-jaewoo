import React from "react";
import { useNavigate } from "react-router-dom";

const MainTrip = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      category: "여행",
      title: "제주도 성산일출봉 후기",
      content: "일출이 정말 예뻤어요. 사진찍기 딱 좋은 장소!",
      img: "/images/trip1.jpg",
    },
    {
      id: 2,
      category: "여행",
      title: "부산 해운대 여행기",
      content: "밤바다가 정말 멋졌어요 🌊",
      img: "/images/trip2.jpg",
    },
    {
      id: 3,
      category: "여행",
      title: "강릉 안목해변 카페거리",
      content: "커피 한잔하며 바다 보니 여유롭네요 ☕",
      img: "/images/trip3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex justify-between items-center px-10 py-5 border-b bg-white shadow-sm">
        <h1
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ReviewPie
        </h1>
        <button
          onClick={() => navigate("/signin")}
          className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          로그아웃
        </button>
      </header>

      <nav className="flex justify-center gap-6 mt-6 mb-8">
        <button
          onClick={() => navigate("/main")}
          className="text-gray-500 hover:text-gray-900"
        >
          전체
        </button>
        <button className="font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
          여행
        </button>
        <button
          onClick={() => navigate("/main/food")}
          className="text-gray-500 hover:text-gray-900"
        >
          음식
        </button>
        <button
          onClick={() => navigate("/main/write")}
          className="ml-4 bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          리뷰 작성하기
        </button>
      </nav>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 pb-20">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={review.img}
              alt={review.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">#{review.category}</p>
              <h3 className="font-bold text-lg mb-2">{review.title}</h3>
              <p className="text-gray-600 text-sm">{review.content}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MainTrip;
