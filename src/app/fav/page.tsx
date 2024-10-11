import { JobCard } from "@/features/job/components/JobCard/JobCard";
import { cookies } from "next/headers";
import { JobCardById } from "./JobCardById";
import Link from "next/link";
import { getLikedJobIds } from "@/features/favorite/libs/ssrFavorite";
// export const dynamic = 'force-dynamic'


export default function Page() {
    const ids = getLikedJobIds()
    return (
        <>
            {ids.length ? ids.map(v => (
                <>
                    <JobCardById id={v} />
                </>
            )) : (
                <div className="p-2">
                    <p>キープがありません。</p>
                    <p><Link href="/jobs" className="text-gray-600 mr-2 underline">案件一覧</Link>からお気に入り案件をキープできます。</p>
                </div>
            )}
        </>
    )
}