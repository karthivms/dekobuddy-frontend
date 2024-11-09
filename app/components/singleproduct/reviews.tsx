import Star from '../icons/star';
import { Col } from 'react-bootstrap';
import { rating } from '@/app/types/types';

export default function Reviews({reviews}:{reviews : rating[]}) {
    return (
        <Col className='h-290 overflow-y-scroll pe-5 custom-scrollbar'>
            {reviews.map((item: rating) => (
                <div key={`review_${item.id}`} className='mb-4'>
                    <div className='d-flex gap-8 align-items-center'>
                        <span className="d-flex align-items-center gap-6 bg-theme1 w-auto px-1 br-5 font-primary text-white">
                           {item.rating}
                         <Star fill={"white"} size={"12"} />
                        </span>
                        <span className='font-primary fw-4 text-black'>{item.user_name}</span>
                    </div>

                    <div className='my-2 d-flex justify-content-between align-items-center'>
                        <p className='mb-0 text-black font-secondary '>{item.review}</p>
                        {/* <div className='d-flex align-items-center gap-6'>
                            <Image src={like} width={20} height={20} alt='like' />
                            <span className='font-primary text-grey'>20</span>
                            <Image src={dislike} width={20} height={20} alt='dislike' className='d-inline-block ms-2' />
                            <span className='font-primary text-grey'>0</span>
                        </div> */}
                    </div>
                    <p className='mb-0 text-theme1 fw-3 font-small'>Verified Buyers</p>
                </div>
            ))}

        </Col>
    )
}