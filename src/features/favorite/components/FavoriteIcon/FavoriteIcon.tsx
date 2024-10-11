export const FavoriteIcon = ({
    stroke = "red",
    fill = "red",
    w = "w-10",
    h = "h-10",
    m = "m-3"
}: {
    stroke?: "red" | "white" | "black"
    fill?: "red" | "white"
    w?: "w-10" | "w-6" | "w-4" | "w-11" | "w-8"
    h?: "h-10" | "h-6" | "h-4" | "h-11" | "h-8"
    m?: "m-3" | "" | "m-1"
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.0"
            stroke={stroke}
            fill={fill}
            className={`${w} ${h} ${m} transition duration-300 cursor-pointer`}
        >
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
    )
}
