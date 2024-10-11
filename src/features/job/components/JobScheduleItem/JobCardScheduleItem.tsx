
export const JobScheduleItem = ({
    text,
    description,
    hour,
    step
}: {
    step: number;
    text: string;
    hour: number;
    description: string;
}) => {
    return (
        <>
            <div className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 text-white font-bold rounded-full -start-3 ring-8 ring-blue-500">
                    {step}
                </span>
            </div>
            <p className="text-lg ml-3 pb-5">{text}</p>
            <time className="block mb-3 text-sm font-normal leading-none text-gray-400 ">所要目安: {<span className=" text-base">{hour}</span>}{" "}時間</time>
            <p className="mb-4 text-base font-normal text-gray-600">{description}</p>
        </>
    )
}