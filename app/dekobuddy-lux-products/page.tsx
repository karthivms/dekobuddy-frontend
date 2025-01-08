import Link from "next/link";
import '@/app/sass/components/comingsoon.scss';

const Page = () => {
    return (
        <div
            className='layout d-flex justify-content-center row-gap-20 align-items-center flex-column ' >
                <div className="layout-bg"></div>
            <h1 className="font-hero  fw-4 text-theme1">Coming Soon...</h1>
            <p className="font-large fw-4">We are working hard to get back. Stay tuned!</p>
            <Link href={'/shop?sort=newest_first'} className="btn1 px-4 py-1">Check Our Latest Products</Link>
        </div>
    );
};

export default Page;