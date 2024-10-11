'use client'

import { ButtonItem } from '@/components/elements/Button/ButtonItem'
import { IconDocText } from '@/components/elements/Icon/IconDocText'
import { IconLine } from '@/components/elements/Icon/IconLine'
import { useRouter } from 'next/navigation'
import useLineLogin from '@/features/login/hooks/useLineLogin'
import { UserType } from '@/features/login/types/userType'
import { useToggle } from 'react-use'

export const JobDetailCardFooter = ({
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
                            text='LINEで応募・相談する'
                            h='h-20'
                        >
                            <IconLine />
                        </ButtonItem>
                }
            </div>
        </div>
    )
}