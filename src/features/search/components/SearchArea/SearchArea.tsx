import { Select } from "@/components/elements/Select/Select"

export const SearchArea = () => {
    return (
        <form className='space-y-3 p-3 bg-white rounded-md'>
            <Select {...{
                options: [
                    { value: "", text: "エリアから探す" },
                    { value: "東京都", text: "東京都" },
                ]
            }} />

            <Select {...{
                options: [
                    { value: "", text: "こだわりから探す" },
                    { value: "マスク可", text: "マスク可" },
                    { value: "接触なし", text: "接触なし" },
                    { value: "即日払い", text: "即日払い" },
                ]
            }} />
            <button className='w-full px-4 py-4 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95'>
                案件を探す
            </button>
        </form>
    )
}