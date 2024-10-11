import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <div className="w-full">
        <Image src="/top_image.gif" alt="Top Image" layout="responsive" width={960} height={540} />
        <Image src="/steps.png" alt="5 Steps" layout="responsive" width={960} height={540} />
      </div>

      <div className="pt-4 space-y-4 px-2">
        <div>
          <Link
            href="/jobs"
            className="pt-4 text-center">
            <button
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 border-b-4 border-blue-700 hover:border-0 rounded"
            >
              <div className="flex items-center justify-center">
                <p className="">案件を探す</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
              </div>
            </button>
          </Link>
        </div>

        <div className="">
          <Link
            href="/faq"
            className="pt-4 text-center">
            <button
              className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-4 px-4 border-b-4 border-pink-700 hover:border-0 rounded"
            >
              <div className="flex items-center justify-center">
                <p>よくあるご質問</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
              </div>
            </button>
          </Link>
        </div>

        <div className="pb-4">
          <Link href={'https://lin.ee/bLawYUk'}>
            <button
              className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-4 border-b-4 border-green-700 hover:border-0 rounded"
            >
              <div className="flex items-center justify-center">
                <p>LINEで相談する</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </main >
  );
}
