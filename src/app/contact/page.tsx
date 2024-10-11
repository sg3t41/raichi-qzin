"use client"
import { addContact } from "@/features/contact/libs/actions/addContact"
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom"
import { useToggle } from "react-use";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <div>
            {pending ? (
                <button
                    type='submit'
                    className="text-white bg-blue-400 hover:bg-blue-400 font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center w-full"
                    disabled
                >
                    <div role="status">
                        <svg aria-hidden="true" className="w-6 h-6 mr-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    送信する
                </button>
            ) : (
                <button type='submit'
                    className="text-white bg-blue-500 hover:bg-blue-400 font-semibold rounded-md text-sm px-4 py-3 flex items-center justify-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2" viewBox="0 0 548.244 548.244">
                        <path fill-rule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clip-rule="evenodd" data-original="#000000" />
                    </svg>
                    送信する
                </button>
            )}
        </div >
    )
}

export default function Contact() {
    const [state, dispatch] = useFormState(addContact, {})

    return (
        <div className="">
            <div className="bg-pink-300 rounded-lg">
                <div className="p-4">
                    <div className="bg-gray-200 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#333] text-center">お問い合わせ</h2>
                        <form
                            action={dispatch}
                            className="mt-8 space-y-4"
                            noValidate
                        >
                            <div>
                                {state?.errors?.username &&
                                    state.errors.username.map((error) => (
                                        <div
                                            key={error}
                                            className="text-red-600 text-sm font-bold"
                                            aria-live="polite"
                                        >
                                            {`※${error}`}
                                        </div>
                                    ))}
                                <input
                                    name="username"
                                    type='text'
                                    placeholder='お名前(ニックネームでも可)'
                                    className="w-full rounded-md py-3 px-4 text-sm outline-blue-500"
                                />
                            </div>

                            <div>
                                {state?.errors?.email &&
                                    state.errors.email.map((error) => (
                                        <div
                                            key={error}
                                            className="text-red-600 text-sm font-bold"
                                            aria-live="polite"
                                        >
                                            {`※${error}`}
                                        </div>
                                    ))}
                                <input
                                    name="email"
                                    type='email'
                                    placeholder='メールアドレス'
                                    className="w-full rounded-md py-3 px-4 text-sm outline-blue-500"
                                />
                            </div>

                            <div>
                                {state?.errors?.subject &&
                                    state.errors.subject.map((error) => (
                                        <div
                                            key={error}
                                            className="text-red-600 text-sm font-bold"
                                            aria-live="polite"
                                        >
                                            {`※${error}`}
                                        </div>
                                    ))}
                                <input
                                    name="subject"
                                    type='text'
                                    placeholder='件名'
                                    className="w-full rounded-md py-3 px-4 text-sm outline-blue-500"
                                />
                            </div>

                            <div>
                                {state?.errors?.message &&
                                    state.errors.message.map((error) => (
                                        <div
                                            key={error}
                                            className="text-red-600 text-sm font-bold"
                                            aria-live="polite"
                                        >
                                            {`※${error}`}
                                        </div>
                                    ))}
                                <textarea
                                    name="message"
                                    placeholder='お問い合わせ内容'
                                    rows={6}
                                    className="w-full rounded-md px-4 text-sm pt-3 outline-blue-500"
                                />
                            </div>

                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}