import * as job from "@/features/job"
import { JobCard } from "@/features/job/components/JobCard/JobCard";
// export const dynamic = "force-dynamic";

export const JobCardById = async ({ id }: { id: string }) => {
    const data = await job.query.getById({ id });
    return (
        <JobCard data={data} />
    )
}