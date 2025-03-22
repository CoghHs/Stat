// app/sign-in/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthSocialButton from "@/components/auth/AuthSocialButton";
import AuthLayout from "@/components/auth/AuthLayout";

// 유효성 검사 스키마 정의
const signInSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 폼 제출 처리
  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      // API 호출 등의 로직
      console.log("로그인 시도:", data);

      // 성공시 리다이렉션
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: "google" | "discord") => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 로직 구현
  };

  return (
    <AuthLayout title="로그인">
      {registered && (
        <div className="bg-green-50 p-4 mb-6 rounded-md">
          <p className="text-green-800 text-sm text-center">
            회원가입이 완료되었습니다. 로그인해주세요.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* 이메일 입력 */}
          <AuthInput
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일 주소를 입력하세요"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* 비밀번호 입력 */}
          <AuthInput
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* 추가 옵션 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                로그인 상태 유지
              </label>
            </div>
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <AuthButton type="submit" isLoading={isLoading}>
            로그인
          </AuthButton>
        </div>
      </form>

      {/* 소셜 로그인 */}
      <div className="mt-6">
        <AuthDivider text="또는" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <AuthSocialButton
            provider="google"
            onClick={() => handleSocialSignIn("google")}
          />
          <AuthSocialButton
            provider="discord"
            onClick={() => handleSocialSignIn("discord")}
          />
        </div>
      </div>

      {/* 회원가입 링크 */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            회원가입
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
