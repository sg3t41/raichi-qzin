import Link from "next/link"
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="py-5 px-2">
            <Link href={'https://lin.ee/bLawYUk'}>
                <Image
                    src={'/lineimg.jpg'}
                    alt={''}
                    width={800}
                    height={600}
                    className='w-full'
                />
            </Link>
            <div className="p-2">
                <Link href="https://twitter.com/raichi_qzin">
                    <p className="text-center text-gray-600">© Copyright 2024{" "}<span className="underline font-bold">ライチ求人</span></p>
                </Link>
            </div>
        </footer>
    )
}