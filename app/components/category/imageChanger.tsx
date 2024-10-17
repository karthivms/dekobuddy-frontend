import { productimage } from '@/app/types/types'
import Image from 'next/image'


export default function ImageHandler({ image }: { image: productimage[] }) {
    return (
        <>
            <Image alt="product-image" width={384} height={384} className="w-100 h-auto br-10" src={image[1].image} loading="lazy" />

        </>
    )
}