"use client"

import { FavoriteIcon } from '@/features/favorite/components/FavoriteIcon/FavoriteIcon';
import { useFavorite } from '@/features/favorite/hooks/useFavorite';
// import { useFavorite } from "@/features/favorite/hooks/useFavorite/useFavorite"

export const JobCardHeader = ({
    jobId,
    title
}: {
    jobId: string
    title: string
}) => {
    const { like, unlike, isLiked } = useFavorite()

    return (
        <div className='flex items-center justify-between bg-blue-500 rounded-t'>
            <div>
                <h5 className='text-xl font-bold leading-none text-white p-2 m-2'>{title}</h5>
            </div>
            <div className='flex items-center mx-2'>
                {isLiked(jobId)
                    ?
                    <div onClick={() => unlike(jobId)}>
                        <FavoriteIcon {...{
                            stroke: 'white',
                            fill: 'red'
                        }} />
                    </div>
                    :
                    <div onClick={() => like(jobId)}>
                        <FavoriteIcon {...{
                            stroke: 'red',
                            fill: 'white'
                        }} />
                    </div>
                }
            </div>
        </div >
    )
}