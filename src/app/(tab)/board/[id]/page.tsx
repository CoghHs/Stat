"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEye,
  FaClock,
  FaComments,
  FaDiscord,
  FaArrowLeft,
} from "react-icons/fa";

// 파티 게시글 타입 정의
interface PartyPost {
  id: string;
  title: string;
  author: string;
  uploadDate: string;
  views: number;
  content: string;
  discordLink?: string;
}

// 댓글 타입 정의
interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

// 임시 데이터 (나중에 API로 대체)
const DUMMY_POST: PartyPost = {
  id: "1",
  title: "로스트아크 아르고스 파티 구합니다",
  author: "게이머123",
  uploadDate: "1일 전",
  views: 42,
  content:
    "안녕하세요! 이번 주 토요일 저녁 8시에 아르고스 레이드 파티 구합니다.\n\n필요 아이템 레벨: 1370+\n원하는 직업군: 서포터 1명, 딜러 2명\n\n경험자 우대합니다. 편하게 댓글 남겨주세요!",
  discordLink: "https://discord.gg/gamers123",
};

const DUMMY_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "뿔딱이",
    content: "서폿 바드로 참여 가능합니다! 1415 레벨이에요.",
    createdAt: "1일 전",
  },
  {
    id: "2",
    author: "블레이드마스터",
    content: "1400 블레이드 딜러로 참여하고 싶습니다. 경험 많아요!",
    createdAt: "1일 전",
  },
  {
    id: "3",
    author: "데모닉킬러",
    content: "디스코드 초대 링크가 만료되었어요. 새로운 링크 부탁드립니다!",
    createdAt: "1일 전",
  },
];

export default function PartyBoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PartyPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setPost(DUMMY_POST);
      setComments(DUMMY_COMMENTS);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `${comments.length + 1}`,
      author: "로그인유저", // 실제로는 로그인된 사용자 정보
      content: newComment,
      createdAt: new Date().toLocaleString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h1>
        <button
          onClick={handleGoBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={handleGoBack}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h1 className="text-xl md:text-2xl font-bold mb-4">{post.title}</h1>

            <div className="flex md:flex-row md:flex-wrap gap-2 md:gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FaUser className="mr-1" /> {post.author}
              </div>
              <div className="flex border-l border-gray-300 pl-2 ">
                {post.uploadDate}
              </div>
              <div className="flex border-l border-gray-300 pl-2 ">
                조회수 {post.views}
              </div>
              <div className="flex border-l border-gray-300 pl-2 ">
                댓글 {comments.length}개
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 whitespace-pre-wrap leading-relaxed min-h-[200px]">
            {post.content}
          </div>

          {post.discordLink && (
            <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-2 md:mb-0">
                  <FaDiscord className="text-indigo-600 mr-2 text-xl" />
                  <span className="font-medium">디스코드 링크:</span>
                </div>
                <a
                  href={post.discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-0 md:ml-2 text-indigo-600 hover:underline break-all"
                >
                  {post.discordLink}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 md:mt-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            댓글 {comments.length}개
          </h2>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            {comments.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500 mt-1 md:mt-0">
                        {comment.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                첫 댓글을 작성해보세요!
              </div>
            )}
          </div>

          <form
            onSubmit={handleCommentSubmit}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  댓글 작성
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
