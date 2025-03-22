// app/sign-up/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthSocialButton from "@/components/auth/AuthSocialButton";
import AuthLayout from "@/components/auth/AuthLayout";

// 유효성 검사 스키마 정의
const signUpSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다"),
    nickname: z.string().min(2, "닉네임은 2글자 이상이어야 합니다"),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "영문, 숫자를 조합해주세요"
      ),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해주세요",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 폼 데이터 타입
type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  // 폼 제출 처리
  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      // API 호출 등의 로직
      console.log("회원가입 시도:", data);

      // 성공시 리다이렉션
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: "google" | "discord") => {
    console.log(`${provider} 회원가입 시도`);
    // 소셜 로그인 로직 구현
  };

  return (
    <AuthLayout title="회원가입">
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

          {/* 닉네임 입력 */}
          <AuthInput
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="게임에서 사용할 닉네임"
            error={errors.nickname?.message}
            {...register("nickname")}
          />

          {/* 비밀번호 입력 */}
          <AuthInput
            id="password"
            label="비밀번호"
            type="password"
            placeholder="8자 이상, 문자와 숫자 포함"
            hint="8자 이상, 영문, 숫자를 조합해서 입력해주세요"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* 비밀번호 확인 */}
          <AuthInput
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* 이용약관 동의 */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("agreeTerms")}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                이용약관, 개인정보 수집 및 이용에 동의합니다
              </label>
              <p className="text-gray-500">
                <Link href="/terms" className="text-indigo-600 hover:underline">
                  약관 보기
                </Link>
              </p>
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <AuthButton type="submit" isLoading={isLoading}>
            회원가입
          </AuthButton>
        </div>
      </form>

      {/* 소셜 회원가입 */}
      <div className="mt-6">
        <AuthDivider text="또는" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <AuthSocialButton
            provider="google"
            onClick={() => handleSocialSignUp("google")}
          />
          <AuthSocialButton
            provider="discord"
            onClick={() => handleSocialSignUp("discord")}
          />
        </div>
      </div>

      {/* 로그인 링크 */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            로그인
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
