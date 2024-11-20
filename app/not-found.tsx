import Image from 'next/image'
import Link from 'next/link'

export default async function NotFound() {

    return (
        <div style={{height:'100vh'}} className='d-flex flex-column justify-content-center align-items-center row-gap-10'>
            <Image src={'/images/404.png'} width={588} height={458} alt='404' className='wp-400 h-auto' />
            <h1 className='text-uppercase font-h2 text-theme1 fw-4'>Page Not Found</h1>
            <p className=' text-theme1 fw-3'>Oops! The page you are looking for does&apos;nt exist</p>

            <Link href="/" className='btn1 py-1 px-3 '>Back to Home &rarr;</Link>

        </div>
    )
}