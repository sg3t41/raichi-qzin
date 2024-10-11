import { type JobType } from "../../types/job"
import Image from "next/image"
import { useMemo } from "react"
import { JobInfoItem } from "../JobInfoItem.tsx/JobInfoItem"
import { Tag } from "@/components/elements/Tag/Tag"
import { JobInfoHideable } from "../JobInfoHideable/JobInfoHideable"
import { JobScheduleHideable } from "../JobScheduleHideable/JobScheduleHideable"
import { JobScheduleItem } from "../JobScheduleItem/JobCardScheduleItem"
import { JobCardFooter } from "../JobCardFooter/JobCardFooter"
import { JobCardHeader } from "../JobCardHeader/JobCardHeader"

export const JobCard = ({
    data,
}: {
    data: JobType
}): JSX.Element => {
    const {
        require,
        karami,
        guarantee,
        location,
        hours,
        touch,
        idCard,
    } = data.job.details

    /* 仕事内容をステップ数でソート　　*/
    const sortedWorkSteps = useMemo(() => {
        return [...data.job.jobStep].sort((a, b) => a.step - b.step);
    }, [data.job.jobStep]);

    return (
        <div className='bg-white rounded shadow-xl rounded-t-lg border-2 border-blue-500 mt-1'>
            {data ?
                <div className="">
                    <JobCardHeader
                        {...{
                            jobId: data.id,
                            title: data.job.title
                        }}
                    />

                    <Image
                        className='border border-black'
                        src={data.job.imageUrl}
                        alt={`${data.job.title}の画像`}
                        width={1000}
                        height={500}
                    />

                    {data.job.tags && (
                        <div className="px-3 pt-2 flex flex-wrap">
                            {data.job.tags.map((tag) => <Tag key={tag} text={`${tag}`} />)}
                        </div>
                    )}

                    <JobInfoHideable
                        title={"案件詳細"}
                        defaultOpen={false}

                        expose={(
                            <>
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                                        </svg>
                                    )}
                                    text={"応募資格"}
                                    description={require}
                                />
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                                        </svg>
                                    )}
                                    text={"絡みの有無"}
                                    description={karami}
                                />
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    text={"謝礼目安"}
                                    description={guarantee}
                                />
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    )}
                                    text={"撮影場所"}
                                    description={location}
                                />
                            </>
                        )}

                        hide={(
                            <>
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    text={"拘束時間"}
                                    description={hours}
                                />
                                <JobInfoItem
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                        </svg>
                                    )}
                                    text={"身分証"}
                                    description={idCard}
                                />
                            </>
                        )}
                    />

                    <JobScheduleHideable
                        title={"お仕事内容"}
                        defaultOpen={false}
                        expose={(
                            <>
                                {/* 最初の2ステップを表示 */}
                                {sortedWorkSteps.slice(0, 2).map(v => (
                                    <li
                                        className="mb-10 ms-6"
                                        key={v.step}
                                    >
                                        <JobScheduleItem
                                            step={v.step}
                                            text={v.text}
                                            hour={v.hour}
                                            description={v.description} />
                                    </li>

                                ))}
                            </>
                        )}
                        hide={(
                            <>
                                {/* 2ステップ以降を隠す */}
                                {sortedWorkSteps.slice(2).map(v => (
                                    <li
                                        className="mb-10 ms-6"
                                        key={v.step}
                                    >
                                        <JobScheduleItem
                                            key={v.step}
                                            step={v.step}
                                            text={v.text}
                                            hour={v.hour}
                                            description={v.description} />
                                    </li>
                                ))}
                            </>
                        )}
                    />
                    <JobCardFooter {
                        ...{ jobId: data.id }
                    } />
                </div>
                :
                <div className="flex justify-center m-10" aria-label="読み込み中">
                    <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
                    <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
                </div>
            }
        </div >
    )
}