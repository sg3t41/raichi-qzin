import Link from 'next/link'
import Image from 'next/image'

export const Logo = ({
    src
}: {
    src: string
}) => {
    return (
        <Link className='z-50' href='/'>
            <Image src={src} alt={'logo'} width={180} height={80} />
        </Link>
    )
}