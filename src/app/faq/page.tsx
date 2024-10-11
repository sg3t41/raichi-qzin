"use client"
import Link from "next/link"
import { useToggle } from "react-use"

export default function FAQ() {
    const [showAccordion, changeShowAccordion] = useToggle(false)
    return (
        <div className="bg-pink-300 rounded-lg">
            <div className="p-4">
                <section className="bg-gray-200 p-6 rounded-lg">
                    <div className="p-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-[#333] text-center">よくあるご質問</h2>
                        </div>
                        <div className="mx-auto mt-8 space-y-4">
                            <div
                                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 rounded-lg">
                                <button
                                    type="button"
                                    id="question1"
                                    data-state="closed"
                                    className="flex items-center justify-between w-full px-4 py-5"
                                    onClick={changeShowAccordion}
                                >
                                    <span className="flex text-lg font-semibold text-black">お金はいつもらえますか？</span>
                                    <svg id="arrow1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        className={`w-6 h-6 text-gray-400 ${showAccordion ? 'transform rotate-180' : ''}`}>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-1000 ease-in-out relative 
                                        ${showAccordion ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`
                                    }
                                >
                                    <div id="answer1" className="px-4 pb-5">
                                        <p>基本的に全案件、<span className="font-bold">撮影日に全額現金手渡し</span>になります。</p>
                                        <p>詳しくは
                                            <Link
                                                href="/jobs"
                                                className="underline px-1 text-gray-500"
                                            >
                                                案件一覧
                                            </Link>
                                            の「詳細を見る」からご確認ください。</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-center text-gray-700 textbase mt-9 font-bold">その他ご質問・ご相談等お気軽にご連絡ください。</p>
                                <p className="text-center text-gray-500 textbase mt-2">
                                    メールでのお問い合わせは
                                    <Link
                                        href={"/contact"}
                                        className="underline m-1 "
                                    >
                                        こちらから
                                    </Link>
                                </p>
                                <p className="text-center text-gray-500 textbase mt-2">
                                    LINEでのお問い合わせは
                                    <Link
                                        href={"https://lin.ee/bLawYUk"}
                                        className="underline m-1"
                                    >
                                        こちらから
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    )
}