"use client"

export const Pankuzu = ({
    paths,
}: {
    paths: {
        text: string
        href: string
    }[]
}) => {
    return (
        <div className="flex justify-between items-center p-1" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <nav className="flex px-5 py-2 w-full rounded-lg bg-white shadow-sm" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse ">
                        <li className="inline-flex items-center">
                            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                            </a>
                        </li>
                        {paths.map(({ text, href }, index) => (
                            <li key={index} className="inline-flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                                </svg>
                                <a href={`${href}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">{text}</a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    )
}