"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const partyPostSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 최소 5자 이상이어야 합니다")
    .max(100, "제목은 최대 100자까지 가능합니다"),
  content: z
    .string()
    .min(10, "내용은 최소 10자 이상이어야 합니다")
    .max(2000, "내용은 최대 2000자까지 가능합니다"),
  discordLink: z
    .string()
    .url("유효한 URL을 입력해주세요")
    .or(z.string().length(0))
    .optional(),
});

type PartyPostFormData = z.infer<typeof partyPostSchema>;

export default function CreatePartyPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartyPostFormData>({
    resolver: zodResolver(partyPostSchema),
    defaultValues: {
      title: "",
      content: "",
      discordLink: "",
    },
  });

  const onSubmit = async (data: PartyPostFormData) => {
    setIsSubmitting(true);

    try {
      // 실제 구현에서는 API 호출
      console.log("폼 데이터:", data);

      // 제출 성공 시 목록 페이지로 이동
      setTimeout(() => {
        router.push("/board");
      }, 1000);
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm("작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?")) {
      router.back();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 flex items-center mb-4 md:mb-0"
          >
            <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
            파티 모집 게시글 작성
          </h1>
          <div className="hidden md:block md:w-36"></div>{" "}
          {/* 균형을 맞추기 위한 빈 공간, 모바일에서는 숨김 */}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="p-4 md:p-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="게임명과 목적을 포함한 제목을 입력하세요"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px] md:min-h-[300px] ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="모집 조건, 시간, 필요한 정보를 자세히 작성해주세요"
                {...register("content")}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="discordLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                디스코드 링크 <span className="text-gray-400">(선택)</span>
              </label>
              <input
                id="discordLink"
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.discordLink ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="예: https://discord.gg/example"
                {...register("discordLink")}
              />
              {errors.discordLink && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.discordLink.message}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 md:p-6 bg-gray-50 border-t flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center"
              disabled={isSubmitting}
            >
              <FaTimes className="mr-2" /> 취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  저장 중...
                </>
              ) : (
                "게시글 등록"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
