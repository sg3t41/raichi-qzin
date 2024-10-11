'use client'

import { ButtonItem } from '@/components/elements/Button/ButtonItem'
import { IconDocText } from '@/components/elements/Icon/IconDocText'
import { IconLine } from '@/components/elements/Icon/IconLine'
import { useRouter } from 'next/navigation'
import useLineLogin from '@/features/login/hooks/useLineLogin'
import { UserType } from '@/features/login/types/userType'
import { useToggle } from 'react-use'

export const JobCardFooter = ({
    jobId
}: {
    jobId: string
}) => {
    const router = useRouter()
    const { submit, isLoading: isLineLoading } = useLineLogin()
    const [isNextLoading, setIsNextLoading] = useToggle(false)
    return (
        <div className='w-full'>
            <div className='flex rounded-md justify-center shadow-sm my-5 mx-1' role='group'>
                {
                    isNextLoading
                        ?
                        <ButtonItem
                            loading={true}
                            bgColor='bg-blue-400'
                            textColor='text-white'
                            flex='flex-1'
                            text='読み込み中です'
                            barColor='blue'
                            h='h-20'
                        />
                        :
                        <ButtonItem
                            onClick={() => {
                                setIsNextLoading(true)
                                router.push(`/job/${jobId}`)
                            }}
                            bgColor='bg-blue-600'
                            textColor='text-white'
                            flex='flex-1'
                            text='詳細を見る'
                            h='h-20'
                        >
                            <IconDocText />
                        </ButtonItem>
                }
                {
                    isLineLoading
                        ?
                        <ButtonItem
                            loading={true}
                            bgColor='bg-green-300'
                            textColor='text-white'
                            flex='flex-1'
                            text='読み込み中です'
                            barColor='green'
                            h='h-20'
                        />
                        :
                        <ButtonItem
                            onClick={() => {
                                submit(process.env.NEXT_PUBLIC_LINE_CLIENT_ID ?? '', {
                                    base: process.env.NEXT_PUBLIC_LINE_LOGIN_WEBHOOK_URL ?? '',
                                    params: {
                                        jobId,
                                        type: String(UserType.Actress)
                                    }
                                })
                            }}
                            bgColor='bg-green-500'
                            textColor='text-white'
                            flex='flex-1'
                            text='LINEで応募'
                            h='h-20'
                        >
                            <IconLine />
                        </ButtonItem>
                }
            </div>
        </div>
    )
}