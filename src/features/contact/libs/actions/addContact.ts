"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/libs/firebase/admin";

const UserSchema = z.object({
  /* 必須項目 */
  message: z
    .string({
      invalid_type_error: "内容に不正なデータが含まれています。",
    })
    .max(4000, { message: "内容が長すぎます。" })
    .refine((value) => value.trim() !== "", {
      message: "お問い合わせ内容を入力してください。",
      path: ["message"],
    }),
  email: z
    .string({
      invalid_type_error: "メールアドレスが不正です。",
    })
    .email({
      message: "正しいメールアドレスを入力してください。",
    })
    .refine((value) => value.trim() !== "", {
      message: "メールアドレスは必須です",
      path: ["email"],
    }),

  /* 任意項目 */
  username: z
    .string({
      invalid_type_error: "ユーザー名が不正です。",
    })
    .max(20, { message: "ユーザー名が長すぎます。" }),
  subject: z
    .string({
      invalid_type_error: "件名名が不正です。",
    })
    .max(100, { message: "件名が長すぎます。" }),
});

type State = {
  errors?: {
    username?: string[];
    message?: string[];
    email?: string[];
    subject?: string[];
  };
  isError?: boolean;
  addedData?: {
    username?: string;
    message?: string;
    email?: string;
    subject?: string;
  };
};

export const addContact = async (
  _state: State | undefined,
  formData: FormData | undefined
): Promise<State | undefined> => {
  console.log(formData);
  if (!formData) {
    console.log(formData);
    return;
  }

  const validatedFields = UserSchema.safeParse({
    username: formData.get("username"),
    message: formData.get("message"),
    subject: formData.get("subject"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      isError: true,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, message, email, subject } = validatedFields.data;

  try {
    // const ref = db.collection("contact");

    // await ref.add({
    //   username,
    //   message,
    //   createdAt: new Date(
    //     Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    //   ),
    // });
    console.log(username);
    console.log(email);
    console.log(subject);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
  redirect(`/contact/result`);
};
