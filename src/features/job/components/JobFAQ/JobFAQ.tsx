export const JobFAQ = ({ title }: { title: string }) => {
    return (
        <div className="border-pink-700 border-2 rounded shadow-xl m-2 mb-5 p-2 pt-5 mt-10 relative">
            {title && <div className="absolute top-[-1rem] left-2 px-2 bg-pink-100 border-2 border-pink-600 text-xl text-gray-600 rounded-lg font-bold"><p className="stroke-white">{title}</p></div>}
            <section className="bg-white ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                    <div className="border-gray-200">
                        <div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium  ">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 " fill="pink" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    お金はいつもらえますか？
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-500 ">撮影日に全額現金手渡しになります。</p>
                                </div>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium  ">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 " fill="pink" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    撮影内容はどんなことをしますか？
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-500">ゲームセンターや猫カフェなどでデート風の外撮りを1時間程度、ホテルまたはスタジオにて休憩を入れながら絡み(本番)シーンの撮影を2回行います。</p>
                                    <p className="text-gray-500 ">アナル舐め・イラマチオなど追加シーンが撮れる方はオプションで撮影します。(もちろんその分はギャラ加算になります)</p>
                                </div>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium  ">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 " fill="pink" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    身バレ対策はできますか？
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-500 ">身バレは起きないように細心の注意を払います。</p>
                                    <p className="text-gray-500 ">TikTok並みの加工に加えて、ウィッグやマスクの着用、顔出しの範囲などご希望に沿って柔軟に対応させていただきますのでご安心ください。</p>
                                </div>
                            </div>
                            <div className="mb-10">
                                <h3 className="flex items-center mb-4 text-lg font-medium  ">
                                    <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 " fill="pink" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                    話を聞くだけでも大丈夫ですか？
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-gray-500 ">もちろん大丈夫です!</p>
                                    <p className="text-gray-500 ">事前審査でギャラの金額や具体的な撮影内容を提示しますので、そちらを見てからご判断いただいて大丈夫です。</p>
                                    <p className="text-gray-500 ">まずはお気軽にご質問、ご相談ください。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}