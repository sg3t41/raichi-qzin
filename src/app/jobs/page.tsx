import * as job from "@/features/job"
import { SearchArea } from "@/features/search/components/SearchArea/SearchArea"
import { Pankuzu } from "@/components/elements/Pankuzu/Pankuzu"
import { useSearchParams } from "next/navigation";

export default async function Page() {
    const data = await job.query.getAll({ keyword: "" })

    return (
        <>
            <div className="flex items-center p-1">
                <div>
                    <Pankuzu paths={[{ text: "案件一覧", href: "/" }]} />
                </div>
            </div>
            <SearchArea />
            <div className="flex flex-col items-end mx-4 my-0.5">
                <div className="text-right text-sm">
                    検索結果
                </div>
                {data?.length ?
                    <p className="text-right">
                        <span className="text-lg text-gray-700">{data.length}</span>
                        /
                        <span className="text-lg text-gray-700">{data.length}</span>
                        件
                    </p>
                    :
                    <p className="text-right">
                        <span className="text-lg text-gray-700">{0}</span>
                        件
                    </p>
                }
            </div>
            {data && data.map(v => (
                <job.Card
                    key={v.id}
                    data={v} />
            ))}
        </>
    )
}