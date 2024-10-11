import Link from "next/link";

export default function Page() {
    return (
        <div className="p-4 text-center text-lg text-gray-700">
            <p>お問い合わせありがとうございます。</p>
            <p className="text-2xl m-2">info@raichi-qzin.com</p>
            <p>から折り返しご連絡いたします。</p>
            <div className="mt-3 px-16">
                <Link href="/" className="mt-3">
                    <button type='submit'
                        className="text-white bg-blue-500 hover:bg-blue-400 font-semibold rounded-md text-sm px-10 py-3 flex items-center justify-center w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        TOPへ戻る
                    </button>
                </Link>
            </div>
        </div>
    )
}