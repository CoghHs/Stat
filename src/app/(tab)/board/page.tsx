"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaSearch, FaPlus, FaComment, FaEye } from "react-icons/fa";
import Image from "next/image";

// 파티 게시글 타입 정의
interface PartyPost {
  id: string;
  title: string;
  author: string;
  uploadDate: string;
  views: number;
  commentCount: number;
}

// 임시 데이터 (나중에 API로 대체)
const DUMMY_POSTS: PartyPost[] = [
  {
    id: "1",
    title: "로스트아크 아르고스 파티 구합니다",
    author: "게이머123",
    uploadDate: "2025-03-21",
    views: 42,
    commentCount: 5,
  },
  {
    id: "2",
    title: "메이플 보스레이드 같이 하실 분",
    author: "단풍나무",
    uploadDate: "2025-03-20",
    views: 128,
    commentCount: 12,
  },
  {
    id: "3",
    title: "배틀그라운드 스쿼드 모집합니다",
    author: "치킨먹자",
    uploadDate: "2025-03-19",
    views: 67,
    commentCount: 3,
  },
  {
    id: "4",
    title: "발로란트 5인큐 모집",
    author: "탑프레거",
    uploadDate: "2025-03-18",
    views: 95,
    commentCount: 8,
  },
  {
    id: "5",
    title: "디아블로4 던전 파티원 구함",
    author: "네팔렘",
    uploadDate: "2025-03-17",
    views: 51,
    commentCount: 4,
  },
];

export default function PartyBoardPage() {
  const [posts, setPosts] = useState<PartyPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 실제 구현에서는 API 호출
    setPosts(DUMMY_POSTS);
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePost = () => {
    router.push("/board/write");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-6 ">
          파티 모집 게시판
        </h1>
        {/* <Image
          width={1980}
          height={1024}
          src="/stat_background.png"
          className="w-full max-h-[180px] object-cover"
          alt="back"
        /> */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <button
            onClick={handleCreatePost}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full md:w-auto"
          >
            <FaPlus className="mr-2" /> 파티 모집하기
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* 헤더: 모바일에서는 숨김 */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 py-3 px-4">
            <div className="md:col-span-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </div>
            <div className="md:col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작성자
            </div>
            <div className="md:col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              날짜
            </div>
            <div className="md:col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              정보
            </div>
          </div>

          {/* 게시글 목록 */}
          <div className="divide-y divide-gray-200">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/board/${post.id}`)}
                >
                  {/* 모바일 레이아웃 */}
                  <div className="block md:hidden p-4">
                    <div className="font-medium text-gray-900">
                      {post.title}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <div className="text-gray-600">{post.author}</div>
                      <div className="text-gray-500">{post.uploadDate}</div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="flex items-center mr-4">
                        <FaEye className="mr-1" /> {post.views}
                      </span>
                      <span className="flex items-center text-indigo-500">
                        <FaComment className="mr-1" /> {post.commentCount}
                      </span>
                    </div>
                  </div>

                  {/* 데스크톱 레이아웃 */}
                  <div className="hidden md:grid md:grid-cols-12 items-center py-4 px-4">
                    <div className="md:col-span-6 font-medium text-gray-900 truncate pr-2">
                      {post.title}
                      {post.commentCount > 0 && (
                        <span className="ml-2 text-indigo-500">
                          [{post.commentCount}]
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-2 text-sm text-gray-600 truncate">
                      {post.author}
                    </div>
                    <div className="md:col-span-2 text-sm text-gray-500 truncate">
                      {post.uploadDate}
                    </div>
                    <div className="md:col-span-2 text-sm text-gray-500 flex items-center">
                      <FaEye className="mr-1" /> {post.views}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 px-4 text-center text-sm text-gray-500">
                게시글이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <nav className="inline-flex">
            <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              이전
            </button>
            <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-indigo-600">
              1
            </button>
            <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              다음
            </button>
          </nav>
        </div>
      </motion.div>
    </div>
  );
}
