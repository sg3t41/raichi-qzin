export const Select = ({ options }: {
    options: {
        value: string
        text: string
    }[]
}) => {
    return (
        <select className='w-full px-3 py-3 border rounded-lg bg-gray-200 border-gray-300 focus:outline-none focus:border-blue-400'>
            {options.map(v => (
                <option key={v.value} value={v.value}>
                    {v.text}
                </option>
            ))}
        </select>
    )
}