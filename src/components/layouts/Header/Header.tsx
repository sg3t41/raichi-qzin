'use client'

import { Logo } from '@/components/elements/Logo/Logo'
import { FavoriteCounts } from '@/features/favorite/components/FavoriteCounts/FavoriteCounts'
import Link from 'next/link'
import { useToggle } from 'react-use'

export const Header = (props: {
    menuList: {
        label: string
        href: string
    }[]
}) => {
    const [isOpen, changeOpen] = useToggle(false)

    return (
        <header className='px-1'>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='flex items-center'>
                        <div className='z-50 p-4 rounded-lg fixed'>
                            <div className='flex items-center'>
                                <button className='z-50 space-y-2' onClick={changeOpen}>
                                    <span
                                        className={
                                            isOpen
                                                ? 'block w-8 h-0.5 bg-gray-800 translate-y-2.5 rotate-45 duration-300'
                                                : 'block w-8 h-0.5 bg-gray-800 duration-300'
                                        }
                                    />
                                    <span
                                        className={
                                            isOpen
                                                ? 'block opacity-0 duration-300'
                                                : 'block w-8 h-0.5 bg-gray-800 duration-300'
                                        }
                                    />
                                    <span
                                        className={
                                            isOpen
                                                ? 'block w-8 h-0.5 bg-gray-800 -rotate-45 duration-300'
                                                : 'block w-8 h-0.5 bg-gray-800 duration-300'
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <Logo src={'/header_logo.png'} />
                </div>
                <div className='py-2 flex justify-end'>
                    <FavoriteCounts />
                </div>
            </div>

            <nav
                className={
                    isOpen
                        ? 'z-40 transition duration-0 ease-in-out backdrop-blur-lg fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col'
                        : 'fixed right-[-100%]'
                }
            >
                <ul
                    className={
                        isOpen
                            ? 'flex h-screen justify-center items-center flex-col gap-6 text-xl'
                            : 'block'
                    }
                >
                    {props.menuList.map(v => (
                        <li key={v.label} className='pb-10'>
                            <Link
                                onClick={changeOpen}
                                href={v.href}
                                className='border-b border-white border-dotted text-gray-700'
                            >
                                <div className='font-bold'>
                                    {v.label}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
