import { Pankuzu } from "@/components/elements/Pankuzu/Pankuzu";
import * as job from "@/features/job"


const Page = async ({ params: { id } }: { params: { id: string } }) => {
    const data = await job.query.getById({ id });

    return (
        <>
            <Pankuzu paths={[
                {
                    text: "案件一覧",
                    href: "/jobs"
                },
                {
                    text: `${data?.job.title}`,
                    href: `/job/${data?.job.title}`
                },
            ]}
            />

            <job.DetailCard data={data} />
        </>
    )
}

export default Page