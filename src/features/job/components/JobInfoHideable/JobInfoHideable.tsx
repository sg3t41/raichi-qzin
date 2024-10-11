"use client"
import { ReactNode } from "react"
import { useToggle } from "react-use"

export const JobInfoHideable = ({
    title,
    defaultOpen,
    expose,
    hide,
}: {
    title: string,
    defaultOpen: boolean
    expose: ReactNode
    hide?: ReactNode
}) => {
    const [showAccordion, changeShowAccordion] = useToggle(defaultOpen)
    return (
        <div className="border-green-700 border-2 rounded shadow-xl m-2 mb-5 p-2 pt-5 mt-10 relative">
            {title && <div className="absolute top-[-1rem] left-2 px-2 bg-green-100 border-2 border-green-600 text-xl text-gray-600 rounded-lg font-bold"><p className="stroke-white">{title}</p></div>}
            <div>
                <div>
                    {expose}
                </div>
                {hide &&
                    <div
                        className={`transition-all duration-1000 ease-in-out relative 
                            ${showAccordion ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`
                        }
                    >
                        {hide}
                    </div>
                }
            </div>

            {/* 隠す要素がなければ「もっと見る/閉じる」ボタンは表示しない */}
            {hide &&
                <div className="flex justify-end">
                    <button onClick={changeShowAccordion} className="px-4 py-2 z-10 text-sm text-blue-500">
                        {showAccordion ? '閉じる' : 'もっと見る'}
                    </button>
                </div>
            }
        </div>
    )
}