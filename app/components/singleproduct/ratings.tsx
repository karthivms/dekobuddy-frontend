import { Col, Container, Row } from "react-bootstrap";
import Star from "../icons/star";
import Reviews from "./reviews";
import RatingPopup from "./ratingPopup";
import { rating } from "@/app/types/types";



interface ratingData {
    rating: number,
    no_of_ratings: number
}

export default function Ratings({ userid, productid, reviews, average, rat_count, rev_count }: { userid: number, productid: number, reviews: rating[], average: number, rat_count: number, rev_count: number }) {

    const groupedRatings: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (Array.isArray(reviews) && reviews.length > 0) {
        reviews.forEach((item: rating) => {
            groupedRatings[item.rating]++;
        });
    }

    const datas = Object.keys(groupedRatings).map((rating) => ({
        rating: Number(rating),
        no_of_ratings: groupedRatings[Number(rating)],
    }));

    const calculateProgress = (no: number, rating: number) => {
        const percentage = (no / reviews.length) * 100;
        let color = "";

        if (rating > 2) {
            color = 'bg-success';
        } else if (rating === 2) {
            color = 'bg-warning'
        } else {
            color = 'bg-danger'
        }

        return { color, percentage: Math.floor(percentage) }
    }

    return (
        <Container fluid className="mt-5 ">
            <h2 className="mt-3 text-uppercase font-h2 text-center text-theme1 fw-4 pb-2">Ratings & Reviews</h2>
            {Array.isArray(reviews) && reviews.length > 0 ? (

                <Row className=" border-border2-solid rating_box p-5 mx-3 mt-4 gap-100">
                    <Col lg={6}>
                        <Row className="align-items-center gap-20">
                            <Col lg={2} className="d-flex d-lg-block align-items-center gap-10">
                                <div className="font-h1 font-sm-h3 fw-5 text-black d-flex gap-6 align-items-center justify-content-center rating_star">
                                    <span>{average.toFixed(1)}</span> <Star fill={"currentcolor"} size={"28"} />
                                </div>
                                <p className="mb-0 font-secondary fw-3 text-black text-center">
                                    {rat_count} {rat_count > 1 ? (<>Ratings</>) : (<>Rating</>)} & {rev_count} {rev_count > 1 ? (<>Reviews</>) : (<>Review</>)}</p>
                            </Col>
                            <Col>

                                {datas.reverse().map((item: ratingData) => (
                                    <div key={`rating_${item.rating}`} className="d-flex align-items-center gap-15 font-large mb-2">
                                        <span className="d-flex align-items-center wc-5 w-sm-10 gap-6 ">
                                            <span>{item.rating} </span>
                                            <span className="mb-1"><Star fill={"currentcolor"} size={"15"} /></span>
                                        </span>
                                        <div className="wc-85 bg-border2 br-10">
                                            <div
                                                className={`wc-${calculateProgress(item.no_of_ratings, item.rating).percentage} ${calculateProgress(item.no_of_ratings, item.rating).color} br-10 h-9`}></div>
                                        </div>
                                        <span className="d-inline-block wc-4">{item.no_of_ratings}</span>
                                    </div>
                                ))}

                            </Col>
                        </Row>
                        <div className="mt-4 d-lg-flex d-block justify-content-between align-items-center">
                            <p className="font-large text-grey2 mb-0">Have you used this product? Review Now!</p>
                            <RatingPopup userid={userid} productid={productid} />
                        </div>
                    </Col>
                    {Array.isArray(reviews) && reviews.length > 0 && <Reviews reviews={reviews} />}

                </Row>) : (
                <Container className="mt-4 d-lg-flex d-block gap-30 align-items-center">
                    <p className="font-large text-grey2 mb-0">Have you used this product? Review Now!</p>
                    <RatingPopup userid={userid} productid={productid} />
                </Container>
            )}
        </Container>
    )
}